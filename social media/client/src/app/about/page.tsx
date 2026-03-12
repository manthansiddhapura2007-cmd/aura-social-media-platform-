'use client';

import { ArrowLeft, Heart, Shield, Award, Terminal, Code2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AboutAura() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen bg-background pb-20 selection:bg-primary/20">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-2xl border-b border-border/50 px-4 py-5 flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="p-2 hover:bg-foreground/5 rounded-full transition-all active:scale-90"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold tracking-tight">About</h1>
            </div>

            <div className="px-4 py-12 flex flex-col items-center">
                {/* Logo Section */}
                <motion.div
                    initial={{ rotate: -10, scale: 0.9, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    className="mb-8"
                >
                    <div className="w-28 h-28 rounded-[40px] gradient-bg shadow-2xl flex items-center justify-center text-white relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors" />
                        <h1 className="text-4xl font-black italic tracking-tighter z-10">A</h1>
                    </div>
                </motion.div>

                <div className="text-center space-y-2 mb-12">
                    <h2 className="text-2xl font-black tracking-tight uppercase italic bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">Aura Space</h2>
                    <p className="text-xs font-black tracking-[0.4em] text-foreground/20 uppercase">Version 2.4.0</p>
                </div>

                <div className="w-full space-y-6">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 px-2 text-center">Our Commitment</h2>
                    <div className="bg-foreground/[0.03] border border-border/40 rounded-[40px] p-8 space-y-8">
                        <div className="flex items-start gap-4">
                            <Shield className="text-primary shrink-0" size={24} />
                            <div className="space-y-1">
                                <p className="font-bold text-sm">Privacy by Design</p>
                                <p className="text-xs text-foreground/40 font-medium leading-relaxed">Your data is yours. We use end-to-end encryption for all messages and maintain high security standards.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Heart className="text-red-500 shrink-0" size={24} />
                            <div className="space-y-1">
                                <p className="font-bold text-sm">Community First</p>
                                <p className="text-xs text-foreground/40 font-medium leading-relaxed">Built for creators and dreamers. Aura is a safe space for expression and connection.</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-foreground/[0.03] border border-border/40 rounded-[32px] p-6 text-center space-y-2">
                            <Code2 className="mx-auto text-blue-500" size={20} />
                            <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 italic">Open Source Contribution</p>
                        </div>
                        <div className="bg-foreground/[0.03] border border-border/40 rounded-[32px] p-6 text-center space-y-2">
                            <Award className="mx-auto text-yellow-500" size={20} />
                            <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 italic">Premium Experience</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center space-y-4">
                    <p className="text-xs font-bold text-foreground/20 italic">Designed and developed with precision for the modern web.</p>
                    <div className="flex items-center justify-center gap-6">
                        {["Terms", "Privacy", "Cookies", "Jobs"].map((t, i) => (
                            <button key={i} className="text-[10px] font-black uppercase tracking-widest text-foreground/40 hover:text-primary transition-colors">{t}</button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
