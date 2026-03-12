'use client';

import { Heart, MessageCircle, Send, MoreVertical, Music } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const REELS_DATA = [
    {
        id: 1,
        url: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-light-dancing-2922-large.mp4',
        user: 'dancer.aura',
        caption: 'Neon vibes only 💖✨ #dance #neon #vibes',
        music: 'Original Audio - Night City',
        likes: '124k',
        comments: '1.2k'
    },
    {
        id: 2,
        url: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-leaves-and-sun-rays-in-autumn-2931-large.mp4',
        user: 'nature.pixel',
        caption: 'Golden hour hits different 🍂☀️ #nature #autumn',
        music: 'Peaceful Morning - Nature Sounds',
        likes: '89k',
        comments: '450'
    },
    {
        id: 3,
        url: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plate-and-cutlery-on-a-wooden-table-3015-large.mp4',
        user: 'foodie.central',
        caption: 'Best brunch spot in town! 🥞☕ #brunch #foodie',
        music: 'Chill Beats - Coffee Shop',
        likes: '45k',
        comments: '890'
    }
];

export default function ReelsPage() {
    const [activeReel, setActiveReel] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.getAttribute('data-index') || '0');
                        setActiveReel(index);
                    }
                });
            },
            { threshold: 0.7 }
        );

        const elements = document.querySelectorAll('.reel-item');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            className="h-[calc(100vh-60px)] w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-black"
        >
            {REELS_DATA.map((reel, index) => (
                <div key={reel.id} className="reel-item h-full w-full snap-start" data-index={index}>
                    <Reel {...reel} active={activeReel === index} />
                </div>
            ))}
        </div>
    );
}

function Reel({ url, user, caption, music, likes, comments, active }: any) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [liked, setLiked] = useState(false);
    const [following, setFollowing] = useState(false);

    useEffect(() => {
        if (active && videoRef.current) {
            videoRef.current.play();
        } else if (videoRef.current) {
            videoRef.current.pause();
        }
    }, [active]);

    return (
        <div className="h-full w-full snap-start relative bg-black flex items-center justify-center">
            <video
                ref={videoRef}
                src={url}
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 flex flex-col justify-end p-4">
                <div className="flex justify-between items-end gap-4">
                    <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[2px]">
                                <div className="w-full h-full rounded-full border-2 border-black overflow-hidden relative">
                                    <img src={`https://ui-avatars.com/api/?name=${user}`} alt={user} className="object-cover" />
                                </div>
                            </div>
                            <span className="font-bold text-white shadow-sm">{user}</span>
                            <button
                                onClick={() => setFollowing(!following)}
                                className={`px-4 py-1 rounded-lg text-xs font-bold transition-all ${following ? 'bg-white/10 text-white border-white/20' : 'bg-primary text-white shadow-lg'}`}
                            >
                                {following ? 'Following' : 'Follow'}
                            </button>
                        </div>
                        <p className="text-white text-sm line-clamp-2 shadow-sm font-medium">{caption}</p>
                        <div className="flex items-center gap-2 text-white/80 overflow-hidden w-40">
                            <Music size={14} />
                            <div className="animate-marquee text-xs font-medium">
                                {music}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-5 text-white">
                        <div className="flex flex-col items-center gap-1">
                            <button
                                onClick={() => setLiked(!liked)}
                                className={`p-2 rounded-full backdrop-blur-md transition-all active:scale-125 ${liked ? 'text-red-500' : 'bg-white/10'}`}
                            >
                                <Heart size={28} fill={liked ? 'currentColor' : 'none'} strokeWidth={2.5} />
                            </button>
                            <span className="text-xs font-bold">{likes}</span>
                        </div>

                        <div className="flex flex-col items-center gap-1">
                            <button className="p-2 rounded-full bg-white/10 backdrop-blur-md">
                                <MessageCircle size={28} strokeWidth={2.5} />
                            </button>
                            <span className="text-xs font-bold">{comments}</span>
                        </div>

                        <button className="p-2 rounded-full bg-white/10 backdrop-blur-md">
                            <Send size={28} strokeWidth={2.5} />
                        </button>

                        <button className="p-2 rounded-full bg-white/10 backdrop-blur-md">
                            <MoreVertical size={24} strokeWidth={2.5} />
                        </button>

                        <div className="w-8 h-8 rounded-lg border-2 border-white overflow-hidden animate-spin-slow">
                            <img src={`https://ui-avatars.com/api/?name=Music`} alt="disc" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
