"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChefHat, Sparkles, Loader2, Clock, Leaf, Save, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RecipeGenerator() {
    const [ingredients, setIngredients] = useState('');
    const [recipe, setRecipe] = useState<{ title: string; steps: string[]; impact: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!ingredients.trim()) return;

        setLoading(true);
        setRecipe(null);

        // Simulate AI processing time
        setTimeout(() => {
            const lowerInput = ingredients.toLowerCase();
            let selectedRecipe = null;

            // Smart Mock Database
            const recipes: Record<string, { title: string; steps: string[]; impact: string }> = {
                bread: {
                    title: "Rustic Bread & Herb Strata",
                    steps: [
                        "Cube the stale bread into 1-inch pieces.",
                        "Whisk 4 eggs with 1 cup of milk and your choice of herbs.",
                        "Toss bread in the mixture and let soak for 15 mins.",
                        "Bake at 350°F (175°C) for 30 mins until golden and puffy."
                    ],
                    impact: "Rescued approx. 300g of bread!"
                },
                banana: {
                    title: "Zero-Waste Banana Oat Cookies",
                    steps: [
                        "Mash the overripe bananas in a bowl.",
                        "Mix in 1 cup of oats and a handful of chocolate chips or raisins.",
                        "Form into small cookies on a baking sheet.",
                        "Bake at 350°F (175°C) for 12-15 minutes."
                    ],
                    impact: "Saved 2 bananas from the bin!"
                },
                rice: {
                    title: "Crispy Rice Fritters",
                    steps: [
                        "Mix leftover rice with an egg, flour, and chopped onions.",
                        "Form into small patties.",
                        "Pan-fry in hot oil until crispy on both sides.",
                        "Serve with a spicy dipping sauce."
                    ],
                    impact: "Repurposed 2 cups of rice!"
                },
                potato: {
                    title: "Loaded Potato Skins",
                    steps: [
                        "Scoop out the insides of baked potatoes (use for mash!).",
                        "Brush skins with oil and bake until crisp.",
                        "Top with cheese, green onions, and any other leftovers.",
                        "Broil until cheese is bubbly."
                    ],
                    impact: "Utilized 100% of the potato!"
                },
                milk: {
                    title: "Creamy Homemade Ricotta",
                    steps: [
                        "Heat milk with a pinch of salt until steaming.",
                        "Stir in lemon juice or vinegar until curds form.",
                        "Strain through a cheesecloth for 1 hour.",
                        "Use the fresh cheese on toast or pasta."
                    ],
                    impact: "Saved 1 liter of milk!"
                },
                vegetable: {
                    title: "Everything-Veggie Stock",
                    steps: [
                        "Collect all vegetable scraps and wilting veggies.",
                        "Cover with water in a large pot and simmer for 1 hour.",
                        "Strain the liquid to create a rich, flavorful broth.",
                        "Compost the solids."
                    ],
                    impact: "Zero waste achieved!"
                },
            };

            // Find matching recipe
            for (const [key, data] of Object.entries(recipes)) {
                if (lowerInput.includes(key) || lowerInput.includes(key + "s")) {
                    selectedRecipe = data;
                    break;
                }
            }

            // Fallback for unknown ingredients
            if (!selectedRecipe) {
                selectedRecipe = {
                    title: `Creative ${ingredients.split(' ')[0]} Stir-Fry`,
                    steps: [
                        `Chop the ${ingredients} into uniform pieces.`,
                        "Sauté garlic and onions in a hot pan.",
                        "Add your ingredients and stir-fry on high heat.",
                        "Season with soy sauce, ginger, and sesame oil."
                    ],
                    impact: "Prevented food waste creatively!"
                };
            }

            setRecipe(selectedRecipe);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl p-8 md:p-12">
                {/* Decorative background elements */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl opacity-50 pointer-events-none" />

                <div className="relative z-10 text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-green-600 text-white shadow-lg mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                        <ChefHat className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mb-3">
                        AI Waste-Less Chef
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                        Turn your leftovers into gourmet meals. Enter your ingredients below and let our AI work its magic.
                    </p>
                </div>

                <form onSubmit={handleGenerate} className="relative z-10 flex flex-col sm:flex-row gap-3 mb-10 max-w-xl mx-auto">
                    <div className="relative flex-1">
                        <Input
                            placeholder="e.g., stale bread, tomatoes, spinach"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            className="h-12 pl-4 pr-4 rounded-xl border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-black/20 focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={loading || !ingredients}
                        className="h-12 px-8 rounded-xl bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 text-white shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 mr-2" />}
                        Generate
                    </Button>
                </form>

                <AnimatePresence>
                    {recipe && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.4, type: "spring" }}
                            className="relative z-10 bg-white dark:bg-gray-900/80 rounded-2xl border border-border shadow-xl overflow-hidden"
                        >
                            <div className="h-2 bg-gradient-to-r from-primary via-green-400 to-blue-500" />
                            <div className="p-6 md:p-8">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                                    <div>
                                        <div className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
                                            <Sparkles className="w-4 h-4" />
                                            <span>AI Suggested Recipe</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {recipe.title}
                                        </h3>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" title="Save Recipe">
                                            <Save className="w-4 h-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" title="Share">
                                            <Share2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid gap-8 md:grid-cols-[1fr,auto]">
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-muted-foreground" />
                                                Instructions
                                            </h4>
                                            <ol className="space-y-3">
                                                {recipe.steps.map((step, index) => (
                                                    <li key={index} className="flex gap-3 text-muted-foreground">
                                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mt-0.5">
                                                            {index + 1}
                                                        </span>
                                                        <span className="leading-relaxed">{step}</span>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    </div>

                                    <div className="md:w-64">
                                        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5 border border-green-100 dark:border-green-900/50">
                                            <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold mb-2">
                                                <Leaf className="w-5 h-5" />
                                                Eco Impact
                                            </div>
                                            <p className="text-sm text-green-800 dark:text-green-300 leading-relaxed">
                                                {recipe.impact}
                                            </p>
                                            <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800/50 flex items-center justify-between text-xs text-green-600 dark:text-green-400">
                                                <span>Waste Saved</span>
                                                <span className="font-bold">High</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
