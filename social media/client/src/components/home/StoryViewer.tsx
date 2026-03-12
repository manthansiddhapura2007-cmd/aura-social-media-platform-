'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Send, Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { copyToClipboard, getStoryUrl } from '@/lib/utils';
import { toast } from 'react-hot-toast';

interface StoryViewerProps {
    stories: any[];
    initialStoryIndex: number;
    onClose: () => void;
}

export function StoryViewer({ stories, initialStoryIndex, onClose }: StoryViewerProps) {
    const [currentIndex, setCurrentIndex] = useState(initialStoryIndex);
    const [progress, setProgress] = useState(0);

    const currentStory = stories[currentIndex];

    useEffect(() => {
        setProgress(0);
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    handleNext();
                    return 0;
                }
                return prev + 1;
            });
        }, 50); // 5 seconds total (50ms * 100)

        return () => clearInterval(interval);
    }, [currentIndex]);

    const handleNext = () => {
        if (currentIndex < stories.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onClose();
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleShare = async () => {
        const url = getStoryUrl(currentStory.author.username);
        const success = await copyToClipboard(url);
        if (success) {
            toast.success('Story link copied!', {
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
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
            <div className="relative w-full max-w-lg h-full max-h-[900px] bg-zinc-900 overflow-hidden md:rounded-3xl shadow-2xl">
                {/* Progress Bars */}
                <div className="absolute top-4 left-4 right-4 z-20 flex gap-1">
                    {stories.map((_, i) => (
                        <div key={i} className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white transition-all duration-100 ease-linear"
                                style={{
                                    width: i < currentIndex ? '100%' : i === currentIndex ? `${progress}%` : '0%'
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Header */}
                <div className="absolute top-8 left-4 right-4 z-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border-2 border-white/20 p-0.5">
                            <div className="w-full h-full rounded-full overflow-hidden relative">
                                <Image src={currentStory.author.photoURL} alt={currentStory.author.username} fill className="object-cover" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-bold text-sm shadow-sm">{currentStory.author.username}</span>
                            <span className="text-white/60 text-[10px] font-bold shadow-sm uppercase">2 hours ago</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-white p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Media */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStory.id}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={currentStory.mediaURL || currentStory.author.photoURL}
                            alt="Story Content"
                            fill
                            className="object-cover"
                        />
                        {/* Story Text Overlay Mock */}
                        <div className="absolute inset-0 flex items-center justify-center p-12 pointer-events-none">
                            <p className="text-white font-black text-center text-2xl drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                                {currentIndex === 0 ? "Vibin' in the studio! 🎵" : "Coming soon... 🚀"}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Areas */}
                <div className="absolute inset-0 flex z-10">
                    <div className="w-1/3 h-full cursor-west-resize" onClick={handlePrev} />
                    <div className="w-2/3 h-full cursor-east-resize" onClick={handleNext} />
                </div>

                {/* Desktop Controls */}
                <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full hidden md:block"
                >
                    <ChevronLeft size={32} />
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full hidden md:block"
                >
                    <ChevronRight size={32} />
                </button>

                {/* Footer Actions */}
                <div className="absolute bottom-6 left-4 right-4 z-30 flex items-center gap-4">
                    <div className="flex-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 px-6 py-2">
                        <input
                            type="text"
                            placeholder={`Reply to ${currentStory.author.username}...`}
                            className="bg-transparent w-full text-white text-sm outline-none placeholder:text-white/40"
                        />
                    </div>
                    <button className="text-white hover:scale-110 transition-transform">
                        <Heart size={24} />
                    </button>
                    <button
                        onClick={handleShare}
                        className="text-white hover:scale-110 transition-transform"
                    >
                        <Send size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}
