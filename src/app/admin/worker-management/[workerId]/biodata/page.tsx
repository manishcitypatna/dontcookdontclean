"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./biodata.module.css";

type Profile = Record<string, unknown>;

const field = (value: unknown): string =>
  value !== undefined && value !== null && String(value).trim() !== "" ? String(value) : "-";

const isYes = (value: unknown): boolean =>
  value === true || value === "Yes" || value === "yes" || value === "true";

// Google Drive "view" links (e.g. .../file/d/FILE_ID/view) serve an HTML viewer
// page, not raw image bytes, so they can't be used as <img src>. Route through our
// own photo-proxy API (same-origin) instead of Drive's thumbnail endpoint directly —
// Drive doesn't reliably send CORS headers, which breaks canvas-based PDF capture.
const toDriveImageLink = (viewLink: unknown, size = 600): string => {
  if (typeof viewLink !== "string" || !viewLink.trim()) return "";
  const match = viewLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) return "";
  return `/api/workers/photo-proxy?id=${match[1]}&size=${size}`;
};

function Pill({ value }: { value: unknown }) {
  const yes = isYes(value);
  return (
    <span className={`${styles.pill} ${yes ? styles.pillYes : styles.pillNo}`}>
      {yes ? "Yes" : "No"}
    </span>
  );
}

function DataItem({
  label,
  value,
  highlight,
  suffix,
}: {
  label: string;
  value: unknown;
  highlight?: boolean;
  suffix?: string;
}) {
  return (
    <div className={styles.dataItem}>
      <div className={styles.dataLabel}>{label}</div>
      <div className={`${styles.dataValue} ${highlight ? styles.highlight : ""}`}>
        {field(value)}
        {suffix ? <span style={{ fontWeight: 400, fontSize: 13 }}> {suffix}</span> : null}
      </div>
    </div>
  );
}

function DocLink({ label, url }: { label: string; url: unknown }) {
  const href = typeof url === "string" ? url.trim() : "";
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.docLink}>
      {label}
    </a>
  ) : (
    <span className={styles.docLinkDisabled}>{label}</span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div className={styles.sectionTitle}>{children}</div>;
}

export default function WorkerBioDataPage() {
  const params = useParams<{ workerId: string }>();
  const workerId = params.workerId;
  const contentRef = useRef<HTMLDivElement>(null);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);

  const load = async () => {
    setIsLoading(true);
    setError("");
    setPhotoFailed(false);
    try {
      const response = await fetch("/api/workers/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workerId }),
      });
      const data = await response.json();

      if (!data || !data.workerId) {
        setError("Worker not found.");
        setProfile(null);
        return;
      }
      setProfile(data);
    } catch (err) {
      console.error("[BIO-DATA] Error loading profile:", err);
      setError("Failed to load worker profile.");
    } finally {
      setIsLoading(false);
      setHasLoaded(true);
    }
  };

  const handleDownload = async () => {
    if (!contentRef.current || !profile) return;
    setIsDownloading(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas-pro"),
        import("jspdf"),
      ]);
      const el = contentRef.current;
      const scale = 2;

      // html2canvas rasterizes the whole page into one flat image, so the doc-view
      // anchors don't survive as clickable text. We overlay invisible PDF link
      // regions afterwards — but their positions must come from the *cloned*
      // element html2canvas actually rasterizes (via onclone), not the live page.
      // Measuring the live DOM instead seems equivalent, but any small layout drift
      // between the live page and the offscreen clone (font metrics, reflow) shifts
      // individual links by different amounts, which is exactly the "sometimes up,
      // sometimes down" misalignment seen when reading rects from the live element.
      let linkTargets: { href: string; x: number; y: number; w: number; h: number }[] = [];
      const canvas = await html2canvas(el, {
        scale,
        useCORS: true,
        windowWidth: el.scrollWidth,
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        onclone: (_clonedDoc, clonedEl) => {
          const baseRect = clonedEl.getBoundingClientRect();
          linkTargets = Array.from(clonedEl.querySelectorAll<HTMLAnchorElement>("a[href]"))
            .map((anchor) => {
              const rect = anchor.getBoundingClientRect();
              return {
                href: anchor.getAttribute("href") || "",
                x: (rect.left - baseRect.left) * scale,
                y: (rect.top - baseRect.top) * scale,
                w: rect.width * scale,
                h: rect.height * scale,
              };
            })
            .filter((t) => t.href && t.w > 0 && t.h > 0);
        },
      });
      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({ unit: "px", format: [canvas.width, canvas.height], orientation: "portrait" });
      pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);

      linkTargets.forEach(({ href, x, y, w, h }) => {
        pdf.link(x, y, w, h, { url: href });
      });

      pdf.save(`${field(profile.workerId)}_${field(profile.fullName)}_BioData.pdf`.replace(/\s+/g, "_"));
    } catch (err) {
      console.error("[BIO-DATA] Error generating PDF:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const hasPhoto = !!toDriveImageLink(profile?.workerPhoto) && !photoFailed;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className={styles.pageWrap}>
        <div className="flex items-center justify-between gap-4 flex-wrap mb-6 print:hidden">
          <Link href={`/admin/worker-management/${workerId}`} className="text-sm text-primary hover:underline">
            &larr; Back to Sections
          </Link>
          {hasLoaded && profile && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={load}
                disabled={isLoading}
                className="btn-outline flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className={isLoading ? "animate-spin" : ""}>↻</span>
                {isLoading ? "Loading..." : "Refresh"}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? "Generating..." : "⬇ Download PDF"}
              </button>
            </div>
          )}
        </div>

        {!hasLoaded ? (
          <div className="card text-center py-16">
            {isLoading ? (
              <p className="text-text-secondary">Loading worker bio-data…</p>
            ) : (
              <>
                <p className="text-text-secondary mb-4">Worker bio-data not loaded yet.</p>
                <button type="button" onClick={load} className="btn-primary">
                  ↻ Load Bio-Data
                </button>
              </>
            )}
          </div>
        ) : error ? (
          <div className="card text-center py-16">
            <p className="text-red-600 mb-4">{error}</p>
            <button type="button" onClick={load} className="btn-outline">
              Try Again
            </button>
          </div>
        ) : profile ? (
          <div ref={contentRef} className={styles.docRoot}>
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.brandInfo}>
                <div className={styles.logoBadge}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/shared/logo.avif" alt="Don't Cook Don't Clean" />
                </div>
                <div>
                  <h1>Don&apos;t Cook Don&apos;t Clean</h1>
                  <p>A brand of GSMA Technologies Pvt Ltd</p>
                </div>
              </div>
              <div className={styles.brandContact}>
                <div>+91-88771-94682</div>
                <div>dontcookdontclean.in</div>
                <div>info@dontcookdontclean.in</div>
              </div>
            </div>

            {/* Profile summary strip */}
            <div className={styles.profileStrip}>
              <div className={styles.workerTitle}>
                <div className={styles.workerPhoto}>
                  {hasPhoto ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={toDriveImageLink(profile.workerPhoto)}
                      alt="Worker"
                      onError={() => setPhotoFailed(true)}
                    />
                  ) : (
                    <span>No Photo</span>
                  )}
                </div>
                <div>
                  <h2>
                    {field(profile.fullName)} <span className={styles.idTag}>{field(profile.workerId)}</span>
                  </h2>
                  <div className={styles.metaInfo}>
                    Document Status: <strong>{field(profile.documentStatus)}</strong> | Last Updated:{" "}
                    {field(profile.lastUpdatedOn)}
                  </div>
                </div>
              </div>
              <div>
                <span className={styles.statusBadge}>Status: {field(profile.status)}</span>
              </div>
            </div>

            <div className={styles.content}>
              {/* Personal Details */}
              <SectionTitle>Personal Details</SectionTitle>
              <div className={styles.grid4}>
                <DataItem label="Gender" value={profile.gender} />
                <DataItem label="Date of Birth" value={profile.dob} />
                <DataItem label="Religion" value={profile.religion} />
                <DataItem label="Marital Status" value={profile.maritalStatus} />
              </div>
              <div className={`${styles.grid4} ${styles.mt15}`}>
                <DataItem label="Education" value={profile.education} />
                <DataItem label="Mother's Name" value={profile.mothersName} />
                <DataItem label="Father's Name" value={profile.fathersName} />
                <DataItem label="Husband's Name" value={profile.husbandsName} />
              </div>

              {/* Contact & Address */}
              <SectionTitle>Contact &amp; Address Details</SectionTitle>
              <div className={styles.grid3}>
                <DataItem label="Mobile Number" value={profile.mobile} />
                <DataItem label="WhatsApp Number" value={profile.whatsapp} />
                <DataItem label="Email" value={profile.email} />
              </div>
              <div className={`${styles.grid2} ${styles.mt15}`}>
                <DataItem label="Present Address" value={profile.presentAddress} />
                <DataItem label="Permanent Address" value={profile.permanentAddress} />
              </div>

              {/* Work Preferences & Availability */}
              <SectionTitle>Work Preferences &amp; Availability</SectionTitle>
              <div className={styles.grid2}>
                <div className={styles.dataItem}>
                  <div className={styles.dataLabel}>Preferred Services</div>
                  <div className={styles.pillContainer}>
                    <span className={`${styles.pill} ${isYes(profile.cookingServices) ? styles.pillYes : styles.pillNo}`}>
                      Cooking: {isYes(profile.cookingServices) ? "Yes" : "No"}
                    </span>
                    <span className={`${styles.pill} ${isYes(profile.cleaningServices) ? styles.pillYes : styles.pillNo}`}>
                      Cleaning: {isYes(profile.cleaningServices) ? "Yes" : "No"}
                    </span>
                    <span className={`${styles.pill} ${isYes(profile.babyCareServices) ? styles.pillYes : styles.pillNo}`}>
                      Baby Care: {isYes(profile.babyCareServices) ? "Yes" : "No"}
                    </span>
                    <span className={`${styles.pill} ${isYes(profile.elderCareServices) ? styles.pillYes : styles.pillNo}`}>
                      Elder Care: {isYes(profile.elderCareServices) ? "Yes" : "No"}
                    </span>
                    <span className={`${styles.pill} ${isYes(profile.otherServices) ? styles.pillYes : styles.pillNo}`}>
                      Other: {isYes(profile.otherServices) ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
                <div className={styles.dataItem}>
                  <div className={styles.dataLabel}>Employment Status</div>
                  <div className={styles.dataValue}>
                    <span className={`${styles.dataValue} ${styles.highlight}`}>{field(profile.workingStatus)}</span>
                    <span style={{ fontWeight: 400, fontSize: 13 }}>
                      {" "}
                      (Willing to work: {isYes(profile.willingToWork) ? "Yes" : "No"})
                    </span>
                  </div>
                </div>
              </div>

              <div className={`${styles.grid4} ${styles.mt15}`}>
                <DataItem label="Preferred Work Area" value={profile.preferredWorkArea} />
                <DataItem label="Availability — Morning" value={profile.availabilityMorning} />
                <DataItem label="Availability — Noon" value={profile.availabilityNoon} />
                <DataItem label="Availability — Evening" value={profile.availabilityEvening} />
              </div>

              <div className={`${styles.grid4} ${styles.mt15}`}>
                <div className={styles.dataItem}>
                  <div className={styles.dataLabel}>Full-Time</div>
                  <Pill value={profile.fullTimeShift} />
                </div>
                <div className={styles.dataItem}>
                  <div className={styles.dataLabel}>Part-Time</div>
                  <Pill value={profile.partTimeShift} />
                </div>
                <div className={styles.dataItem}>
                  <div className={styles.dataLabel}>Live-In</div>
                  <Pill value={profile.liveInShift} />
                </div>
                <div className={styles.dataItem}>
                  <div className={styles.dataLabel}>Daily Shift</div>
                  <Pill value={profile.dailyShift} />
                </div>
              </div>

              {/* Experience & Language Skills */}
              <SectionTitle>Experience &amp; Language Skills</SectionTitle>
              <div className={styles.grid3}>
                <DataItem label="Total Past Experience" value={profile.pastExperience} />
                <DataItem label="Health Conditions" value={profile.healthConditions} />
                <DataItem label="Previous Employer Remarks" value={profile.previousEmployerRemarks} />
              </div>
              <div className={`${styles.grid2} ${styles.mt15}`}>
                <DataItem label="Previous Employer 1" value={profile.previousEmployer1} />
                <DataItem label="Previous Employer 2" value={profile.previousEmployer2} />
              </div>

              <div className={`${styles.dataItem} ${styles.mt15}`}>
                <div className={styles.dataLabel}>Language Competency</div>
                <div style={{ fontSize: 14, fontWeight: 400, marginTop: 5 }}>
                  <strong>Hindi:</strong> Speak ({isYes(profile.hindiSpeak) ? "Yes" : "No"}), Read (
                  {isYes(profile.hindiRead) ? "Yes" : "No"}), Write ({isYes(profile.hindiWrite) ? "Yes" : "No"})
                  &nbsp;|&nbsp;
                  <strong> English:</strong> Speak ({isYes(profile.englishSpeak) ? "Yes" : "No"}), Read (
                  {isYes(profile.englishRead) ? "Yes" : "No"}), Write ({isYes(profile.englishWrite) ? "Yes" : "No"})
                </div>
              </div>

              {/* References & Emergency Contacts */}
              <SectionTitle>References &amp; Emergency Contacts</SectionTitle>
              <div className={styles.grid2}>
                <div className={styles.dataItem}>
                  <div className={styles.dataLabel}>Reference 1 &amp; 2</div>
                  <div className={styles.dataValue}>{field(profile.reference1)}</div>
                  <div className={styles.dataValueSub}>Relation: {field(profile.reference1Relation)}</div>
                  <div className={styles.dataValue} style={{ marginTop: 8 }}>
                    {field(profile.reference2)}
                  </div>
                  <div className={styles.dataValueSub}>Relation: {field(profile.reference2Relation)}</div>
                </div>
                <div className={styles.dataItem}>
                  <div className={styles.dataLabel}>Emergency Contacts</div>
                  <div className={styles.dataValue}>
                    {field(profile.emergency1)}{" "}
                    <span style={{ fontSize: 12, fontWeight: 400 }}>({field(profile.emergency1Relation)})</span>
                  </div>
                  <div className={styles.dataValue} style={{ marginTop: 4 }}>
                    {field(profile.emergency2)}{" "}
                    <span style={{ fontSize: 12, fontWeight: 400 }}>({field(profile.emergency2Relation)})</span>
                  </div>
                </div>
              </div>

              {/* Banking Details */}
              <SectionTitle>Banking Details</SectionTitle>
              <div className={styles.grid2}>
                <DataItem label="Account Holder Name" value={profile.bankAccountHolderName} />
                <DataItem
                  label="Bank & Branch Name"
                  value={
                    profile.bankName || profile.branchName
                      ? `${field(profile.bankName)}, ${field(profile.branchName)}`
                      : undefined
                  }
                />
              </div>
              <div className={`${styles.grid3} ${styles.mt15}`}>
                <DataItem label="Account Number" value={profile.bankAccountNumber} />
                <DataItem label="IFSC Code" value={profile.ifsc} />
                <DataItem label="UPI ID" value={profile.upiId} />
              </div>

              {/* Verification Documents */}
              <SectionTitle>Verification Documents</SectionTitle>
              <div className={styles.grid3}>
                <DataItem label="PAN Card Number" value={profile.panNumber} />
                <DataItem label="Voter ID Number" value={profile.voterIdNumber} />
                <DataItem label="Aadhaar Number" value={profile.aadhaarNumber} />
              </div>

              <div className={`${styles.grid4} ${styles.mt20}`}>
                <div className={`${styles.dataItem} ${styles.docCell}`}>
                  <div className={styles.dataLabel}>Aadhaar Front/Back</div>
                  <div className={styles.docLinks}>
                    <DocLink label="View Front" url={profile.aadhaarFront} />
                    <DocLink label="View Back" url={profile.aadhaarBack} />
                  </div>
                </div>
                <div className={`${styles.dataItem} ${styles.docCell}`}>
                  <div className={styles.dataLabel}>Voter ID Front/Back</div>
                  <div className={styles.docLinks}>
                    <DocLink label="View Front" url={profile.voterIdFront} />
                    <DocLink label="View Back" url={profile.voterIdBack} />
                  </div>
                </div>
                <div className={`${styles.dataItem} ${styles.docCell}`}>
                  <div className={styles.dataLabel}>PAN Card Document</div>
                  <div className={styles.docLinks}>
                    <DocLink label="View Document" url={profile.panCard} />
                  </div>
                </div>
                <div className={`${styles.dataItem} ${styles.docCell}`}>
                  <div className={styles.dataLabel}>Police Verification</div>
                  <div className={styles.docLinks}>
                    <DocLink label="View Certificate" url={profile.policeVerification} />
                  </div>
                </div>
              </div>

              <div className={`${styles.grid2} ${styles.mt15}`}>
                <div className={`${styles.dataItem} ${styles.docCell}`}>
                  <div className={styles.dataLabel}>Parent/Husband Aadhaar Front/Back</div>
                  <div className={styles.docLinks}>
                    <DocLink label="View Front" url={profile.parentAadhaarFront} />
                    <DocLink label="View Back" url={profile.parentAadhaarBack} />
                  </div>
                </div>
                <DataItem label="Parent/Husband Aadhaar Number" value={profile.parentAadhaarNumber} />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
