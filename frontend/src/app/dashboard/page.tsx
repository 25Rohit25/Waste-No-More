"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User, Settings, Activity, LogOut, Shield, Gift, Truck, Package } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [stats, setStats] = useState<any>(null);
    const [activity, setActivity] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Password Change State
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");

    // Profile Update State
    const [profileData, setProfileData] = useState({ name: "", email: "", phone: "", avatar: "" });
    const [profileMessage, setProfileMessage] = useState("");

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            router.push("/login");
            return;
        }
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setProfileData({
            name: parsedUser.name || "",
            email: parsedUser.email || "",
            phone: parsedUser.phone || "",
            avatar: parsedUser.avatar || parsedUser.name || ""
        });
        fetchDashboardData(parsedUser.token);
    }, []);

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/users/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify(profileData)
            });

            const data = await response.json();
            if (response.ok) {
                setProfileMessage("Profile updated successfully!");
                // Update local storage and state
                const updatedUser = { ...user, ...data };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setUser(updatedUser);
            } else {
                setProfileMessage(data.message || "Error updating profile");
            }
        } catch (error) {
            setProfileMessage("Error updating profile");
        }
    };

    const fetchDashboardData = async (token: string) => {
        try {
            const [statsRes, activityRes] = await Promise.all([
                fetch("http://localhost:5000/api/users/stats", { headers: { Authorization: `Bearer ${token}` } }),
                fetch("http://localhost:5000/api/users/activity", { headers: { Authorization: `Bearer ${token}` } })
            ]);

            if (statsRes.ok) setStats(await statsRes.json());
            if (activityRes.ok) setActivity(await activityRes.json());
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setPasswordMessage("New passwords do not match.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/users/password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({ currentPassword, newPassword })
            });

            const data = await response.json();
            setPasswordMessage(data.message);
            if (response.ok) {
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            }
        } catch (error) {
            setPasswordMessage("Error updating password.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/login");
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-4 md:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto max-w-6xl"
            >
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar / Profile Card */}
                    <div className="w-full md:w-1/3 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="overflow-hidden border-none shadow-xl glass-card">
                                <div className="h-32 bg-gradient-to-r from-primary to-purple-600 relative">
                                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                                        <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.avatar || user?.name}`} />
                                            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                </div>
                                <CardContent className="pt-16 pb-8 text-center">
                                    <h2 className="text-2xl font-bold">{user?.name}</h2>
                                    <p className="text-muted-foreground mb-4">{user?.email}</p>
                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                        {user?.role === 'DONOR' && <Gift className="w-4 h-4 mr-2" />}
                                        {user?.role === 'VOLUNTEER' && <Truck className="w-4 h-4 mr-2" />}
                                        {user?.role === 'RECEIVER' && <Package className="w-4 h-4 mr-2" />}
                                        {user?.role}
                                    </div>
                                </CardContent>
                                <Separator />
                                <CardFooter className="flex flex-col p-4 gap-2">
                                    <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" onClick={handleLogout}>
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Log Out
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>

                        {/* Quick Stats */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card className="border-none shadow-lg glass-card hover:scale-[1.02] transition-transform duration-300">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-primary" />
                                        Impact Overview
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {user?.role === 'DONOR' && (
                                        <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                                            <span className="text-muted-foreground">Total Donations</span>
                                            <span className="font-bold text-xl">{stats?.totalDonations || 0}</span>
                                        </div>
                                    )}
                                    {user?.role === 'VOLUNTEER' && (
                                        <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                                            <span className="text-muted-foreground">Tasks Completed</span>
                                            <span className="font-bold text-xl">{stats?.tasksCompleted || 0}</span>
                                        </div>
                                    )}
                                    {user?.role === 'RECEIVER' && (
                                        <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                                            <span className="text-muted-foreground">Items Received</span>
                                            <span className="font-bold text-xl">{stats?.itemsReceived || 0}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                                        <span className="text-muted-foreground">Community Score</span>
                                        <span className="font-bold text-xl text-green-500">98</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Activity Summary Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Card className="border-none shadow-lg glass-card hover:scale-[1.02] transition-transform duration-300">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-primary" />
                                        Activity Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                                        <span className="text-muted-foreground">Recent Actions</span>
                                        <span className="font-bold text-xl">{activity.length}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                                        <span className="text-muted-foreground">Pending</span>
                                        <span className="font-bold text-xl text-yellow-600">
                                            {activity.filter(a => a.status === 'PENDING').length}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                                        <span className="text-muted-foreground">Completed</span>
                                        <span className="font-bold text-xl text-green-600">
                                            {activity.filter(a => a.status === 'COMPLETED').length}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Main Content Area */}
                    <div className="w-full md:w-2/3">
                        <Tabs defaultValue="activity" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 mb-8 bg-background/50 backdrop-blur p-1 rounded-xl">
                                <TabsTrigger value="activity" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Activity</TabsTrigger>
                                <TabsTrigger value="settings" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Settings</TabsTrigger>
                                <TabsTrigger value="coupons" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Coupons</TabsTrigger>
                            </TabsList>

                            {/* Activity Tab */}
                            <TabsContent value="activity">
                                <Card className="border-none shadow-lg glass-card">
                                    <CardHeader>
                                        <CardTitle>Recent Activity</CardTitle>
                                        <CardDescription>Your latest contributions and actions.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {activity.length === 0 ? (
                                            <div className="text-center py-8 text-muted-foreground">
                                                No recent activity found.
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {activity.map((item: any, index: number) => (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        key={item._id}
                                                        className="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-border/50 hover:bg-background/80 transition-colors"
                                                    >
                                                        <div>
                                                            <p className="font-medium">{item.foodItem || item.description || "Activity Item"}</p>
                                                            <p className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</p>
                                                        </div>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                                                            item.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                                                'bg-blue-100 text-blue-700'
                                                            }`}>
                                                            {item.status || 'Active'}
                                                        </span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Settings Tab */}
                            <TabsContent value="settings" className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card className="border-none shadow-lg glass-card">
                                        <CardHeader>
                                            <CardTitle>Profile Settings</CardTitle>
                                            <CardDescription>Update your personal information.</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <form onSubmit={handleProfileUpdate} className="space-y-4">
                                                <div className="flex flex-col items-center space-y-4 mb-6">
                                                    <Label>Profile Avatar</Label>
                                                    <Avatar className="w-24 h-24 border-2 border-border">
                                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.avatar}`} />
                                                        <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            onClick={() => setProfileData({ ...profileData, avatar: Math.random().toString(36).substring(7) })}
                                                        >
                                                            Randomize Avatar
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="name">Full Name</Label>
                                                        <Input
                                                            id="name"
                                                            value={profileData.name}
                                                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="email">Email Address</Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            value={profileData.email}
                                                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="phone">Phone Number</Label>
                                                        <Input
                                                            id="phone"
                                                            value={profileData.phone}
                                                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                            placeholder="+1 234 567 890"
                                                        />
                                                    </div>
                                                </div>
                                                {profileMessage && (
                                                    <p className={`text-sm ${profileMessage.includes("success") ? "text-green-500" : "text-red-500"}`}>
                                                        {profileMessage}
                                                    </p>
                                                )}
                                                <Button type="submit">
                                                    Save Changes
                                                </Button>
                                            </form>
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                    <Card className="border-none shadow-lg glass-card">
                                        <CardHeader>
                                            <CardTitle>Security Settings</CardTitle>
                                            <CardDescription>Manage your password and account security.</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <form onSubmit={handlePasswordChange} className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="current">Current Password</Label>
                                                    <Input
                                                        id="current"
                                                        type="password"
                                                        value={currentPassword}
                                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="new">New Password</Label>
                                                    <Input
                                                        id="new"
                                                        type="password"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="confirm">Confirm New Password</Label>
                                                    <Input
                                                        id="confirm"
                                                        type="password"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                {passwordMessage && (
                                                    <p className={`text-sm ${passwordMessage.includes("success") ? "text-green-500" : "text-red-500"}`}>
                                                        {passwordMessage}
                                                    </p>
                                                )}
                                                <Button type="submit" className="w-full">
                                                    <Shield className="w-4 h-4 mr-2" />
                                                    Update Password
                                                </Button>
                                            </form>
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                {/* Preferences Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                >
                                    <Card className="border-none shadow-lg glass-card">
                                        <CardHeader>
                                            <CardTitle>Preferences</CardTitle>
                                            <CardDescription>Manage your app preferences.</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label className="text-base">Email Notifications</Label>
                                                    <p className="text-sm text-muted-foreground">Receive emails about your account activity.</p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <input type="checkbox" className="toggle" defaultChecked />
                                                </div>
                                            </div>
                                            <Separator />
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label className="text-base">Dark Mode</Label>
                                                    <p className="text-sm text-muted-foreground">Toggle dark mode theme.</p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    {/* This is just a visual toggle for now, theme is handled globally */}
                                                    <input type="checkbox" className="toggle" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </TabsContent>

                            {/* Coupons Tab */}
                            <TabsContent value="coupons">
                                <Card className="border-none shadow-lg glass-card">
                                    <CardHeader>
                                        <CardTitle>My Rewards</CardTitle>
                                        <CardDescription>Earn coupons by contributing to the community.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Dummy Coupons */}
                                            {[1, 2].map((i) => (
                                                <motion.div
                                                    key={i}
                                                    whileHover={{ scale: 1.05 }}
                                                    className="border border-dashed border-primary/50 bg-primary/5 rounded-xl p-4 flex flex-col items-center text-center space-y-2 relative overflow-hidden cursor-pointer"
                                                >
                                                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-bl-lg">
                                                        Active
                                                    </div>
                                                    <Gift className="w-8 h-8 text-primary mb-2" />
                                                    <h3 className="font-bold text-lg">20% OFF</h3>
                                                    <p className="text-sm text-muted-foreground">On your next eco-friendly purchase</p>
                                                    <div className="w-full bg-white dark:bg-black/20 p-2 rounded text-xs font-mono mt-2 select-all cursor-pointer">
                                                        GOODGIVER20
                                                    </div>
                                                </motion.div>
                                            ))}
                                            <div className="border border-dashed border-muted bg-muted/20 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2 opacity-70">
                                                <Shield className="w-8 h-8 text-muted-foreground mb-2" />
                                                <h3 className="font-bold text-lg">Locked</h3>
                                                <p className="text-sm text-muted-foreground">Reach 100 Community Score to unlock</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
