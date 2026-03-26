"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TriangleAlert } from "lucide-react";

export default function DevAlert() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check localStorage to see if the user has already dismissed the alert
    const hasDismissed = localStorage.getItem("dev-alert-dismissed");
    if (!hasDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("dev-alert-dismissed", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-4 right-4 z-50 p-4 w-full max-w-sm md:bottom-8 md:right-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col gap-4 p-5 rounded-2xl bg-neutral-900/90 backdrop-blur-md border border-yellow-400/30 shadow-2xl"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <TriangleAlert className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-semibold text-white">
                  Portfolio <span className="text-yellow-400">Under Development</span>
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  This website is currently in the development phase. Some features, like the live activity sync, might still be in optimization. Welcome to my early build!
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <button
                onClick={handleDismiss}
                className="px-6 py-2 text-sm font-semibold text-black bg-yellow-400 rounded-lg hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-neutral-900"
              >
                Got it!
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
