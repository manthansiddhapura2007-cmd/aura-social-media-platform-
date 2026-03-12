'use client';

import { Search, Edit, ArrowLeft, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MOCK_CHATS } from '@/lib/mock-data';
import { motion } from 'framer-motion';

export default function MessagesPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="sticky top-0 z-20 glass border-b border-border px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-foreground/5 rounded-full transition-colors active:scale-90">
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-xl font-black tracking-tighter">Messages</h1>
                        <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">12 Active Now</p>
                    </div>
                </div>
                <button className="p-2 hover:bg-foreground/5 rounded-full text-primary transition-colors active:scale-90">
                    <Edit size={24} />
                </button>
            </div>

            <div className="p-4">
                {/* Search */}
                <div className="relative group mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search chats..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-foreground/5 border border-border outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium text-sm"
                    />
                </div>

                {/* Chat List */}
                <div className="space-y-4">
                    {MOCK_CHATS.map((chat, index) => {
                        const otherUser = chat.participantDetails[Object.keys(chat.participantDetails).find(uid => uid !== 'currentUser') || 'user1'];
                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                key={chat.id}
                            >
                                <Link
                                    href={`/messages/${chat.id}`}
                                    className="flex items-center gap-4 p-4 rounded-3xl hover:bg-foreground/5 dark:hover:bg-white/5 border border-transparent hover:border-border transition-all active:scale-[0.98] group"
                                >
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden p-[2px] gradient-bg">
                                            <div className="w-full h-full rounded-[14px] border-2 border-background overflow-hidden relative bg-background">
                                                <Image
                                                    src={chat.isGroup ? (chat.groupImage || '') : otherUser.photoURL}
                                                    alt={chat.isGroup ? (chat.groupName || '') : otherUser.displayName}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-background rounded-full"></div>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className="font-bold truncate text-sm tracking-tight text-foreground/90">
                                                {chat.isGroup ? chat.groupName : otherUser.displayName}
                                            </h3>
                                            <span className="text-[10px] text-foreground/40 font-bold uppercase">{new Date(chat.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className={`text-xs truncate max-w-[200px] ${chat.lastMessage?.readBy.includes('currentUser') ? 'text-foreground/50' : 'text-foreground font-black'}`}>
                                                {chat.lastMessage?.senderId === 'currentUser' ? 'You: ' : ''}
                                                {chat.lastMessage?.content}
                                            </p>
                                            {!chat.lastMessage?.readBy.includes('currentUser') && (
                                                <span className="w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/40 animate-pulse"></span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
