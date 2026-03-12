'use client';

import { ArrowLeft, Bell, MessageSquare, Heart, UserPlus, PlaySquare, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function NotificationsSettings() {
    const router = useRouter();
    const [pauseAll, setPauseAll] = useState(false);

    const notificationTypes = [
        {
            title: "Posts, Stories and Comments",
            items: ["Likes", "Likes and Replies on Comments", "Photos of You", "Comments", "First Posts and Stories"]
        },
        {
            title: "Following and Followers",
            items: ["New Followers", "Accepted Follow Requests", "Account Suggestions", "Mention in Bio"]
        },
        {
            title: "Messages",
            items: ["Message Requests", "Messages", "Group Requests"]
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
                <h1 className="text-xl font-bold tracking-tight">Notifications</h1>
            </div>

            <div className="px-4 py-6 space-y-8">
                {/* Pause All Toggle */}
                <div className="flex items-center justify-between p-5 bg-foreground/[0.03] border border-border/40 rounded-3xl">
                    <div className="space-y-0.5">
                        <p className="font-bold text-[15px]">Pause All</p>
                        <p className="text-xs text-foreground/40 font-medium">Temporarily silence notifications</p>
                    </div>
                    <button
                        onClick={() => setPauseAll(!pauseAll)}
                        className={`w-12 h-6 rounded-full transition-all relative ${pauseAll ? 'bg-primary' : 'bg-foreground/20'}`}
                    >
                        <motion.div
                            animate={{ x: pauseAll ? 26 : 2 }}
                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                        />
                    </button>
                </div>

                {notificationTypes.map((section, idx) => (
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
                                    <span className="text-xs font-bold text-primary italic">On</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
