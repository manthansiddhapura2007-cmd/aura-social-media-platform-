'use client';

import { ArrowLeft, Smartphone, ShieldCheck, Mail, LogOut, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TFASettings() {
    const router = useRouter();
    const [enabled, setEnabled] = useState(false);

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
                <h1 className="text-xl font-bold tracking-tight">Two-Factor Auth</h1>
            </div>

            <div className="px-4 py-10 space-y-10">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-24 h-24 rounded-[40px] bg-primary/10 flex items-center justify-center text-primary">
                        <Smartphone size={48} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight">Keep your account safe</h2>
                        <p className="text-sm text-foreground/40 font-medium max-w-xs mt-2">Get a code via SMS or app every time you log in from a new device.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 px-2">Security Methods</h2>
                    <div className="bg-foreground/[0.03] border border-border/40 rounded-[32px] overflow-hidden">
                        {[
                            { label: "Authentication App", icon: ShieldCheck, desc: "Recommended. Use an app like Google Authenticator." },
                            { label: "Text Message (SMS)", icon: Mail, desc: "Receive a code on your phone number." },
                        ].map((item, i) => (
                            <button
                                key={i}
                                onClick={() => setEnabled(!enabled)}
                                className={`w-full flex items-center justify-between p-6 hover:bg-foreground/[0.05] transition-all group ${i === 0 ? 'border-b border-border/20' : ''}`}
                            >
                                <div className="flex items-center gap-5 text-left">
                                    <div className="p-3 rounded-2xl bg-foreground/5 text-foreground/40 group-hover:text-primary transition-colors">
                                        <item.icon size={24} />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="font-bold text-[15px]">{item.label}</p>
                                        <p className="text-[11px] text-foreground/40 font-medium leading-tight max-w-[200px]">{item.desc}</p>
                                    </div>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${enabled && i === 0 ? 'bg-primary border-primary' : 'border-border/40'}`}>
                                    {enabled && i === 0 && <Check size={14} className="text-white" strokeWidth={3} />}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-6 rounded-[32px] bg-foreground/[0.02] border border-border/40 space-y-4">
                    <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest leading-loose">
                        Turning on two-factor authentication means we'll ask for a code if we see an attempted login from an unrecognized device or browser.
                    </p>
                </div>

                <button
                    disabled={enabled}
                    className="w-full py-5 gradient-bg text-white rounded-[32px] font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/20 hover:opacity-90 transition-all active:scale-95 disabled:grayscale disabled:opacity-50"
                >
                    {enabled ? "Setup Complete" : "Get Started"}
                </button>
            </div>
        </div>
    );
}
