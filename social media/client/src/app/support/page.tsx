'use client';

import { ArrowLeft, HelpCircle, Search, MessageSquare, BookOpen, Bug, ShieldQuestion } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function HelpCenter() {
    const router = useRouter();

    const sections = [
        { label: "Report a Problem", icon: Bug, color: "text-red-500" },
        { label: "Help Center", icon: BookOpen, color: "text-blue-500" },
        { label: "Privacy and Security Help", icon: ShieldQuestion, color: "text-emerald-500" },
        { label: "Support Requests", icon: MessageSquare, color: "text-purple-500" },
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
                <h1 className="text-xl font-bold tracking-tight">Help</h1>
            </div>

            <div className="px-4 py-8 space-y-8">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-foreground/20" size={20} />
                    <input
                        type="text"
                        placeholder="Search for help..."
                        className="w-full bg-foreground/[0.03] border border-border/40 rounded-[28px] py-5 pl-14 pr-6 font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                    />
                </div>

                <div className="space-y-4">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 px-2">Support Topics</h2>
                    <div className="bg-foreground/[0.03] border border-border/40 rounded-[32px] overflow-hidden">
                        {sections.map((item, i) => (
                            <button
                                key={i}
                                className={`w-full flex items-center justify-between p-6 hover:bg-foreground/[0.05] transition-all group active:bg-foreground/[0.08] ${i < sections.length - 1 ? 'border-b border-border/20' : ''}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`${item.color} p-3 rounded-2xl bg-current/10 group-hover:scale-110 transition-transform`}>
                                        <item.icon size={24} />
                                    </div>
                                    <span className="font-bold text-[16px] tracking-tight">{item.label}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Popular Articles Mock */}
                <div className="space-y-4 pt-4">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 px-2">Popular Articles</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {["Account Security", "Two-Factor Auth", "Blocked Users", "Data Policy"].map((text, i) => (
                            <button key={i} className="p-5 rounded-[28px] bg-foreground/[0.02] border border-border/40 hover:bg-primary/5 hover:border-primary/20 transition-all text-xs font-black uppercase tracking-widest text-foreground/60 hover:text-primary">
                                {text}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
