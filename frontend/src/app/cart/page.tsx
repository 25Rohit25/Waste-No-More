"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ArrowRight, ShoppingBag, CheckCircle2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CartPage() {
    const { items, removeItem, updateQuantity, clearCart, totalItems } = useCart();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);

    const handleCheckout = () => {
        setIsCheckoutOpen(false);
        setIsSuccessOpen(true);
        clearCart();
    };

    if (items.length === 0 && !isSuccessOpen) {
        return (
            <div className="min-h-screen bg-background pt-32 pb-12 px-4 flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center mb-6"
                >
                    <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                </motion.div>
                <h1 className="text-3xl font-bold mb-4">Your basket is empty</h1>
                <p className="text-muted-foreground mb-8 max-w-md">
                    Looks like you haven't added any items to your donation basket yet.
                </p>
                <Link href="/donate">
                    <Button size="lg" className="rounded-full px-8">
                        Start Donating
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-4 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto max-w-4xl relative z-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-3">
                    Donation Basket <span className="text-lg font-normal text-muted-foreground">({totalItems} items)</span>
                </h1>

                <div className="grid gap-8 md:grid-cols-[1fr,350px]">
                    {/* Cart Items List */}
                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="glass-card p-4 rounded-2xl flex gap-4 items-center"
                                >
                                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-secondary">
                                        {item.image && (
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        )}
                                    </div>

                                    <div className="flex-grow">
                                        <h3 className="font-bold text-lg">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground">{item.category}</p>
                                    </div>

                                    <div className="flex items-center gap-3 bg-secondary/30 rounded-full px-3 py-1">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-6 h-6 flex items-center justify-center hover:text-primary transition-colors"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="font-bold w-4 text-center text-sm">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-6 h-6 flex items-center justify-center hover:text-primary transition-colors"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeItem(item.id)}
                                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </Button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Summary Card */}
                    <div className="h-fit">
                        <div className="glass-card p-6 rounded-3xl sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Total Items</span>
                                    <span className="font-bold">{totalItems}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Estimated Impact</span>
                                    <span className="font-bold text-green-500">High</span>
                                </div>
                            </div>

                            <div className="border-t border-border/50 my-6" />

                            <Button
                                size="lg"
                                className="w-full rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                                onClick={() => setIsCheckoutOpen(true)}
                            >
                                Confirm Donation <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>

                            <p className="text-xs text-center text-muted-foreground mt-4">
                                Thank you for making a difference!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Checkout Dialog */}
            <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Confirm Donation</DialogTitle>
                        <DialogDescription>
                            Please provide details for the pickup/drop-off.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="address">Pickup Address</Label>
                            <Input id="address" placeholder="123 Main St, Apt 4B" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="notes">Notes for Volunteer</Label>
                            <Input id="notes" placeholder="Gate code, preferred time, etc." />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleCheckout} className="w-full">Submit Donation</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Success Dialog */}
            <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
                <DialogContent className="sm:max-w-[425px] text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center animate-bounce">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl">Thank You!</DialogTitle>
                        <DialogDescription className="text-center">
                            Your donation has been successfully recorded. A volunteer will be in touch shortly.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-center">
                        <Link href="/dashboard">
                            <Button onClick={() => setIsSuccessOpen(false)} className="w-full sm:w-auto">Go to Dashboard</Button>
                        </Link>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
