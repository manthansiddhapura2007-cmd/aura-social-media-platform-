'use client';

import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Smile } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { cn, copyToClipboard, getPostUrl } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface PostProps {
    user: {
        name: string;
        image: string;
        location?: string;
        isVerified?: boolean;
    };
    image?: string;
    likes: number;
    caption: string;
    timestamp: string;
}

export function Post({ user, image, likes: initialLikes, caption, timestamp }: PostProps) {
    const router = useRouter();
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(initialLikes);
    const [showHeart, setShowHeart] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const lastTap = useRef<number>(0);

    const handleLike = () => {
        if (!liked) {
            setLikes(prev => prev + 1);
            setLiked(true);
        } else {
            setLikes(prev => prev - 1);
            setLiked(false);
        }
    };

    const handleDoubleTap = (e: React.MouseEvent) => {
        const now = Date.now();
        if (now - lastTap.current < 300) {
            if (!liked) {
                handleLike();
            }
            setShowHeart(true);
            setTimeout(() => setShowHeart(false), 1000);
        }
        lastTap.current = now;
    };

    const handleShare = async () => {
        // Generating a random post ID for mock purposes if none provided
        const url = getPostUrl('post1');
        const success = await copyToClipboard(url);
        if (success) {
            toast.success('Link copied to clipboard!', {
                style: {
                    borderRadius: '16px',
                    background: '#18181b',
                    color: '#fff',
                    fontWeight: 'bold',
                },
            });
        }
    };

    return (
        <article className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl mb-6 transition-all duration-300 shadow-xl overflow-hidden group/post relative z-10 mx-2 sm:mx-0">
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2.5">
                <div className="flex items-center gap-3">
                    <div
                        className="relative w-8 h-8 rounded-full overflow-hidden p-[2px] insta-ring cursor-pointer"
                        onClick={() => router.push(`/${user.name}`)}
                    >
                        <div className="w-full h-full rounded-full overflow-hidden border border-background bg-background">
                            <Image src={user.image} alt={user.name} fill className="object-cover" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                            <span
                                className="text-sm font-bold tracking-tight text-foreground/90 leading-none mb-0.5 cursor-pointer hover:underline"
                                onClick={() => router.push(`/${user.name}`)}
                            >
                                {user.name}
                            </span>
                            {user.isVerified && (
                                <div className="bg-primary p-0.5 rounded-full">
                                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg>
                                </div>
                            )}
                        </div>
                        {user.location && <span className="text-[11px] text-foreground/50 leading-none">{user.location}</span>}
                    </div>
                </div>
                <button className="p-1 hover:text-foreground/60 transition-colors">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* Content Media */}
            {image && (
                <div
                    className="relative aspect-square md:aspect-auto md:max-h-[600px] w-full cursor-pointer overflow-hidden bg-foreground/5 flex items-center justify-center"
                    onClick={handleDoubleTap}
                >
                    <Image
                        src={image}
                        alt="Post content"
                        width={600}
                        height={600}
                        className="object-contain w-full h-auto"
                        priority
                    />

                    {/* Big Heart Animation */}
                    <AnimatePresence>
                        {showHeart && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1.2, opacity: 1 }}
                                exit={{ scale: 1.5, opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                            >
                                <Heart
                                    size={100}
                                    className="text-white fill-white shadow-2xl"
                                    strokeWidth={0}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Actions & Info */}
            <div className="px-3 pt-3 pb-2">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLike}
                            className={cn(
                                "transition-transform active:scale-125 duration-200",
                                liked ? "text-red-500 scale-110" : "text-foreground hover:opacity-60"
                            )}
                        >
                            <Heart size={26} fill={liked ? "currentColor" : "none"} strokeWidth={liked ? 0 : 2} />
                        </button>
                        <button className="text-foreground hover:opacity-60 transition-all">
                            <MessageCircle size={26} strokeWidth={2} />
                        </button>
                        <button
                            onClick={handleShare}
                            className="text-foreground hover:opacity-60 transition-all"
                        >
                            <Send size={26} strokeWidth={2} />
                        </button>
                    </div>
                    <button
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className={cn("text-foreground hover:opacity-60 transition-all active:scale-125", isBookmarked && "scale-110")}
                    >
                        <Bookmark size={26} fill={isBookmarked ? "currentColor" : "none"} strokeWidth={2} />
                    </button>
                </div>

                {/* Liked By Section */}
                <div className="flex items-center gap-1.5 mb-2">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-5 h-5 rounded-full border-2 border-background overflow-hidden relative">
                                <Image src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="Liker" fill className="object-cover" />
                            </div>
                        ))}
                    </div>
                    <p className="text-sm font-bold tracking-tight text-foreground/90">
                        Liked by <span className="hover:opacity-70 cursor-pointer">sarah.k</span> and <span className="hover:opacity-70 cursor-pointer">{likes.toLocaleString()} others</span>
                    </p>
                </div>

                <div className="space-y-1.5">
                    <div className="text-[13px] leading-relaxed">
                        <span className="font-bold mr-2 text-foreground/95">{user.name}</span>
                        <span className="text-foreground/80">{caption}</span>
                    </div>
                    <button className="text-[13px] text-foreground/40 font-medium hover:text-foreground/60 transition-colors">
                        View all 12 comments
                    </button>
                    <p className="text-[10px] uppercase text-foreground/30 font-bold tracking-tight pt-0.5">
                        {timestamp} • <span className="text-primary hover:underline cursor-pointer">See translation</span>
                    </p>
                </div>
                <div className="pt-3 border-t border-foreground/5 mt-3 flex items-center justify-between gap-3 group">
                    <div className="flex items-center gap-3 flex-1">
                        <Smile size={20} className="text-foreground/40 hover:text-primary transition-colors cursor-pointer" />
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="bg-transparent text-[13px] outline-none w-full placeholder:text-foreground/20 font-medium"
                        />
                    </div>
                    <button className="text-primary text-[13px] font-black opacity-0 group-focus-within:opacity-100 transition-opacity hover:opacity-70">
                        Post
                    </button>
                </div>
            </div>
        </article>
    );
}
