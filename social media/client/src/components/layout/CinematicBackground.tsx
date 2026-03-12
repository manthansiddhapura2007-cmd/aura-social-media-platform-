'use client';

import { motion } from 'framer-motion';

export function CinematicBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden scale-110">
            {/* Cinematic Background Atmosphere (Aura) */}
            <div className="absolute inset-0 z-0">
                {/* Floating Orbs for Cinematic Depth */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 80, 0],
                        y: [0, -40, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-15%] left-[-5%] w-full h-full bg-primary/10 rounded-full blur-[140px]"
                />
                <motion.div
                    animate={{
                        scale: [1.3, 1, 1.3],
                        x: [0, -60, 0],
                        y: [0, 50, 0]
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-25%] right-[-5%] w-full h-full bg-secondary/10 rounded-full blur-[140px]"
                />

                {/* Noise texture overlay for cinematic feel */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay" />

                <motion.div
                    animate={{
                        opacity: [0.05, 0.15, 0.05],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-radial from-transparent via-background/30 to-background"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
            </div>
        </div>
    );
}
