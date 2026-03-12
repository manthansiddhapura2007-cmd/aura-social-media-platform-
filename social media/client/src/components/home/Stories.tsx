'use client';

import { Plus } from 'lucide-react';
import Image from 'next/image';
import { MOCK_STORIES } from '@/lib/mock-data';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useState } from 'react';

import { StoryViewer } from './StoryViewer';

export function Stories() {
    const [viewerOpen, setViewerOpen] = useState(false);
    const [startIndex, setStartIndex] = useState(0);

    const openViewer = (index: number) => {
        setStartIndex(index);
        setViewerOpen(true);
    };

    return (
        <>
            <div className="flex items-center gap-4 px-4 py-4 md:py-6 overflow-x-auto scrollbar-hide bg-white/5 backdrop-blur-md border-b border-white/10 shadow-xl transition-all duration-300 relative z-10 my-2 rounded-3xl mx-2 sm:mx-0">
                {/* Add My Story */}
                <div className="flex flex-col items-center gap-1.5 min-w-[72px]">
                    <div className="relative group cursor-pointer active:scale-95 transition-transform">
                        <div className="p-[2.5px] rounded-full border border-border">
                            <div className="relative w-[62px] h-[62px] rounded-full overflow-hidden bg-foreground/5">
                                <Image
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
                                    alt="My Story"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="absolute bottom-0 right-0 p-1 bg-primary text-white rounded-full border-2 border-background shadow-lg group-hover:scale-110 transition-transform">
                            <Plus size={14} strokeWidth={4} />
                        </div>
                    </div>
                    <span className="text-[11px] font-medium text-foreground/60 truncate w-full text-center">Your Story</span>
                </div>

                {/* Other Stories */}
                {MOCK_STORIES.map((story, index) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.04, type: "spring", stiffness: 260, damping: 20 }}
                        key={story.id}
                        className="flex flex-col items-center gap-1.5 min-w-[72px]"
                        onClick={() => openViewer(index)}
                    >
                        <div className="relative group cursor-pointer active:scale-95 transition-transform">
                            <div className={cn(
                                "rounded-full p-[2.5px]",
                                story.viewers.length > 0 ? "bg-zinc-200 dark:bg-zinc-800" : "insta-ring"
                            )}>
                                <div className="p-[2px] rounded-full bg-background transition-colors duration-300">
                                    <div className="relative w-[62px] h-[62px] rounded-full overflow-hidden">
                                        <Image
                                            src={story.author.photoURL}
                                            alt={story.author.username}
                                            fill
                                            className="object-cover group-hover:rotate-6 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span className="text-[11px] font-medium truncate w-full text-center tracking-tight text-foreground/90">
                            {story.author.username}
                        </span>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {viewerOpen && (
                    <StoryViewer
                        stories={MOCK_STORIES}
                        initialStoryIndex={startIndex}
                        onClose={() => setViewerOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

// Helper for conditional classes if not already imported
function cnHelper(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
