'use client';

import { useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: username });

            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                username: username.toLowerCase(),
                displayName: fullname || username,
                email: email,
                photoURL: `https://ui-avatars.com/api/?name=${username}&background=random`,
                bio: '',
                followers: [],
                following: [],
                createdAt: new Date().toISOString(),
            });

            toast.success('Welcome to Aura!');
            router.push('/');
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 p-4">
            <div className="w-full max-w-sm space-y-4">
                {/* Main Signup Box */}
                <div className="bg-white dark:bg-black border border-border rounded-xl p-8 space-y-6 shadow-2xl shadow-primary/5">
                    <div className="flex flex-col items-center">
                        <h1 className="text-5xl font-black italic tracking-tighter gradient-text mb-4">AURA</h1>
                        <p className="text-foreground/40 text-[13px] font-bold text-center leading-tight">
                            Sign up to see photos and videos from your friends.
                        </p>
                    </div>

                    <button
                        className="w-full py-2.5 bg-primary text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all text-sm shadow-md"
                    >
                        <span className="text-lg">G</span> Log in with Google
                    </button>

                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-border"></div>
                        <span className="flex-shrink mx-4 text-[10px] font-black text-foreground/20 uppercase tracking-widest">OR</span>
                        <div className="flex-grow border-t border-border"></div>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-2">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg bg-foreground/5 dark:bg-zinc-900 border border-border focus:ring-1 focus:ring-primary outline-none transition-all text-xs"
                            placeholder="Mobile Number or Email"
                            required
                        />
                        <input
                            type="text"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg bg-foreground/5 dark:bg-zinc-900 border border-border focus:ring-1 focus:ring-primary outline-none transition-all text-xs"
                            placeholder="Full Name"
                        />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg bg-foreground/5 dark:bg-zinc-900 border border-border focus:ring-1 focus:ring-primary outline-none transition-all text-xs"
                            placeholder="Username"
                            required
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg bg-foreground/5 dark:bg-zinc-900 border border-border focus:ring-1 focus:ring-primary outline-none transition-all text-xs"
                            placeholder="Password"
                            required
                        />

                        <div className="py-4 text-center">
                            <p className="text-[10px] text-foreground/40 font-medium">
                                People who use our service may have uploaded your contact information to Aura. <span className="text-primary cursor-pointer">Learn More</span>
                            </p>
                            <p className="text-[10px] text-foreground/40 font-medium mt-3">
                                By signing up, you agree to our <span className="text-primary cursor-pointer font-bold">Terms</span>, <span className="text-primary cursor-pointer font-bold">Privacy Policy</span> and <span className="text-primary cursor-pointer font-bold">Cookies Policy</span>.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50 mt-1 shadow-lg shadow-primary/20"
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>
                </div>

                {/* Login Link Box */}
                <div className="bg-white dark:bg-black border border-border rounded-xl p-6 text-center shadow-md">
                    <p className="text-sm text-foreground/60">
                        Have an account?{' '}
                        <Link href="/login" className="text-primary font-bold hover:underline">Log in</Link>
                    </p>
                </div>

                {/* App stores */}
                <div className="text-center space-y-4 pt-2">
                    <p className="text-sm font-medium">Get the app.</p>
                    <div className="flex justify-center gap-2 h-10">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-full cursor-pointer hover:opacity-80 transition-opacity" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-full cursor-pointer hover:opacity-80 transition-opacity" />
                    </div>
                </div>
            </div>
        </div>
    );
}
