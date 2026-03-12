'use client';

import { ArrowLeft, Check, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

const LANGUAGES = [
    { id: 'en', label: 'English', native: 'English' },
    { id: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { id: 'es', label: 'Spanish', native: 'Español' },
    { id: 'fr', label: 'French', native: 'Français' },
    { id: 'de', label: 'German', native: 'Deutsch' },
    { id: 'ja', label: 'Japanese', native: '日本語' },
    { id: 'ko', label: 'Korean', native: '한국어' },
    { id: 'pt', label: 'Portuguese', native: 'Português' },
];

export default function LanguageSettings() {
    const router = useRouter();
    const [selectedLanguage, setSelectedLanguage] = useState('en');

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
                <h1 className="text-xl font-bold tracking-tight">Language</h1>
            </div>

            <div className="px-4 py-6 space-y-6">
                <div className="p-6 rounded-[32px] bg-primary/[0.03] border border-primary/10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Globe size={24} className="text-primary" />
                        <div>
                            <p className="font-bold text-sm">App Language</p>
                            <p className="text-xs text-foreground/40 font-medium">Choose your preferred language</p>
                        </div>
                    </div>
                    <span className="text-xs font-black text-primary uppercase tracking-widest">{LANGUAGES.find(l => l.id === selectedLanguage)?.label}</span>
                </div>

                <div className="space-y-4">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 px-2">Available Languages</h2>
                    <div className="bg-foreground/[0.03] border border-border/40 rounded-[28px] overflow-hidden">
                        {LANGUAGES.map((lang, i) => (
                            <button
                                key={lang.id}
                                onClick={() => setSelectedLanguage(lang.id)}
                                className={`w-full flex items-center justify-between p-5 hover:bg-foreground/[0.05] transition-all group active:bg-foreground/[0.08] ${i < LANGUAGES.length - 1 ? 'border-b border-border/20' : ''}`}
                            >
                                <div className="flex flex-col items-start">
                                    <span className={`font-bold text-[15px] ${selectedLanguage === lang.id ? 'text-primary' : ''}`}>{lang.label}</span>
                                    <span className="text-[11px] text-foreground/40 font-bold uppercase tracking-widest leading-none mt-1">{lang.native}</span>
                                </div>
                                {selectedLanguage === lang.id && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="text-primary"
                                    >
                                        <Check size={20} strokeWidth={3} />
                                    </motion.div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
