'use client';

import { ArrowLeft, Key, Smartphone, ShieldCheck, Mail, History, Monitor } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SecuritySettings() {
    const router = useRouter();

    const sections = [
        {
            title: "Login Security",
            items: [
                { label: "Password", value: "Updated 3 months ago", icon: Key },
                { label: "Two-Factor Authentication", value: "Recommended", icon: Smartphone },
                { label: "Saved Login Info", value: "On", icon: ShieldCheck },
            ]
        },
        {
            title: "Data & History",
            items: [
                { label: "Apps and Websites", value: "", icon: Monitor },
                { label: "Search History", value: "Latest: 'aura.space'", icon: History },
                { label: "Security Checkup", value: "Start", icon: ShieldCheck, highlight: true },
            ]
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
                <h1 className="text-xl font-bold tracking-tight">Security</h1>
            </div>

            <div className="px-4 py-8 space-y-10">
                {/* Visual Security Badge */}
                <div className="flex flex-col items-center justify-center space-y-4 py-4">
                    <div className="w-24 h-24 rounded-[40px] bg-emerald-500/10 flex items-center justify-center text-emerald-500 relative">
                        <ShieldCheck size={48} strokeWidth={2} />
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.2, opacity: 0.2 }}
                            transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                            className="absolute inset-0 rounded-[40px] border-4 border-emerald-500"
                        />
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-black tracking-tight">Account Secure</h3>
                        <p className="text-xs text-foreground/40 font-medium italic">Last check: Just now</p>
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
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-xl ${item.highlight ? 'bg-primary/10 text-primary' : 'bg-foreground/5 text-foreground/40'}`}>
                                            <item.icon size={20} />
                                        </div>
                                        <span className="font-bold text-[15px] tracking-tight">{item.label}</span>
                                    </div>
                                    <span className={`text-[11px] font-black italic uppercase tracking-wider ${item.highlight ? 'text-primary animate-pulse' : 'text-foreground/20'}`}>
                                        {item.value}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
