'use client';

import { useState, useRef, useEffect } from 'react';
import { Camera, Image as ImageIcon, X, MapPin, Tag, ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const FILTERS = [
    { name: 'Normal', filter: 'none' },
    { name: 'Clarendon', filter: 'brightness(1.1) contrast(1.1) saturate(1.1)' },
    { name: 'Gingham', filter: 'sepia(0.3) contrast(0.9) brightness(1.1)' },
    { name: 'Moon', filter: 'grayscale(1) contrast(1.1) brightness(1.1)' },
    { name: 'Lark', filter: 'brightness(1.1) contrast(0.9) saturate(1.2)' },
    { name: 'Reyes', filter: 'sepia(0.2) contrast(0.85) brightness(1.1) saturate(0.75)' },
    { name: 'Juno', filter: 'sepia(0.1) contrast(1.1) brightness(1) saturate(1.3) hue-rotate(-10deg)' },
];

const CREATE_TYPES = [
    { id: 'post', label: 'Post', icon: ImageIcon },
    { id: 'story', label: 'Story', icon: Camera },
    { id: 'reel', label: 'Reel', icon: Sparkles },
];

export default function CreatePostPage() {
    const [createType, setCreateType] = useState('post');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [caption, setCaption] = useState('');
    const [storyText, setStoryText] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('none');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        setLoading(true);
        // Simulate upload
        setTimeout(() => {
            toast.success(`${createType.charAt(0).toUpperCase() + createType.slice(1)} shared successfully!`, {
                style: {
                    borderRadius: '16px',
                    background: '#18181b',
                    color: '#fff',
                    fontWeight: 'bold',
                },
            });
            router.push(createType === 'reel' ? '/reels' : '/');
            setLoading(false);
        }, 2000);
    };

    const isVertical = createType === 'story' || createType === 'reel';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col min-h-screen bg-background pb-24"
        >
            {/* Header */}
            <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()} className="p-2 hover:bg-foreground/5 rounded-full">
                        <X size={24} />
                    </button>
                    <h1 className="text-xl font-bold">New {createType.charAt(0).toUpperCase() + createType.slice(1)}</h1>
                </div>
                <button
                    onClick={handleUpload}
                    disabled={!selectedFile || loading}
                    className="px-6 py-2 gradient-bg text-white rounded-xl font-bold disabled:opacity-50 disabled:grayscale transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-primary/20"
                >
                    {loading ? 'Sharing...' : 'Share'}
                    {!loading && <ArrowRight size={18} />}
                </button>
            </div>

            {/* Type Selector */}
            <div className="flex justify-center gap-2 p-4">
                {CREATE_TYPES.map((type) => (
                    <button
                        key={type.id}
                        onClick={() => {
                            setCreateType(type.id);
                            setSelectedFilter('none');
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${createType === type.id ? 'bg-primary text-white scale-105 shadow-lg shadow-primary/30' : 'bg-foreground/5 text-foreground/40 hover:bg-foreground/10'}`}
                    >
                        <type.icon size={14} />
                        {type.label}
                    </button>
                ))}
            </div>

            <div className="p-4 space-y-8 max-w-lg mx-auto w-full">
                {/* Media Selector */}
                <AnimatePresence mode="wait">
                    {!preview ? (
                        <motion.button
                            key="selector"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={() => fileInputRef.current?.click()}
                            className={`w-full ${isVertical ? 'aspect-[9/16]' : 'aspect-square'} border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center gap-6 hover:bg-foreground/5 hover:border-primary/30 transition-all active:scale-95 group`}
                        >
                            <div className="p-6 bg-primary/10 text-primary rounded-3xl group-hover:scale-110 transition-transform">
                                <ImageIcon size={48} />
                            </div>
                            <div className="text-center px-6">
                                <p className="text-lg font-bold">Pick the perfect {createType}</p>
                                <p className="text-sm text-foreground/40 font-medium mt-1">
                                    {isVertical ? 'Best for vertical mobile view (9:16)' : 'Classic square format (1:1)'}
                                </p>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                accept={createType === 'reel' ? 'video/*' : 'image/*,video/*'}
                                className="hidden"
                            />
                        </motion.button>
                    ) : (
                        <motion.div
                            key="preview"
                            initial={{ scale: 1.05, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="space-y-6"
                        >
                            <div className={`relative ${isVertical ? 'aspect-[9/16]' : 'aspect-square'} w-full rounded-3xl overflow-hidden border border-border shadow-2xl bg-black`}>
                                <Image
                                    src={preview}
                                    alt="Preview"
                                    fill
                                    className="object-cover transition-all duration-500"
                                    style={{ filter: selectedFilter }}
                                />

                                {createType === 'story' && storyText && (
                                    <div className="absolute inset-0 flex items-center justify-center p-10 pointer-events-none">
                                        <div className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-2xl text-white font-bold text-center text-xl shadow-2xl">
                                            {storyText}
                                        </div>
                                    </div>
                                )}

                                <button
                                    onClick={() => {
                                        setPreview(null);
                                        setSelectedFile(null);
                                        setSelectedFilter('none');
                                    }}
                                    className="absolute top-4 right-4 p-2 bg-black/60 text-white rounded-xl backdrop-blur-md hover:bg-black/80 transition-all active:scale-90"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Filters Horizontal Scroll - Only for Posts and Stories */}
                            {createType !== 'reel' && (
                                <div className="space-y-4">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 px-1">Instagram Filters</p>
                                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-1">
                                        {FILTERS.map((f, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setSelectedFilter(f.filter)}
                                                className="flex flex-col items-center gap-2 group"
                                            >
                                                <div className={`w-20 h-20 rounded-2xl border-2 transition-all overflow-hidden ${selectedFilter === f.filter ? 'border-primary ring-4 ring-primary/10' : 'border-transparent'}`}>
                                                    <div className="w-full h-full relative group-hover:scale-110 transition-transform">
                                                        <Image src={preview} alt={f.name} fill className="object-cover" style={{ filter: f.filter }} />
                                                    </div>
                                                </div>
                                                <span className={`text-[10px] font-bold ${selectedFilter === f.filter ? 'text-primary' : 'text-foreground/40'}`}>{f.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Form Fields */}
                <div className="space-y-6">
                    {createType === 'story' ? (
                        <div className="space-y-4">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 px-1">Add Story Text</p>
                            <input
                                value={storyText}
                                onChange={(e) => setStoryText(e.target.value)}
                                placeholder="Type something for your story..."
                                className="w-full p-4 rounded-2xl bg-foreground/5 border border-border outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                            />
                        </div>
                    ) : (
                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder={createType === 'reel' ? "Write a caption for your reel..." : "Share the story behind this post..."}
                            className="w-full h-32 p-4 rounded-2xl bg-foreground/5 border border-border outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none placeholder:text-foreground/20"
                        />
                    )}

                    {createType !== 'story' && (
                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center gap-3 p-4 rounded-2xl bg-foreground/5 border border-border hover:bg-foreground/10 transition-all active:scale-95">
                                <MapPin className="text-secondary" size={20} />
                                <span className="text-xs font-bold text-foreground/60">Location</span>
                            </button>
                            <button className="flex items-center gap-3 p-4 rounded-2xl bg-foreground/5 border border-border hover:bg-foreground/10 transition-all active:scale-95">
                                <Tag className="text-secondary" size={20} />
                                <span className="text-xs font-bold text-foreground/60">Tag People</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
