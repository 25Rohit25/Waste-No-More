'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { ArrowRight, User, Mail, Lock, Briefcase, Heart, Truck } from 'lucide-react';

function RegisterForm() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('DONOR');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const roleParam = searchParams.get('role');
        if (roleParam) {
            setRole(roleParam.toUpperCase());
        }
    }, [searchParams]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await api.post('/auth/register', { name, email, password, role });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data));

            if (role === 'DONOR') router.push('/dashboard/donor');
            else if (role === 'RECEIVER') router.push('/dashboard/receiver');
            else if (role === 'VOLUNTEER') router.push('/dashboard/volunteer');
            else router.push('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Right Side (on Desktop) - Image - Swapped for variety */}
            <div className="hidden lg:block relative bg-muted order-2">
                <img
                    src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop"
                    alt="Volunteers working"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent mix-blend-multiply" />
                <div className="absolute bottom-0 left-0 p-12 text-white">
                    <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
                    <p className="text-lg opacity-90">
                        Be part of a growing community dedicated to ending food waste and hunger. Every action counts.
                    </p>
                </div>
            </div>

            {/* Left Side - Form */}
            <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16 bg-background order-1">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md space-y-8"
                >
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight">Create an account</h2>
                        <p className="mt-2 text-muted-foreground">
                            Get started with Waste-No-More today
                        </p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-6">
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">I am a...</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setRole('DONOR')}
                                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${role === 'DONOR'
                                            ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary'
                                            : 'border-border hover:bg-secondary'
                                        }`}
                                >
                                    <Briefcase className="w-5 h-5 mb-1" />
                                    <span className="text-xs font-medium">Donor</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('RECEIVER')}
                                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${role === 'RECEIVER'
                                            ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary'
                                            : 'border-border hover:bg-secondary'
                                        }`}
                                >
                                    <Heart className="w-5 h-5 mb-1" />
                                    <span className="text-xs font-medium">Receiver</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('VOLUNTEER')}
                                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${role === 'VOLUNTEER'
                                            ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary'
                                            : 'border-border hover:bg-secondary'
                                        }`}
                                >
                                    <Truck className="w-5 h-5 mb-1" />
                                    <span className="text-xs font-medium">Volunteer</span>
                                </button>
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Creating account..." : "Create Account"}
                            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold text-primary hover:underline">
                            Sign in
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RegisterForm />
        </Suspense>
    );
}
