'use client';

import { ArrowLeft, Lock, Users, MessageCircle, UserPlus, ShieldCheck, Mail, Smartphone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PrivacySettings() {
    const router = useRouter();
    const [isPrivate, setIsPrivate] = useState(false);

    const sections = [
        {
            title: "Interactions",
            items: ["Comments", "Posts", "Mentions", "Stories", "Messages", "Reels and Remix"]
        },
        {
            title: "Connections",
            items: ["Restricted Accounts", "Blocked Users", "Muted Accounts", "Close Friends"]
        }
    ];

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
                <h1 className="text-xl font-bold tracking-tight">Account Privacy</h1>
            </div>

            <div className="px-4 py-6 space-y-8">
                {/* Account Type Toggle */}
                <div className="space-y-4">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 px-2">Account Privacy</h2>
                    <div className="flex items-center justify-between p-5 bg-foreground/[0.03] border border-border/40 rounded-[28px]">
                        <div className="flex items-center gap-4">
                            <div className="text-primary">
                                {isPrivate ? <Lock size={22} strokeWidth={2.5} /> : <Users size={22} strokeWidth={2.5} />}
                            </div>
                            <div className="space-y-0.5">
                                <p className="font-bold text-[15px]">Private Account</p>
                                <p className="text-xs text-foreground/40 font-medium">Only people you approve can see your photos</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsPrivate(!isPrivate)}
                            className={`w-12 h-6 rounded-full transition-all relative ${isPrivate ? 'bg-primary' : 'bg-foreground/20'}`}
                        >
                            <motion.div
                                animate={{ x: isPrivate ? 26 : 2 }}
                                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                            />
                        </button>
                    </div>
                </div>

                {sections.map((section, idx) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={idx}
                        className="space-y-4"
                    >
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 px-2">
                            {section.title}
                        </h2>
                        <div className="bg-foreground/[0.03] border border-border/40 rounded-[28px] overflow-hidden">
                            {section.items.map((item, i) => (
                                <button
                                    key={i}
                                    className={`w-full flex items-center justify-between p-5 hover:bg-foreground/[0.05] transition-all group active:bg-foreground/[0.08] ${i < section.items.length - 1 ? 'border-b border-border/20' : ''}`}
                                >
                                    <span className="font-bold text-[15px] tracking-tight">{item}</span>
                                    <span className="text-xs font-bold text-foreground/20 italic group-hover:text-primary transition-colors">Everyone</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
