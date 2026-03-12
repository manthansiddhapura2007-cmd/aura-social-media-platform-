'use client';

import { useParams, useRouter } from 'next/navigation';
import { MOCK_USERS, MOCK_POSTS } from '@/lib/mock-data';
import { Settings, Grid, Bookmark, Tag, MapPin, Link as LinkIcon, Calendar, ArrowLeft, Share2 } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { copyToClipboard, getProfileUrl } from '@/lib/utils';
import { toast } from 'react-hot-toast';

export default function UserProfilePage() {
    const params = useParams();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('posts');

    useEffect(() => {
        const foundUser = MOCK_USERS.find(u => u.username === params.username);
        if (foundUser) {
            setUser(foundUser);
        }
    }, [params.username]);

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">User not found</p>
                <button
                    onClick={() => router.push('/')}
                    className="px-6 py-2 bg-foreground/5 rounded-xl text-sm font-bold hover:bg-foreground/10 transition-all"
                >
                    Return Home
                </button>
            </div>
        );
    }

    const userPosts = MOCK_POSTS.filter(p => p.authorId === user.uid);

    const handleShare = async () => {
        const url = getProfileUrl(user.username);
        const success = await copyToClipboard(url);
        if (success) {
            toast.success('Profile link copied!', {
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
        <div className="flex flex-col min-h-screen pb-20 bg-transparent">
            {/* Nav Header */}
            <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-foreground/5 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-sm font-bold">@{user.username}</h1>
                </div>
                <button onClick={handleShare} className="p-2 hover:bg-foreground/5 rounded-full transition-colors">
                    <Share2 size={20} />
                </button>
            </div>

            {/* Cover Photo Area */}
            <div className="relative h-48 md:h-64 w-full bg-foreground/5">
                {user.coverURL && (
                    <Image
                        src={user.coverURL}
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
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative group mb-4"
                    >
                        <div className="w-32 h-32 rounded-3xl p-[4px] gradient-bg shadow-2xl">
                            <div className="w-full h-full rounded-[20px] border-4 border-background overflow-hidden relative bg-background">
                                <Image
                                    src={user.photoURL}
                                    alt="Profile"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>

                    <div className="flex items-center justify-between w-full mb-6">
                        <div className="flex flex-col">
                            <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
                                {user.displayName}
                                {user.isVerified && (
                                    <div className="bg-primary p-0.5 rounded-full">
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg>
                                    </div>
                                )}
                            </h2>
                            <p className="text-sm text-foreground/50 font-medium">@{user.username}</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-6 py-2 gradient-bg text-white rounded-xl font-bold hover:opacity-90 transition-all text-sm shadow-lg shadow-primary/20 active:scale-95">
                                Follow
                            </button>
                        </div>
                    </div>

                    <p className="text-sm font-medium text-foreground/80 leading-relaxed mb-4 max-w-lg">
                        {user.bio}
                    </p>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
                        <div className="flex items-center gap-1.5 text-foreground/40 text-xs font-bold uppercase tracking-wider">
                            <MapPin size={14} />
                            <span>San Francisco, CA</span>
                        </div>
                        {user.website && (
                            <div className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider hover:underline cursor-pointer">
                                <LinkIcon size={14} />
                                <span>{user.website}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1.5 text-foreground/40 text-xs font-bold uppercase tracking-wider">
                            <Calendar size={14} />
                            <span>Joined {new Date(user.createdAt).getFullYear()}</span>
                        </div>
                    </div>

                    <div className="flex gap-10 py-6 border-y border-border w-full mb-6">
                        <div className="flex flex-col items-center">
                            <span className="font-black text-xl">{userPosts.length}</span>
                            <span className="text-[10px] text-foreground/40 font-black uppercase tracking-widest">Posts</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-black text-xl">{user.followers.length}</span>
                            <span className="text-[10px] text-foreground/40 font-black uppercase tracking-widest">Followers</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-black text-xl">{user.following.length}</span>
                            <span className="text-[10px] text-foreground/40 font-black uppercase tracking-widest">Following</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border sticky top-[72px] z-10 bg-background/80 backdrop-blur-md">
                {[
                    { id: 'posts', icon: Grid, label: 'Posts' },
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
                        onClick={() => router.push(`/p/${post.id}`)}
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
