"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Plus, Minus, Filter, Heart, PackagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart, DonationItem } from "@/context/CartContext";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const CATEGORIES = ["All", "Food", "Clothes", "Essentials", "Other"];

const ITEMS: DonationItem[] = [
    { id: "1", name: "Canned Beans", category: "Food", quantity: 1, unit: "can", image: "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&q=80&w=300" },
    { id: "2", name: "Rice Bag (5kg)", category: "Food", quantity: 1, unit: "bag", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=300" },
    { id: "3", name: "Pasta", category: "Food", quantity: 1, unit: "box", image: "https://images.unsplash.com/photo-1551462147-37885acc36f1?auto=format&fit=crop&q=80&w=300" },
    { id: "4", name: "Fresh Fruit Box", category: "Food", quantity: 1, unit: "box", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=300" },
    { id: "5", name: "Men's T-Shirt", category: "Clothes", quantity: 1, unit: "piece", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=300" },
    { id: "6", name: "Winter Jacket", category: "Clothes", quantity: 1, unit: "piece", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=300" },
    { id: "8", name: "Hygiene Kit", category: "Essentials", quantity: 1, unit: "kit", image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&q=80&w=300" },
    { id: "10", name: "First Aid Kit", category: "Essentials", quantity: 1, unit: "kit", image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=300" },
    { id: "11", name: "School Backpack", category: "Other", quantity: 1, unit: "piece", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=300" },
    { id: "12", name: "Story Books", category: "Other", quantity: 1, unit: "set", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=300" },
    { id: "13", name: "Toys Set", category: "Other", quantity: 1, unit: "set", image: "https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&q=80&w=300" },
];

export default function DonatePage() {
    const { addItem } = useCart();
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    // Custom Item State
    const [isCustomDialogOpen, setIsCustomDialogOpen] = useState(false);
    const [customItem, setCustomItem] = useState({ name: "", unit: "piece", quantity: 1 });

    const filteredItems = ITEMS.filter((item) => {
        const matchesCategory = activeCategory === "All" || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleQuantityChange = (id: string, delta: number) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(1, (prev[id] || 1) + delta),
        }));
    };

    const handleAddToCart = (item: DonationItem) => {
        const quantity = quantities[item.id] || 1;
        addItem({ ...item, quantity });
        toast.success(`Added ${quantity} ${item.name} to donation basket`);
        setQuantities((prev) => ({ ...prev, [item.id]: 1 }));
    };

    const handleAddCustomItem = () => {
        if (!customItem.name) {
            toast.error("Please enter an item name");
            return;
        }

        const newItem: DonationItem = {
            id: `custom-${Date.now()}`,
            name: customItem.name,
            category: "Other",
            quantity: customItem.quantity,
            unit: customItem.unit,
            image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&q=80&w=300" // Generic gift image
        };

        addItem(newItem);
        toast.success(`Added ${customItem.quantity} ${customItem.name} to donation basket`);
        setIsCustomDialogOpen(false);
        setCustomItem({ name: "", unit: "piece", quantity: 1 });
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-4 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
                    >
                        Make a Donation
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                    >
                        Select items you wish to donate. Your contributions directly help those in need.
                    </motion.p>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 glass-card p-4 rounded-2xl">
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                        {CATEGORIES.map((cat) => (
                            <Button
                                key={cat}
                                variant={activeCategory === cat ? "default" : "ghost"}
                                onClick={() => setActiveCategory(cat)}
                                className="rounded-full"
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                            placeholder="Search items..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 rounded-full bg-background/50 border-primary/20 focus:border-primary"
                        />
                    </div>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group glass-card rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col"
                        >
                            <div className="relative aspect-square overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-3 right-3">
                                    <Badge className="bg-background/80 backdrop-blur-md text-foreground hover:bg-background/90">
                                        {item.category}
                                    </Badge>
                                </div>
                            </div>

                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                                <p className="text-sm text-muted-foreground mb-4">Unit: {item.unit}</p>

                                <div className="mt-auto flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3 bg-secondary/50 rounded-full px-3 py-1">
                                        <button
                                            onClick={() => handleQuantityChange(item.id, -1)}
                                            className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="font-bold w-4 text-center">{quantities[item.id] || 1}</span>
                                        <button
                                            onClick={() => handleQuantityChange(item.id, 1)}
                                            className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>

                                    <Button
                                        size="icon"
                                        onClick={() => handleAddToCart(item)}
                                        className="rounded-full w-10 h-10 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Custom Item Card */}
                    {(activeCategory === "All" || activeCategory === "Other") && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group glass-card rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col border-2 border-dashed border-primary/20 hover:border-primary/50 cursor-pointer"
                            onClick={() => setIsCustomDialogOpen(true)}
                        >
                            <div className="flex-grow flex flex-col items-center justify-center p-8 text-center space-y-4">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                                    <PackagePlus className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Donate Something Else</h3>
                                    <p className="text-sm text-muted-foreground">Can't find what you're looking for? Add a custom item.</p>
                                </div>
                            </div>
                            <div className="p-5 pt-0">
                                <Button className="w-full rounded-xl" variant="secondary">
                                    Add Custom Item
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Custom Item Dialog */}
            <Dialog open={isCustomDialogOpen} onOpenChange={setIsCustomDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Custom Donation</DialogTitle>
                        <DialogDescription>
                            Enter the details of the item you wish to donate.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Item Name</Label>
                            <Input
                                id="name"
                                placeholder="e.g., Winter Gloves"
                                value={customItem.name}
                                onChange={(e) => setCustomItem({ ...customItem, name: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="quantity">Quantity</Label>
                                <div className="flex items-center gap-3 border rounded-md px-3 py-2">
                                    <button
                                        onClick={() => setCustomItem(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                                        className="hover:text-primary"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="flex-grow text-center font-bold">{customItem.quantity}</span>
                                    <button
                                        onClick={() => setCustomItem(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
                                        className="hover:text-primary"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="unit">Unit</Label>
                                <Input
                                    id="unit"
                                    placeholder="e.g., box, pair"
                                    value={customItem.unit}
                                    onChange={(e) => setCustomItem({ ...customItem, unit: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleAddCustomItem} className="w-full">Add to Basket</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
