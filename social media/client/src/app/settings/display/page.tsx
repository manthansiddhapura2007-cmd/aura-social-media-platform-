'use client';

import { ArrowLeft, Moon, Sun, Monitor, Type, Layout } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function DisplaySettings() {
    const router = useRouter();
    const [theme, setTheme] = useState('system');

    const themes = [
        { id: 'light', label: 'Light', icon: Sun },
        { id: 'dark', label: 'Dark', icon: Moon },
        { id: 'system', label: 'System', icon: Monitor },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background pb-24 selection:bg-primary/20">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-2xl border-b border-border/50 px-4 py-5 flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="p-2 hover:bg-foreground/5 rounded-full transition-all active:scale-90"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold tracking-tight">Display & Dark Mode</h1>
            </div>

            <div className="px-4 py-8 space-y-12">
                {/* Theme Selection */}
                <div className="space-y-6">
                    <div className="px-2">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30">Theme</h2>
                        <p className="text-xs text-foreground/40 font-medium mt-1">Adjust how Aura Space looks on your device.</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {themes.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => setTheme(t.id)}
                                className={`p-6 rounded-[32px] border-2 transition-all flex flex-col items-center gap-4 ${theme === t.id ? 'border-primary bg-primary/5' : 'border-border/40 bg-foreground/[0.02] hover:bg-foreground/[0.05]'}`}
                            >
                                <t.icon size={28} className={theme === t.id ? 'text-primary' : 'text-foreground/40'} />
                                <span className={`text-xs font-black uppercase tracking-widest ${theme === t.id ? 'text-primary' : 'text-foreground/40'}`}>{t.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Text Size & Accessibility */}
                <div className="space-y-4">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 px-2">Accessibility</h2>
                    <div className="bg-foreground/[0.03] border border-border/40 rounded-[28px] overflow-hidden">
                        {[
                            { icon: Type, label: "Text Size", value: "Default" },
                            { icon: Layout, label: "Feed Layout", value: "Modern" },
                        ].map((item, i) => (
                            <button
                                key={i}
                                className="w-full flex items-center justify-between p-5 hover:bg-foreground/[0.05] transition-all group"
                            >
                                <div className="flex items-center gap-4 text-foreground/40">
                                    <item.icon size={20} />
                                    <span className="font-bold text-[15px] text-foreground tracking-tight">{item.label}</span>
                                </div>
                                <span className="text-xs font-bold text-primary italic">{item.value}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Preview Card */}
                <div className="p-8 rounded-[40px] bg-gradient-to-br from-primary/20 via-background to-secondary/20 border border-primary/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <Layout size={100} className="rotate-12" />
                    </div>
                    <div className="space-y-4 relative">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl gradient-bg" />
                            <div className="space-y-1">
                                <div className="w-24 h-2 bg-foreground/10 rounded-full" />
                                <div className="w-16 h-2 bg-foreground/5 rounded-full" />
                            </div>
                        </div>
                        <p className="text-sm font-bold opacity-60">This is a preview of how the new modern layout will look with your chosen theme.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
