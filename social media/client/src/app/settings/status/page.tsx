'use client';

import { ArrowLeft, CheckCircle2, AlertCircle, Info, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AccountStatusSettings() {
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
                <h1 className="text-xl font-bold tracking-tight">Account Status</h1>
            </div>

            <div className="px-4 py-12 flex flex-col items-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 rounded-[40px] bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6"
                >
                    <CheckCircle2 size={56} strokeWidth={1.5} />
                </motion.div>

                <h2 className="text-2xl font-black tracking-tight text-center mb-3">Your account is in good standing!</h2>
                <p className="text-sm text-foreground/40 font-medium text-center max-w-xs mb-10">You haven't posted anything that is affecting your account status.</p>

                <div className="w-full space-y-4">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 px-2">Recent Checks</h2>
                    <div className="bg-foreground/[0.03] border border-border/40 rounded-[28px] overflow-hidden">
                        {[
                            { label: "Community Guidelines", status: "No violations", icon: CheckCircle2, color: "text-emerald-500" },
                            { label: "Removed Content", status: "None", icon: CheckCircle2, color: "text-emerald-500" },
                            { label: "Features Access", status: "Full access", icon: CheckCircle2, color: "text-emerald-500" },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`flex items-center justify-between p-5 ${i < 2 ? 'border-b border-border/20' : ''}`}
                            >
                                <div className="flex items-center gap-4 uppercase">
                                    <item.icon size={20} className={item.color} />
                                    <span className="font-bold text-[13px] tracking-widest">{item.label}</span>
                                </div>
                                <span className="text-[11px] font-black italic text-foreground/20">{item.status}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 p-6 rounded-[32px] bg-foreground/[0.02] border border-border/40 w-full flex items-start gap-4">
                    <Info size={20} className="text-primary shrink-0" />
                    <div className="space-y-2">
                        <p className="font-bold text-sm">Learn more about status</p>
                        <p className="text-xs text-foreground/40 font-medium leading-relaxed">If you ever have any content removed or account issues, they will appear here. Following guidelines keeps your reach high.</p>
                        <button className="flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest pt-2">
                            Review Guidelines <ExternalLink size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
