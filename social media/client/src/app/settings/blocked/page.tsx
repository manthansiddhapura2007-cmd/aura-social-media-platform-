'use client';

import { ArrowLeft, UserX, Search, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

const MOCK_BLOCKED = [
    { id: '1', username: 'shadow_user', name: 'Unknown User', image: 'https://i.pravatar.cc/150?u=shadow' },
    { id: '2', username: 'spambot_99', name: 'Automated Bot', image: 'https://i.pravatar.cc/150?u=99' },
];

export default function BlockedUsersSettings() {
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
                <h1 className="text-xl font-bold tracking-tight">Blocked Users</h1>
            </div>

            <div className="px-4 py-6 space-y-8">
                <div className="p-6 rounded-[32px] bg-red-500/[0.03] border border-red-500/10 flex items-start gap-4">
                    <ShieldAlert className="text-red-500 shrink-0" size={24} />
                    <div className="space-y-1">
                        <p className="font-bold text-sm">Privacy control</p>
                        <p className="text-xs text-foreground/40 font-medium leading-relaxed">Blocked users will not be able to find your profile, posts, or stories on Aura Space. We won't let them know you blocked them.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 px-2">Blocked accounts ({MOCK_BLOCKED.length})</h2>

                    {MOCK_BLOCKED.length > 0 ? (
                        <div className="bg-foreground/[0.03] border border-border/40 rounded-[28px] overflow-hidden">
                            {MOCK_BLOCKED.map((user, i) => (
                                <div
                                    key={user.id}
                                    className={`flex items-center justify-between p-5 ${i < MOCK_BLOCKED.length - 1 ? 'border-b border-border/20' : ''}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl overflow-hidden relative border border-border/40">
                                            <Image src={user.image} alt={user.username} fill className="object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-[15px]">{user.username}</span>
                                            <span className="text-[11px] text-foreground/40 font-medium">{user.name}</span>
                                        </div>
                                    </div>
                                    <button className="px-5 py-2 bg-foreground/5 hover:bg-red-500/10 hover:text-red-500 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 border border-transparent hover:border-red-500/20">
                                        Unblock
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 opacity-20 bg-foreground/[0.02] rounded-[40px] border-2 border-dashed border-border/20">
                            <UserX size={64} strokeWidth={1} />
                            <p className="text-sm font-bold mt-4 italic uppercase tracking-widest">No blocked users</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
