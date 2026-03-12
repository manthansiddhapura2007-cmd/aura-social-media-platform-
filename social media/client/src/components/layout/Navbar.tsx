'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, PlusSquare, Play, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Search, label: 'Search', href: '/search' },
    { icon: PlusSquare, label: 'Post', href: '/create' },
    { icon: Play, label: 'Reels', href: '/reels' },
    { icon: User, label: 'Profile', href: '/profile' },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border flex items-center justify-around px-2 py-3 md:py-4 transition-colors duration-300">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex flex-col items-center p-2 transition-all duration-200 active:scale-75",
                            isActive ? "text-foreground" : "text-foreground/40 hover:text-foreground"
                        )}
                    >
                        <Icon
                            size={26}
                            strokeWidth={isActive ? 2.5 : 2}
                            fill={isActive && item.label !== 'Search' && item.label !== 'Post' ? 'currentColor' : 'none'}
                        />
                    </Link>
                );
            })}
        </nav>
    );
}
