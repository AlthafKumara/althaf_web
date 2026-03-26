"use client";

import { motion } from "framer-motion";
import { Server, Smartphone, Wrench } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-surface/50 border-t border-b border-neutral-800">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto space-y-6 text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight">
            Background & <span className="text-primary">Philosophy</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            I approach mobile and full-stack development as an ecosystem. It’s not just about building a beautiful UI, but ensuring the data layer, backend logic, and user experience work together seamlessly. My workflow often integrates WSL2, Docker, and modern CI/CD to maintain high-quality delivery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Smartphone className="w-8 h-8 text-primary" />,
              title: "Mobile First",
              desc: "Building intuitive, high-performance Flutter apps with GetX and deep native integrations like PaddleOCR.",
            },
            {
              icon: <Server className="w-8 h-8 text-blue-500" />,
              title: "Robust Backend",
              desc: "Leveraging Supabase, Next.js, and Postgres to create scalable backends and secure REST APIs.",
            },
            {
              icon: <Wrench className="w-8 h-8 text-green-500" />,
              title: "Modern DevOps",
              desc: "Utilizing Docker, Github Actions, and WSL2 environments for consistent and reliable deployments.",
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 bg-background border border-neutral-800 rounded-2xl hover:border-primary/40 transition-colors group"
            >
              <div className="mb-6 p-4 bg-surface rounded-xl inline-block group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">{item.title}</h3>
              <p className="text-text-secondary leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
