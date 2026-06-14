"use client";
import { useState } from "react";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    serviceRequired: "",
    shiftPreference: "",
    email: "",
    phone: "",
    engagementDuration: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your inquiry! We will contact you soon.");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Name */}
        <div className="md:col-span-1">
          <label htmlFor="lead-name" className="sr-only">Your Name</label>
          <input
            id="lead-name"
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            aria-required="true"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Service Required */}
        <div className="md:col-span-1">
          <label htmlFor="lead-service" className="sr-only">Select Service</label>
          <select
            id="lead-service"
            name="serviceRequired"
            value={formData.serviceRequired}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select Service...</option>
            <option value="cooking-only">Cooking Only</option>
            <option value="house-cleaning-only">House Cleaning Only</option>
            <option value="laundry-utensil-only">Laundry and Utensil Washing Only</option>
            <option value="child-care-nanny">Child Care and Nanny Services</option>
            <option value="elder-care-patient">Elderly Care and Patient Assistance</option>
            <option value="cooking-cleaning-combined">Cooking and House Cleaning Combined</option>
            <option value="full-housekeeper">Full Housekeeper (Cooking, Cleaning, and Laundry)</option>
          </select>
        </div>

        {/* Shift Preference */}
        <div className="md:col-span-1">
          <label htmlFor="lead-shift" className="sr-only">Select Shift Type</label>
          <select
            id="lead-shift"
            name="shiftPreference"
            value={formData.shiftPreference}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select Shift Type...</option>
            <option value="part-time">Part-Time (1 to 2 Hours Daily)</option>
            <option value="half-day">Half-Day (4 to 5 Hours Daily)</option>
            <option value="full-time-day">Full-Time Day Shift (8 to 10 Hours Daily)</option>
            <option value="live-in">24-Hour Live-In Management</option>
          </select>
        </div>

        {/* Email */}
        <div className="md:col-span-1">
          <label htmlFor="lead-email" className="sr-only">Email Address</label>
          <input
            id="lead-email"
            type="email"
            name="email"
            placeholder="Email Address"
            required
            aria-required="true"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Phone */}
        <div className="md:col-span-1">
          <label htmlFor="lead-phone" className="sr-only">Phone Number</label>
          <input
            id="lead-phone"
            type="tel"
            name="phone"
            placeholder="Phone"
            required
            aria-required="true"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Engagement Duration */}
        <div className="md:col-span-1">
          <label htmlFor="lead-duration" className="sr-only">Select Duration</label>
          <select
            id="lead-duration"
            name="engagementDuration"
            value={formData.engagementDuration}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select Duration...</option>
            <option value="regular-contract">Regular Contract (Monthly / Permanent Basis)</option>
            <option value="single-day-trial">Single-Day Trial Booking</option>
            <option value="short-term-cover">Short-Term Cover (1 to 2 Weeks)</option>
            <option value="event-house-party">Event and House Party Support (1 to 2 Days)</option>
            <option value="festival-management">Festival Management Assistance</option>
            <option value="wedding-function">Wedding and Function Management Support</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="w-full">
        <button
          type="submit"
          className="btn-secondary w-full"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
