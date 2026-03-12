'use client';

import {
    User,
    Lock,
    Shield,
    Bell,
    EyeOff,
    LogOut,
    Trash2,
    ChevronRight,
    ArrowLeft,
    Monitor,
    Globe,
    HelpCircle,
    Info,
    Smartphone
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

export default function SettingsPage() {
    const router = useRouter();
    const { logout } = useAuth();

    const sections = [
        {
            title: "Your Account & Activity",
            items: [
                { icon: User, label: "Edit Profile", href: "/settings/edit-profile", color: "text-primary" },
                { icon: Bell, label: "Notifications", href: "/settings/notifications", color: "text-orange-500" },
                { icon: Monitor, label: "Display & Dark Mode", href: "/settings/display", color: "text-zinc-500" },
            ]
        },
        {
            title: "Who can see your content",
            items: [
                { icon: Shield, label: "Account Privacy", href: "/settings/privacy", color: "text-green-500" },
                { icon: EyeOff, label: "Blocked Users", href: "/settings/blocked", color: "text-red-500" },
                { icon: Globe, label: "Language", href: "/settings/language", color: "text-blue-500" },
            ]
        },
        {
            title: "Security & Login",
            items: [
                { icon: Lock, label: "Security", href: "/settings/security", color: "text-yellow-500" },
                { icon: Smartphone, label: "Two-Factor Auth", href: "/settings/tfa", color: "text-cyan-500" },
                { icon: Info, label: "Account Status", href: "/settings/status", color: "text-emerald-500" },
            ]
        },
        {
            title: "Support & About",
            items: [
                { icon: HelpCircle, label: "Help Center", href: "/support", color: "text-zinc-400" },
                { icon: Info, label: "About Aura", href: "/about", color: "text-zinc-400" },
            ]
        }
    ];

    const handleLogout = async () => {
        if (confirm("Are you sure you want to log out?")) {
            await logout();
            router.push('/login');
        }
    };

    const handleDeleteAccount = () => {
        alert("Account deletion requested. This feature is coming soon!");
    };

    return (
        <div className="flex flex-col min-h-screen bg-transparent pb-24 selection:bg-primary/20 relative">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-background/40 backdrop-blur-2xl border-b border-border/20 px-4 py-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-foreground/5 rounded-full transition-all active:scale-90"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-xl font-bold tracking-tight">Settings and activity</h1>
                </div>
            </div>

            {/* Premium Top Highlight */}
            <div className="px-4 pt-6 relative z-10">
                <div className="p-4 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 overflow-hidden relative shadow-2xl">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <Shield size={80} className="rotate-12" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Account Center</p>
                    <h3 className="text-sm font-bold mb-1">Password, security, personal details</h3>
                    <p className="text-xs text-foreground/40 font-medium">Manage your connected experiences across Aura Space.</p>
                </div>
            </div>

            {/* Settings Sections */}
            <div className="flex-1 px-4 space-y-10 pt-8 relative z-10">
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
                        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[28px] overflow-hidden shadow-xl">
                            {section.items.map((item, i) => (
                                <button
                                    key={i}
                                    onClick={() => router.push(item.href)}
                                    className={`w-full flex items-center justify-between p-5 hover:bg-white/[0.05] transition-all group active:bg-white/[0.1] ${i < section.items.length - 1 ? 'border-b border-white/5' : ''}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`${item.color} transition-transform group-hover:scale-110`}>
                                            <item.icon size={22} strokeWidth={2.5} />
                                        </div>
                                        <span className="font-bold text-[15px] tracking-tight">{item.label}</span>
                                    </div>
                                    <ChevronRight size={18} className="text-foreground/20 group-hover:text-foreground/40 group-hover:translate-x-1 transition-all" />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                ))}

                {/* Account Actions */}
                <div className="space-y-4 pt-6">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 p-5 text-red-500 font-bold bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 rounded-[28px] transition-all active:scale-[0.98]"
                    >
                        <LogOut size={20} strokeWidth={2.5} />
                        Log Out
                    </button>
                    <button
                        onClick={handleDeleteAccount}
                        className="w-full flex items-center justify-center gap-2 p-5 text-foreground/30 font-bold hover:text-red-500 transition-all text-xs uppercase tracking-widest"
                    >
                        <Trash2 size={16} />
                        Delete Account
                    </button>
                </div>

                {/* Meta Branding - I mean Aura Space Branding */}
                <div className="text-center pt-8 pb-12 space-y-2 opacity-50">
                    <div className="flex items-center justify-center gap-2">
                        <p className="text-[11px] font-black tracking-[0.3em] text-foreground uppercase italic bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Aura Space</p>
                    </div>
                    <p className="text-[9px] text-foreground/40 font-bold uppercase tracking-widest">Version 2.4.0 (Instagram Pro Edition)</p>
                </div>
            </div>
        </div>
    );
}
