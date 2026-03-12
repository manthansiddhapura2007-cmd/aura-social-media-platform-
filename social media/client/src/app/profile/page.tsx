'use client';

import { useAuth } from '@/context/AuthContext';
import { Settings, Grid, Bookmark, Tag, Users, MapPin, Link as LinkIcon, Calendar } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { MOCK_USERS, MOCK_POSTS } from '@/lib/mock-data';
import { motion } from 'framer-motion';

import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const router = useRouter();
    const { user: authUser } = useAuth();
    const [activeTab, setActiveTab] = useState('posts');

    // Use the first mock user as a fallback to show a "premium" profile
    const profileUser = MOCK_USERS[0];
    const userPosts = MOCK_POSTS.filter(p => p.authorId === profileUser.uid);

    return (
        <div className="flex flex-col min-h-screen pb-20 bg-background">
            {/* Cover Photo Area */}
            <div className="relative h-48 md:h-64 w-full bg-foreground/5">
                {profileUser.coverURL && (
                    <Image
                        src={profileUser.coverURL}
                        alt="Cover"
                        fill
                        className="object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background/80" />
            </div>

            {/* Profile Info Section */}
            <div className="px-4 relative -mt-16 sm:-mt-20">
                <div className="flex flex-col items-start">
                    {/* Profile Picture */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative group mb-4"
                    >
                        <div className="w-32 h-32 rounded-3xl p-[4px] gradient-bg shadow-2xl">
                            <div className="w-full h-full rounded-[20px] border-4 border-background overflow-hidden relative bg-background">
                                <Image
                                    src={profileUser.photoURL}
                                    alt="Profile"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Actions Row */}
                    <div className="flex items-center justify-between w-full mb-6">
                        <div className="flex flex-col">
                            <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
                                {profileUser.displayName}
                                {profileUser.isVerified && (
                                    <div className="bg-primary p-0.5 rounded-full">
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg>
                                    </div>
                                )}
                            </h2>
                            <p className="text-sm text-foreground/50 font-medium">@{profileUser.username}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => router.push('/settings')}
                                className="p-2 border border-border rounded-xl hover:bg-foreground/5 transition-colors"
                            >
                                <Settings size={20} />
                            </button>
                            <button
                                onClick={() => router.push('/settings/edit-profile')}
                                className="px-6 py-2 gradient-bg text-white rounded-xl font-bold hover:opacity-90 transition-all text-sm shadow-lg shadow-primary/20 active:scale-95"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Bio & Links */}
                    <p className="text-sm font-medium text-foreground/80 leading-relaxed mb-4 max-w-lg">
                        {profileUser.bio}
                    </p>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
                        <div className="flex items-center gap-1.5 text-foreground/40 text-xs font-bold uppercase tracking-wider">
                            <MapPin size={14} />
                            <span>San Francisco, CA</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider hover:underline cursor-pointer">
                            <LinkIcon size={14} />
                            <span>{profileUser.website || 'auraspace.dev'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-foreground/40 text-xs font-bold uppercase tracking-wider">
                            <Calendar size={14} />
                            <span>Joined {new Date(profileUser.createdAt).getFullYear()}</span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-10 py-6 border-y border-border w-full mb-6">
                        <div className="flex flex-col items-center">
                            <span className="font-black text-xl">{userPosts.length}</span>
                            <span className="text-[10px] text-foreground/40 font-black uppercase tracking-widest">Posts</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-black text-xl">{profileUser.followers.length}</span>
                            <span className="text-[10px] text-foreground/40 font-black uppercase tracking-widest">Followers</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-black text-xl">{profileUser.following.length}</span>
                            <span className="text-[10px] text-foreground/40 font-black uppercase tracking-widest">Following</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Highlights Section */}
            <div className="px-4 mb-8 overflow-x-auto scrollbar-hide flex gap-6">
                {['Paris', 'Work', 'Art', 'Vibes'].map((h, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 min-w-[70px]">
                        <div className="w-16 h-16 rounded-full border-2 border-border p-1 hover:border-primary transition-colors cursor-pointer">
                            <div className="w-full h-full rounded-full bg-foreground/5 relative overflow-hidden">
                                <Image
                                    src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=100&h=100&fit=crop`}
                                    alt={h}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">{h}</span>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border sticky top-14 z-10 bg-background/80 backdrop-blur-md">
                {[
                    { id: 'posts', icon: Grid, label: 'Posts' },
                    { id: 'saved', icon: Bookmark, label: 'Saved' },
                    { id: 'tagged', icon: Tag, label: 'Tagged' }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center py-4 gap-2 transition-all ${activeTab === tab.id ? 'border-b-2 border-primary text-primary' : 'text-foreground/40'}`}
                    >
                        <tab.icon size={18} />
                        <span className="text-xs font-black uppercase tracking-widest">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3 gap-[2px] mt-[2px]">
                {userPosts.map((post, i) => (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        key={post.id}
                        className="aspect-square relative group cursor-pointer overflow-hidden"
                    >
                        <Image
                            src={post.mediaURL || ''}
                            alt={`Post ${i}`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white text-xs font-black italic">
                            <span className="flex items-center gap-1.5"><Grid size={16} /> {post.likes.length}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
