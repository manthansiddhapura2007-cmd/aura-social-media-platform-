'use client';

import { useState } from 'react';
import { Heart, MessageCircle, UserPlus, Star, ArrowLeft, ChevronRight, User } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type ActivityItem = {
    id: number;
    type: 'follow' | 'like' | 'story_like' | 'comment' | 'comment_like' | 'multi_like' | 'mention' | 'suggested';
    user?: { name: string; image: string };
    users?: { name: string; image: string }[];
    count?: number;
    time: string;
    isNew?: boolean;
    targetImage?: string;
    content?: string;
    target?: string;
};

type ActivityGroup = {
    title: string;
    items: ActivityItem[];
};

const ACTIVITY_GROUPS: ActivityGroup[] = [
    {
        title: 'New',
        items: [
            {
                id: 1,
                type: 'follow',
                user: { name: 'kylie_jen', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
                time: '2m',
                isNew: true
            }
        ]
    },
    {
        title: 'Today',
        items: [
            {
                id: 2,
                type: 'like',
                user: { name: 'sarah.k', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100' },
                targetImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100',
                time: '4h'
            },
            {
                id: 7,
                type: 'story_like',
                user: { name: 'mike_ross', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100' },
                time: '6h'
            },
        ]
    },
    {
        title: 'This Week',
        items: [
            {
                id: 3,
                type: 'comment',
                user: { name: 'alex.dev', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
                content: 'This project is insane! 🔥',
                targetImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100',
                time: '2d'
            },
            {
                id: 4,
                type: 'multi_like',
                users: [
                    { name: 'emma_w', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
                    { name: 'luna.space', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100' }
                ],
                count: 42,
                targetImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=100',
                time: '3d'
            },
            {
                id: 8,
                type: 'comment_like',
                user: { name: 'zara.style', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
                content: 'Beautiful shot!',
                time: '5d'
            },
        ]
    },
];

const SUGGESTIONS = [
    { id: 101, user: 'cristiano', name: 'Cristiano Ronaldo', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', subtitle: 'Followed by sarah.k + 2 others' },
    { id: 102, user: 'leomessi', name: 'Leo Messi', image: 'https://images.unsplash.com/photo-1504257404702-4296bb1e792e?w=100', subtitle: 'Popular' },
    { id: 103, user: 'natgeo', name: 'National Geographic', image: 'https://images.unsplash.com/photo-1533619019048-987f6365319b?w=100', subtitle: 'Suggested for you' },
];

export default function ActivityPage() {
    const router = useRouter();
    const [following, setFollowing] = useState<number[]>([]);

    const toggleFollow = (id: number) => {
        if (following.includes(id)) {
            setFollowing(following.filter(f => f !== id));
        } else {
            setFollowing([...following, id]);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-1 hover:bg-foreground/5 rounded-full md:hidden">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-black tracking-tight">Notifications</h1>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {/* Follow Requests */}
                <div className="px-4 py-3 flex items-center justify-between hover:bg-foreground/5 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-11 h-11 rounded-full border border-border flex items-center justify-center bg-foreground/5 group-hover:bg-primary/10 transition-colors overflow-hidden">
                                <User size={22} className="text-foreground/60" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background flex items-center justify-center">
                                <span className="text-[8px] text-white font-bold tracking-tighter">8</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[13px] font-bold">Follow Requests</span>
                            <span className="text-xs text-foreground/40 font-medium">Approve or ignore requests</span>
                        </div>
                    </div>
                    <ChevronRight size={16} className="text-foreground/20" />
                </div>

                {/* Activity Groups */}
                {ACTIVITY_GROUPS.map((group) => (
                    <div key={group.title} className="py-1">
                        <h2 className="px-4 py-3 text-sm font-bold text-foreground/90">
                            {group.title}
                        </h2>

                        <div className="space-y-1">
                            {group.items.map((item) => (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    key={item.id}
                                    className="px-4 py-3 flex items-center gap-3 hover:bg-foreground/5 transition-all relative"
                                >
                                    {item.isNew && <div className="w-2 h-2 bg-primary rounded-full absolute left-1 top-1/2 -translate-y-1/2" />}

                                    <div className="relative shrink-0">
                                        {item.type === 'multi_like' && item.users ? (
                                            <div className="flex -space-x-5">
                                                {item.users.map((u, i) => (
                                                    <div key={i} className="w-9 h-9 rounded-full border-2 border-background overflow-hidden relative z-10 transition-transform hover:scale-110">
                                                        <Image src={u.image} alt={u.name} fill className="object-cover" />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : item.user ? (
                                            <div className="w-11 h-11 rounded-full overflow-hidden border border-border/40 p-[1.5px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                                                <div className="w-full h-full rounded-full border-2 border-background overflow-hidden relative">
                                                    <Image src={item.user.image} alt={item.user.name} fill className="object-cover" />
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>

                                    <div className="flex-1 text-[13px] leading-[1.3] font-medium pr-1">
                                        <p className="text-foreground/90">
                                            <span className="font-bold">{item.users ? item.users[0].name : item.user!.name}</span>
                                            {item.type === 'multi_like' && (
                                                <> and <span className="font-bold">{item.count} others</span> liked your post.</>
                                            )}
                                            {item.type === 'follow' && ' started following you.'}
                                            {item.type === 'like' && ' liked your post.'}
                                            {item.type === 'story_like' && ' liked your story.'}
                                            {item.type === 'comment' && ` commented: ${item.content}`}
                                            {item.type === 'comment_like' && ` liked your comment: ${item.content}`}
                                            {item.type === 'mention' && ` mentioned you in ${item.target}.`}
                                            <span className="ml-1 text-foreground/40 font-normal">{item.time}</span>
                                        </p>
                                    </div>

                                    <div className="shrink-0 flex items-center gap-2">
                                        {item.type === 'follow' && (
                                            <button
                                                onClick={() => toggleFollow(item.id)}
                                                className={cn(
                                                    "px-5 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95",
                                                    following.includes(item.id)
                                                        ? "bg-zinc-200 dark:bg-zinc-800 text-foreground"
                                                        : "bg-primary text-white"
                                                )}
                                            >
                                                {following.includes(item.id) ? 'Following' : 'Follow'}
                                            </button>
                                        )}
                                        {item.targetImage && (
                                            <div className="w-11 h-11 rounded-md overflow-hidden border border-border cursor-pointer active:scale-90 transition-transform">
                                                <Image src={item.targetImage} alt="Post thumb" fill className="object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Suggested for You */}
                <div className="mt-6 border-t border-border pt-4 pb-10">
                    <h2 className="px-4 py-2 font-bold">Suggested for you</h2>
                    <div className="divide-y divide-border/30">
                        {SUGGESTIONS.map((s) => (
                            <div key={s.id} className="px-4 py-3 flex items-center justify-between hover:bg-foreground/5 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-full overflow-hidden border border-border relative transition-transform hover:scale-110">
                                        <Image src={s.image} alt={s.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold">{s.user}</span>
                                        <span className="text-[11px] text-foreground/40 font-medium truncate w-32">{s.subtitle}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleFollow(s.id)}
                                    className={cn(
                                        "px-5 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95",
                                        following.includes(s.id)
                                            ? "bg-zinc-200 dark:bg-zinc-800 text-foreground"
                                            : "bg-primary text-white"
                                    )}
                                >
                                    {following.includes(s.id) ? 'Following' : 'Follow'}
                                </button>
                            </div>
                        ))}
                    </div>
                    <button className="w-full py-4 text-primary text-xs font-bold hover:bg-foreground/5 transition-colors">
                        See All Suggestions
                    </button>
                </div>
            </div>
        </div>
    );
}
