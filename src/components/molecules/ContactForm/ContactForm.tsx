"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ContactFormProps, ContactFormData } from "./ContactForm.types";
import NeonButton from "@/components/atoms/NeonButton";

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, className = "" }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [terminalText, setTerminalText] = useState("$ connect --with=developer");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTerminalText("> Sending message...");
    setTimeout(() => {
      onSubmit(formData);
      setTerminalText("> Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
        setTerminalText("$ connect --with=developer");
      }, 3000);
    }, 1000);
  };

  return (
    <motion.div
      className={`bg-portfolio-bg-secondary border-2 border-portfolio-neon-blue rounded-lg p-8 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Terminal Header */}
      <div className="mb-6 font-spacemono text-portfolio-neon-green">
        <div className="text-sm mb-2">{terminalText}</div>
        <div className="text-xs text-portfolio-text-muted">&gt; Initializing connection...</div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-rajdhani text-portfolio-text-secondary mb-2">
            NAME:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-portfolio-bg-tertiary border border-portfolio-neon-blue px-4 py-3 rounded text-portfolio-text-primary font-spacemono focus:outline-none focus:border-portfolio-neon-pink transition-colors"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-rajdhani text-portfolio-text-secondary mb-2">
            EMAIL:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-portfolio-bg-tertiary border border-portfolio-neon-blue px-4 py-3 rounded text-portfolio-text-primary font-spacemono focus:outline-none focus:border-portfolio-neon-pink transition-colors"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-rajdhani text-portfolio-text-secondary mb-2">
            MESSAGE:
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full bg-portfolio-bg-tertiary border border-portfolio-neon-blue px-4 py-3 rounded text-portfolio-text-primary font-spacemono focus:outline-none focus:border-portfolio-neon-pink transition-colors resize-none"
            placeholder="Your message here..."
          />
        </div>

        <NeonButton type="submit" variant="blue" size="lg" className="w-full">
          SEND MESSAGE ▶
        </NeonButton>
      </form>
    </motion.div>
  );
};

export default ContactForm;
