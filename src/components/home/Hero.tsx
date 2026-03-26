"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, Terminal } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
      {/* Background decorations */}
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-neutral-800/50 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center md:text-left space-y-8"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface border border-neutral-800 rounded-full text-sm font-medium text-primary mb-2 shadow-sm">
            <Terminal className="w-4 h-4" />
            <span>Mobile Development Specialist</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-text-primary leading-tight">
            Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">Robust</span> Apps & Scalable Systems.
          </h1>
          
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto md:mx-0 leading-relaxed">
            I am a Software Engineer specializing in Flutter & Dart. Transforming complex requirements into high-performance, functional applications with deep integrations like Supabase, Docker, and REST APIs.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
            <Link 
              href="#projects" 
              className="group flex items-center justify-center space-x-2 px-8 py-4 bg-primary text-background font-bold rounded-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              <span>View Projects</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="#about" 
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-surface border border-neutral-800 text-text-primary font-medium rounded-xl hover:border-primary/50 hover:bg-neutral-800/50 transition-all duration-300 w-full sm:w-auto"
            >
              <Download className="w-5 h-5" />
              <span>Resume</span>
            </Link>
          </div>
        </motion.div>

        {/* Visual Element / Photo Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-1 flex justify-center md:justify-end w-full max-w-md md:max-w-none"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[80px]" />
            <div className="relative w-full h-full bg-surface border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center group hover:border-primary/50 transition-colors duration-500">
               <div className="text-neutral-600 flex flex-col items-center">
                 <Terminal className="w-16 h-16 mb-4 group-hover:text-primary transition-colors duration-500" />
                 <span className="text-sm font-mono tracking-widest uppercase">Developer Profile</span>
               </div>
            </div>
            
            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 px-4 py-2 bg-background border border-neutral-800 rounded-xl shadow-xl flex items-center gap-2"
            >
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-xs font-bold font-mono">Flutter/Dart</span>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 px-4 py-2 bg-background border border-neutral-800 rounded-xl shadow-xl flex items-center gap-2"
            >
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-xs font-bold font-mono">Next.js & Supabase</span>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
