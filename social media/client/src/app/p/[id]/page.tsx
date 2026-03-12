'use client';

import { useParams, useRouter } from 'next/navigation';
import { Post } from '@/components/home/Post';
import { MOCK_POSTS } from '@/lib/mock-data';
import { ArrowLeft, Share2, MoreVertical } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { copyToClipboard, getPostUrl } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function PostPage() {
    const params = useParams();
    const router = useRouter();
    const [post, setPost] = useState<any>(null);

    useEffect(() => {
        const foundPost = MOCK_POSTS.find(p => p.id === params.id);
        if (foundPost) {
            setPost(foundPost);
        }
    }, [params.id]);

    if (!post) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">Post not found</p>
                <button
                    onClick={() => router.push('/')}
                    className="px-6 py-2 bg-foreground/5 rounded-xl text-sm font-bold hover:bg-foreground/10 transition-all"
                >
                    Return Home
                </button>
            </div>
        );
    }

    const handleShare = async () => {
        const url = getPostUrl(post.id);
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
        <div className="flex flex-col min-h-screen bg-background pb-20">
            {/* Nav */}
            <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-foreground/5 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Post</p>
                        <h1 className="text-sm font-bold">Post Details</h1>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleShare} className="p-2 hover:bg-foreground/5 rounded-full transition-colors">
                        <Share2 size={20} />
                    </button>
                    <button className="p-2 hover:bg-foreground/5 rounded-full transition-colors">
                        <MoreVertical size={20} />
                    </button>
                </div>
            </header>

            <main className="max-w-[600px] mx-auto w-full pt-4 px-2">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Post
                        user={{
                            name: post.author.username,
                            image: post.author.photoURL,
                            location: post.location,
                            isVerified: post.author.isVerified
                        }}
                        image={post.mediaURL}
                        likes={post.likes.length}
                        caption={post.content}
                        timestamp={new Date(post.createdAt).toLocaleDateString(undefined, {
                            month: 'long',
                            day: 'numeric'
                        })}
                    />
                </motion.div>
            </main>
        </div>
    );
}
