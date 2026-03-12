'use client';

import { ArrowLeft, MoreVertical, Phone, Video, Send, Image as ImageIcon, Smile, Mic, Play } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { MOCK_CHATS, MOCK_MESSAGES } from '@/lib/mock-data';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatDetailPage() {
    const router = useRouter();
    const params = useParams();
    const chatId = params.id as string;
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const chat = MOCK_CHATS.find(c => c.id === chatId) || MOCK_CHATS[0];
    const messages = MOCK_MESSAGES[chatId] || [];
    const otherUser = chat.participantDetails[Object.keys(chat.participantDetails).find(uid => uid !== 'currentUser') || 'user1'];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    useEffect(() => {
        if (newMessage.length > 0) {
            setIsTyping(true);
            const timer = setTimeout(() => setIsTyping(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [newMessage]);

    return (
        <div className="flex flex-col h-screen bg-background">
            {/* Header */}
            <div className="glass border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-20">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()} className="p-2 hover:bg-foreground/5 rounded-full transition-colors active:scale-90">
                        <ArrowLeft size={24} />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden p-[2px] gradient-bg shadow-sm">
                            <div className="w-full h-full rounded-[8px] bg-background relative overflow-hidden">
                                <Image
                                    src={chat.isGroup ? (chat.groupImage || '') : otherUser.photoURL}
                                    alt="Avatar"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-sm font-bold tracking-tight">
                                {chat.isGroup ? chat.groupName : otherUser.displayName}
                            </h2>
                            <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1">
                                <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                                Online
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2.5 hover:bg-foreground/5 rounded-xl transition-colors text-foreground/60"><Phone size={20} /></button>
                    <button className="p-2.5 hover:bg-foreground/5 rounded-xl transition-colors text-foreground/60"><Video size={20} /></button>
                    <button className="p-2.5 hover:bg-foreground/5 rounded-xl transition-colors text-foreground/60"><MoreVertical size={20} /></button>
                </div>
            </div>

            {/* Messages Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth scrollbar-hide"
            >
                {/* Profile Header */}
                <div className="flex flex-col items-center justify-center py-10 space-y-3">
                    <div className="w-20 h-20 rounded-3xl p-[3px] gradient-bg">
                        <div className="w-full h-full rounded-[20px] bg-background relative overflow-hidden">
                            <Image
                                src={chat.isGroup ? (chat.groupImage || '') : otherUser.photoURL}
                                alt="Avatar"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <h3 className="font-black text-lg">{chat.isGroup ? chat.groupName : otherUser.displayName}</h3>
                        <p className="text-xs text-foreground/40 font-medium">@{otherUser.username} • Aura Member</p>
                    </div>
                    <button className="px-4 py-1.5 bg-foreground/5 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-foreground/10">View Profile</button>
                </div>

                <AnimatePresence>
                    {messages.map((msg, index) => {
                        const isLast = index === messages.length - 1;
                        const isMine = msg.senderId === 'currentUser';

                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                key={msg.id}
                                className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                            >
                                <div className={`flex ${isMine ? 'justify-end' : 'justify-start'} w-full`}>
                                    <div className={`max-w-[75%] space-y-1`}>
                                        <div className={`px-4 py-3 rounded-2xl text-sm font-medium shadow-sm ${isMine
                                            ? 'gradient-bg text-white rounded-tr-none'
                                            : 'bg-foreground/5 border border-border rounded-tl-none'
                                            }`}>
                                            {msg.type === 'voice' ? (
                                                <div className="flex items-center gap-3 min-w-[150px]">
                                                    <Play size={16} fill="white" />
                                                    <div className="h-1 flex-1 bg-white/20 rounded-full flex items-center">
                                                        <div className="w-1/2 h-full bg-white rounded-full" />
                                                    </div>
                                                    <span className="text-[10px] font-bold">0:14</span>
                                                </div>
                                            ) : msg.content}
                                        </div>
                                    </div>
                                </div>
                                {isLast && isMine && (
                                    <p className="text-[9px] font-bold text-foreground/40 uppercase tracking-widest mt-1 px-1">
                                        Seen just now
                                    </p>
                                )}
                            </motion.div>
                        );
                    })}

                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-start"
                        >
                            <div className="bg-foreground/5 border border-border px-4 py-2 rounded-2xl rounded-tl-none flex items-center gap-1">
                                <div className="w-1 h-1 bg-foreground/30 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <div className="w-1 h-1 bg-foreground/30 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <div className="w-1 h-1 bg-foreground/30 rounded-full animate-bounce" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Input Area */}
            <div className="p-4 glass border-t border-border">
                <div className="flex items-center gap-3 bg-foreground/5 rounded-3xl p-2 pl-4 border border-border focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                    <button className="text-foreground/40 hover:text-primary transition-colors"><ImageIcon size={22} /></button>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Message..."
                        className="flex-1 bg-transparent border-none outline-none text-sm font-medium py-2"
                        onKeyDown={(e) => e.key === 'Enter' && newMessage && setNewMessage('')}
                    />
                    <div className="flex items-center gap-2">
                        {newMessage ? (
                            <motion.button
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                onClick={() => setNewMessage('')}
                                className="p-2.5 gradient-bg text-white rounded-full shadow-lg shadow-primary/20"
                            >
                                <Send size={18} fill="currentColor" />
                            </motion.button>
                        ) : (
                            <div className="flex items-center gap-2 pr-2">
                                <button className="text-foreground/40 hover:text-primary transition-colors hover:scale-110"><Mic size={22} /></button>
                                <button className="text-foreground/40 hover:text-primary transition-colors hover:scale-110"><Smile size={22} /></button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
