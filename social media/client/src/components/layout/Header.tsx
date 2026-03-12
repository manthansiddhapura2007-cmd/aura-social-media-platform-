'use client';

import { Heart, MessageCircle, PlusSquare, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export function Header() {
    const [mounted, setMounted] = useState(false);
    const [dark, setDark] = useState(false);

    useEffect(() => {
        // Force dark mode check on mount
        const isDark = document.documentElement.classList.contains('dark');
        setDark(isDark);
        setMounted(true);
    }, []);

    const toggleDark = () => {
        const isDark = document.documentElement.classList.toggle('dark');
        setDark(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    if (!mounted) return null;

    return (
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border px-4 py-2 flex items-center justify-between transition-colors duration-300">
            <Link href="/" className="flex items-center gap-1 group">
                <span className="text-2xl font-black italic tracking-tighter hover:opacity-80 transition-opacity">
                    <span className="gradient-text">AURA</span>
                </span>
                <span className="text-[10px] bg-primary text-white px-1.5 rounded-full font-bold ml-1 animate-pulse">PRO</span>
            </Link>

            <div className="flex items-center gap-5">
                <button
                    onClick={toggleDark}
                    className="p-1 hover:scale-110 active:scale-95 transition-all text-foreground"
                >
                    {dark ? <Sun size={24} strokeWidth={2} /> : <Moon size={24} strokeWidth={2} />}
                </button>
                <Link href="/create" className="p-1 hover:scale-110 active:scale-95 transition-all text-foreground hidden sm:block">
                    <PlusSquare size={24} strokeWidth={2} />
                </Link>
                <Link href="/notifications" className="p-1 hover:scale-110 active:scale-95 transition-all text-foreground relative">
                    <Heart size={24} strokeWidth={2} />
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
                </Link>
                <Link href="/messages" className="p-1 hover:scale-110 active:scale-95 transition-all text-foreground">
                    <MessageCircle size={24} strokeWidth={2} />
                </Link>
            </div>
        </header>
    );
}
