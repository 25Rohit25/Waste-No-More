"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoModalProps {
    videoSrc?: string;
}

export function VideoModal({ videoSrc = "/videos/6893774-uhd_3840_2160_25fps.mp4" }: VideoModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto border-2 hover:bg-secondary/80 transition-all duration-300 hover:scale-105">
                    <PlayCircle className="mr-2 h-5 w-5" /> Watch Demo
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-black border-none">
                <div className="aspect-video w-full relative">
                    <video
                        controls
                        autoPlay
                        className="w-full h-full object-contain"
                        src={videoSrc}
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </DialogContent>
        </Dialog>
    );
}
