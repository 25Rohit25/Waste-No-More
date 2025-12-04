"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X, ShoppingBag } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { totalItems } = useCart();

    useEffect(() => {
        setMounted(true);
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        router.push("/login");
    };

    if (!mounted) return null;

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
                    ? "top-4 mx-4 md:mx-auto max-w-7xl rounded-full bg-background/70 backdrop-blur-xl border border-white/10 shadow-lg py-3 px-6"
                    : "bg-transparent py-6"
                    }`}
            >
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl group-hover:scale-110 transition-transform">
                            W
                        </div>
                        <span className="text-xl font-bold tracking-tight">Waste-No-More</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                            About
                        </Link>
                        <Link href="/donate" className="text-sm font-medium hover:text-primary transition-colors">
                            Donate
                        </Link>
                        <Link href="/community" className="text-sm font-medium hover:text-primary transition-colors">
                            Community
                        </Link>
                        <Link href="/leaderboard" className="text-sm font-medium hover:text-primary transition-colors">
                            Leaderboard
                        </Link>
                        <Link href="/impact" className="text-sm font-medium hover:text-primary transition-colors">
                            Impact
                        </Link>
                        <Link href="/marketplace" className="text-sm font-medium hover:text-primary transition-colors">
                            Rewards
                        </Link>

                        <div className="h-6 w-px bg-border" />

                        <Link href="/cart" className="relative group">
                            <div className="p-2 rounded-full hover:bg-secondary transition-colors">
                                <ShoppingBag className="w-5 h-5" />
                                {totalItems > 0 && (
                                    <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-full animate-in zoom-in">
                                        {totalItems}
                                    </span>
                                )}
                            </div>
                        </Link>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="rounded-full"
                        >
                            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                                    Dashboard
                                </Link>
                                <Button onClick={handleLogout} variant="outline" className="rounded-full">
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link href="/login">
                                    <Button variant="ghost" className="rounded-full">Log In</Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="rounded-full px-6">Get Started</Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center gap-4">
                        <Link href="/cart" className="relative">
                            <div className="p-2">
                                <ShoppingBag className="w-5 h-5" />
                                {totalItems > 0 && (
                                    <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-full">
                                        {totalItems}
                                    </span>
                                )}
                            </div>
                        </Link>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="rounded-full"
                        >
                            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-background pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-6 text-center">
                            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">
                                About
                            </Link>
                            <Link href="/donate" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">
                                Donate
                            </Link>
                            <Link href="/community" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">
                                Community Chat
                            </Link>
                            <Link href="/leaderboard" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">
                                Leaderboard
                            </Link>
                            <Link href="/impact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">
                                Impact
                            </Link>
                            <hr className="border-border" />
                            {user ? (
                                <>
                                    <span className="text-lg font-medium">Welcome, {user.name}</span>
                                    <Button onClick={handleLogout} size="lg" className="w-full">
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button variant="outline" size="lg" className="w-full">Log In</Button>
                                    </Link>
                                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button size="lg" className="w-full">Get Started</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
