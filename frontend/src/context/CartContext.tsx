"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type DonationItem = {
    id: string;
    name: string;
    category: "Food" | "Clothes" | "Essentials" | "Other";
    quantity: number;
    unit: string;
    image?: string;
};

interface CartContextType {
    items: DonationItem[];
    addItem: (item: DonationItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<DonationItem[]>([]);

    // Load from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("donationCart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart from local storage");
            }
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem("donationCart", JSON.stringify(items));
    }, [items]);

    const addItem = (newItem: DonationItem) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === newItem.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === newItem.id ? { ...i, quantity: i.quantity + newItem.quantity } : i
                );
            }
            return [...prev, newItem];
        });
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        setItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i))
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
