"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ThankYouPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThankYouPopup({ isOpen, onClose }: ThankYouPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] max-w-lg w-full relative">
              <div className="p-6">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10"
                >
                  <svg className="w-6 h-6 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="h3 text-text-primary">Thank You!</h2>
                  <p className="mt-2 body text-text-secondary">Your inquiry has been successfully received. We are already looking for the perfect match for your home.</p>
                </div>



                {/* Immediate Assistance */}
                <div className="mb-6 bg-background rounded-[16px] p-5">
                  <h3 className="h4 text-text-primary mb-4">Need Immediate Assistance?</h3>
                  <p className="small-text text-text-secondary mb-4">Connect with our Patna operations team directly for priority booking:</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Image src="/images/icon/phone-call.avif" alt="Phone" width={28} height={28} className="h-7 w-7" />
                      <div>
                        <p className="font-semibold text-text-primary">Call / WhatsApp: +91-88771-94682</p>
                        <p className="small-text text-text-secondary">Available 9 AM - 8 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Image src="/images/icon/message.avif" alt="WhatsApp" width={28} height={28} className="h-7 w-7" />
                      <a href="#" className="font-semibold text-primary hover:underline">WhatsApp Chat: Click Here to Chat with Us</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Image src="/images/icon/mail.avif" alt="Email" width={28} height={28} className="h-7 w-7" />
                      <a href="mailto:support@dontcook.com" className="font-semibold text-primary hover:underline">Email Support: support@dontcook.com</a>
                    </div>
                  </div>
                </div>

                {/* Our Guarantee */}
                <div className="mb-6">
                  <h3 className="h4 text-text-primary mb-3">Our Guarantee</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <p className="small-text text-text-secondary">100% Police-Verified & Document-Checked Staff.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <p className="small-text text-text-secondary">Free and fast replacements if you are not fully satisfied.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <p className="small-text text-text-secondary">Dedicated support manager for easy scheduling and billing.</p>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <div>
                  <button
                    onClick={onClose}
                    className="btn-secondary w-full"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
