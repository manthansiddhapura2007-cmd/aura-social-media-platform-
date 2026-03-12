'use client';

import { Search, TrendingUp, Compass, Play } from 'lucide-react';
import Image from 'next/image';

const MOCK_EXPLORE_POSTS = [
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    'https://images.unsplash.com/photo-1500673922987-e212871fec22',
    'https://images.unsplash.com/photo-1505118380757-91f5f5832de0',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1',
    'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
    'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f'
].map(url => `${url}?w=400&h=400&fit=crop`);

const TRENDING_HASHTAGS = [
    { tag: 'AuraNextGen', posts: '1.2M' },
    { tag: 'CreativeVibes', posts: '850K' },
    { tag: 'TechFuture', posts: '420K' },
    { tag: 'TravelDairies', posts: '310K' },
];

export default function ExplorePage() {
    return (
        <div className="flex flex-col min-h-full pb-10">
            <div className="sticky top-0 z-20 glass border-b border-border p-4">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search communities, people, topics..."
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-foreground/5 border border-border outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                    />
                </div>
            </div>

            {/* Trending Hashtags */}
            <div className="p-4 bg-background">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="text-primary" size={20} />
                    <h2 className="font-bold">Trending Now</h2>
                </div>
                <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                    {TRENDING_HASHTAGS.map((h) => (
                        <div key={h.tag} className="flex flex-col gap-1 min-w-[120px] p-3 rounded-2xl bg-foreground/5 border border-border hover:border-primary/50 transition-colors cursor-pointer">
                            <span className="text-sm font-bold text-primary">#{h.tag}</span>
                            <span className="text-[10px] text-foreground/40">{h.posts} posts</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-4 flex items-center gap-2">
                <Compass className="text-primary" size={20} />
                <h2 className="font-bold">Explore Content</h2>
            </div>

            {/* Explore Grid */}
            <div className="grid grid-cols-3 gap-[1px] md:gap-2 px-1 md:px-4">
                {MOCK_EXPLORE_POSTS.map((url, i) => (
                    <div key={i} className={`relative group cursor-pointer overflow-hidden rounded-sm md:rounded-lg ${i === 1 || i === 7 ? 'col-span-1 row-span-2 aspect-[1/2]' : 'aspect-square'}`}>
                        <Image
                            src={url}
                            alt={`Explore ${i}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {i % 4 === 0 && (
                            <div className="absolute top-2 right-2 text-white shadow-lg">
                                <Play size={16} fill="white" />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
