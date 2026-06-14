import React from 'react';
import SectionLabel from './SectionLabel';

const SupportSection = () => {
  return (
    <section className="relative section bg-background flex items-center justify-center">
      <div className="relative z-10 container">
        <div className="flex flex-col lg:flex-row bg-white rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] max-w-6xl mx-auto">
          {/* Left Column - Image and Statistics */}
          <div className="lg:w-1/2 relative bg-cover bg-center flex flex-col justify-end p-6 md:p-10 rounded-l-[24px]"
               style={{ backgroundImage: "url('/images/support_banner.png')" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 rounded-l-[24px]"></div>
            <div className="relative z-10 text-white">
              <div className="flex flex-col md:flex-row md:justify-around text-center gap-4 md:gap-0">
                <div className="flex flex-col items-center p-4">
                  <span className="text-3xl md:text-4xl font-bold">98%</span>
                  <span className="text-xs md:small-text mt-1 leading-tight text-center">Customer Satisfaction</span>
                </div>
                <div className="flex flex-col items-center p-4">
                  <span className="text-3xl md:text-4xl font-bold">10+</span>
                  <span className="text-xs md:small-text mt-1 leading-tight text-center">Service Categories</span>
                </div>
                <div className="flex flex-col items-center p-4">
                  <span className="text-3xl md:text-4xl font-bold">500+</span>
                  <span className="text-xs md:small-text mt-1 leading-tight text-center">Families Helped</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:w-1/2 p-12">
            <div className="max-w-md mx-auto">
              <SectionLabel>SUPPORT</SectionLabel>
              <h2 className="mt-2 h2 text-text-primary">Need Help? <br />We&apos;re Here to Assist</h2>
              <p className="mt-4 body text-text-secondary">Whether you have a question, service concern, replacement request, or feedback, our support team is ready to help.</p>
              
              <form className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block small-text text-text-secondary">Name</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Your Name"
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone-number" className="block small-text text-text-secondary">Phone Number</label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      name="phone-number"
                      id="phone-number"
                      placeholder="Your Phone Number"
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email-address" className="block small-text text-text-secondary">Email Address</label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email-address"
                      id="email-address"
                      placeholder="Your Email Address (Optional)"
                      className="form-input"
                    />
                  </div>
                </div>

                {/* How can we help? */}
                <div>
                  <label htmlFor="how-can-we-help" className="block small-text text-text-secondary">How can we help?</label>
                  <div className="mt-1">
                    <select
                      id="how-can-we-help"
                      name="how-can-we-help"
                      className="form-input"
                    >
                      <option>General Inquiry</option>
                      <option>New Service Question</option>
                      <option>Existing Service Issue</option>
                      <option>Replacement Request</option>
                      <option>Feedback</option>
                      <option>Complaint</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block small-text text-text-secondary">Message</label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Please tell us how we can assist you..."
                      className="form-textarea"
                    ></textarea>
                  </div>
                </div>

                {/* Send Message Button */}
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="btn-secondary w-full"
                  >
                    Send Message
                  </button>
                </div>
              </form>

              <div className="mt-8 text-center text-text-secondary small-text">
                <p>If you have any questions, call or Whatsapp at: <span className="font-medium text-text-primary">+91-88771-94682</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
