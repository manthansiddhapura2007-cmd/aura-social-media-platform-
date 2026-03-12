'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, X, Check, Globe, FileText, User, Link as LinkIcon, Lock } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MOCK_USERS } from '@/lib/mock-data';
import { toast } from 'react-hot-toast';

export default function EditProfilePage() {
    const router = useRouter();
    const user = MOCK_USERS[0]; // Mocking currently logged-in user

    const [formData, setFormData] = useState({
        displayName: user.displayName,
        username: user.username,
        bio: user.bio,
        website: user.website || '',
        gender: 'Prefer not to say',
        isPrivate: false
    });

    const [preview, setPreview] = useState(user.photoURL);

    const handleSave = () => {
        toast.success("Profile updated successfully!");
        setTimeout(() => router.back(), 1500);
    };

    return (
        <div className="flex flex-col min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-1 hover:bg-foreground/5 rounded-full">
                        <X size={24} />
                    </button>
                    <h1 className="text-xl font-bold">Edit Profile</h1>
                </div>
                <button
                    onClick={handleSave}
                    className="text-primary font-bold hover:opacity-70 transition-opacity"
                >
                    Done
                </button>
            </div>

            <div className="p-6 space-y-8 max-w-lg mx-auto w-full">
                {/* Profile Photo Edit */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative group cursor-pointer">
                        <div className="w-24 h-24 rounded-full border-2 border-primary/20 p-1">
                            <div className="relative w-full h-full rounded-full overflow-hidden">
                                <Image src={preview} alt="Profile" fill className="object-cover" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera size={24} className="text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="text-primary text-xs font-bold hover:opacity-70 transition-opacity uppercase tracking-widest">
                        Change profile photo
                    </button>
                </div>

                {/* Fields */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 px-1">Name</label>
                        <div className="bg-foreground/5 rounded-2xl border border-border flex items-center px-4 py-3 focus-within:border-primary/50 transition-colors">
                            <User size={18} className="text-foreground/30 mr-3" />
                            <input
                                type="text"
                                value={formData.displayName}
                                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                className="bg-transparent w-full text-sm outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 px-1">Username</label>
                        <div className="bg-foreground/5 rounded-2xl border border-border flex items-center px-4 py-3 focus-within:border-primary/50 transition-colors">
                            <span className="text-foreground/30 mr-1 text-sm font-bold">@</span>
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="bg-transparent w-full text-sm outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 px-1">Website</label>
                        <div className="bg-foreground/5 rounded-2xl border border-border flex items-center px-4 py-3 focus-within:border-primary/50 transition-colors">
                            <LinkIcon size={18} className="text-foreground/30 mr-3" />
                            <input
                                type="text"
                                value={formData.website}
                                placeholder="Add link..."
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                className="bg-transparent w-full text-sm outline-none text-blue-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 px-1">Bio</label>
                        <textarea
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            className="bg-foreground/5 w-full rounded-2xl border border-border p-4 text-sm outline-none focus:border-primary/50 transition-colors h-24 resize-none"
                        />
                    </div>

                    <div className="pt-4 space-y-4">
                        <div className="flex items-center justify-between p-4 bg-foreground/5 rounded-2xl border border-border">
                            <div className="flex items-center gap-3">
                                <Lock size={18} className="text-foreground/30" />
                                <span className="text-sm font-medium">Private Account</span>
                            </div>
                            <button
                                onClick={() => setFormData({ ...formData, isPrivate: !formData.isPrivate })}
                                className={`w-12 h-6 rounded-full transition-colors relative ${formData.isPrivate ? 'bg-primary' : 'bg-foreground/20'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.isPrivate ? 'right-1' : 'left-1'}`} />
                            </button>
                        </div>
                        <p className="text-[10px] text-foreground/30 px-2 leading-relaxed font-medium">
                            When your account is private, only people you approve can see your photos and videos on Aura.
                            Your existing followers won't be affected.
                        </p>
                    </div>
                </div>

                <div className="pt-8 w-full">
                    <button className="w-full text-zinc-500 text-xs font-bold hover:text-primary transition-colors uppercase tracking-widest py-4 border-t border-border/50">
                        Switch to professional account
                    </button>
                    <button className="w-full text-red-500 text-xs font-bold hover:opacity-70 transition-all uppercase tracking-widest py-4 border-t border-border/50">
                        Personal information settings
                    </button>
                </div>
            </div>
        </div>
    );
}
