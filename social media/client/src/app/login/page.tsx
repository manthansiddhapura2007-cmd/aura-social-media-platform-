'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Smartphone, Lock, User, Instagram } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Welcome back to Aura!');
            router.push('/');
        } catch (error: any) {
            toast.error("Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            toast.success('Logged in with Google!');
            router.push('/');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 p-4">
            <div className="w-full max-w-sm space-y-4">
                {/* Main Login Box */}
                <div className="bg-white dark:bg-black border border-border rounded-xl p-8 space-y-8 shadow-2xl shadow-primary/5">
                    <div className="flex flex-col items-center">
                        <h1 className="text-5xl font-black italic tracking-tighter gradient-text mb-4">AURA</h1>
                        <p className="text-foreground/40 text-sm font-medium text-center">
                            Sign in to see photos and videos from your friends.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-3">
                        <div className="relative group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-foreground/5 dark:bg-zinc-900 border border-border focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                                placeholder="Phone number, username, or email"
                                required
                            />
                        </div>
                        <div className="relative group">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-foreground/5 dark:bg-zinc-900 border border-border focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                                placeholder="Password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50 mt-4 shadow-lg shadow-primary/20"
                        >
                            {loading ? 'Logging in...' : 'Log In'}
                        </button>

                        <div className="relative flex items-center py-4">
                            <div className="flex-grow border-t border-border"></div>
                            <span className="flex-shrink mx-4 text-[10px] font-bold text-foreground/20 uppercase tracking-widest">OR</span>
                            <div className="flex-grow border-t border-border"></div>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-bold hover:opacity-80 transition-opacity"
                        >
                            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 grayscale group-hover:grayscale-0" />
                            Log in with Google
                        </button>

                        <div className="text-center pt-2">
                            <Link href="/forgot" className="text-xs text-foreground/40 hover:text-primary transition-colors">
                                Forgot password?
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Sign Up Box */}
                <div className="bg-white dark:bg-black border border-border rounded-xl p-6 text-center shadow-md">
                    <p className="text-sm text-foreground/60">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-primary font-bold hover:underline">Sign up</Link>
                    </p>
                </div>

                {/* Get the app section */}
                <div className="text-center space-y-4">
                    <p className="text-sm">Get the app.</p>
                    <div className="flex justify-center gap-2 h-10">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-full cursor-pointer hover:opacity-80 transition-opacity" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-full cursor-pointer hover:opacity-80 transition-opacity" />
                    </div>
                </div>
            </div>
        </div>
    );
}
