"use client";

import React from "react";
import { motion } from "framer-motion";
import ContactForm from "@/components/molecules/ContactForm";
import type { ContactFormData } from "@/components/molecules/ContactForm/ContactForm.types";
import SocialOrb from "@/components/atoms/SocialOrb";
import StatusIndicator from "@/components/atoms/StatusIndicator";
import HomeButton from "@/components/atoms/HomeButton";

export default function ContactPage() {
  const handleSubmit = (data: ContactFormData) => {
    console.log("Form submitted:", data);
    alert("Message sent! (This is a demo)");
  };

  return (
    <div className="min-h-screen bg-portfolio-bg-primary py-20 px-6">
      <HomeButton />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-orbitron font-black gradient-text-neon mb-4">
            {/* CONTACT */}
          </h1>
          <p className="text-xl text-portfolio-text-secondary font-rajdhani mb-4">
            Let&apos;s build something amazing together
          </p>
          <StatusIndicator status="online" showLabel size="md" />
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <ContactForm onSubmit={handleSubmit} />
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <h2 className="text-2xl font-rajdhani font-bold text-portfolio-neon-green mb-8">
            &gt; CONNECT_WITH_ME.sh
          </h2>
          <div className="flex justify-center gap-6 flex-wrap">
            <SocialOrb platform="github" url="https://github.com" size="lg" />
            <SocialOrb platform="linkedin" url="https://linkedin.com" size="lg" />
            <SocialOrb platform="twitter" url="https://twitter.com" size="lg" />
            <SocialOrb platform="discord" url="https://discord.com" size="lg" />
            <SocialOrb platform="email" url="mailto:your@email.com" size="lg" />
            <SocialOrb platform="steam" url="https://steamcommunity.com" size="lg" />
          </div>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-portfolio-bg-secondary border border-portfolio-neon-blue rounded-lg p-6 text-center"
        >
          <p className="text-portfolio-text-secondary font-spacemono text-sm">
            <span className="text-portfolio-neon-blue">📍 Location:</span> Kathmandu, Nepal
            <br />
            <span className="text-portfolio-neon-blue">⏰ Timezone:</span> UTC+5:45
            <br />
            <span className="text-portfolio-neon-blue">💼 Status:</span> Available for freelance
          </p>
        </motion.div>
      </div>
    </div>
  );
}
