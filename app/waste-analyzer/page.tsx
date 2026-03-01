"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Camera, Loader2, ScanLine, Sparkles, CheckCircle, XCircle } from "lucide-react";
import { useState, useRef, useEffect, useTransition } from "react";
import { getWasteAnalysis } from "./actions";
import type { WasteAnalyzerOutput } from "@/ai/flows/waste-analyzer-types";
import { Badge } from "@/components/ui/badge";
import { useSettings } from "@/lib/settings";

export default function WasteAnalyzerPage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [isPending, startTransition] = useTransition();
    const [aiResult, setAiResult] = useState<WasteAnalyzerOutput | null>(null);
    const { toast } = useToast();
    const { language, t } = useSettings();

    useEffect(() => {
        const getCameraPermission = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setHasCameraPermission(false);
            toast({
                variant: 'destructive',
                title: 'Camera Not Supported',
                description: 'Your browser does not support camera access.',
            });
            return;
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
            setHasCameraPermission(true);

            if (videoRef.current) {
            videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
            setHasCameraPermission(false);
            toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings to use this feature.',
            });
        }
        };

        getCameraPermission();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        }
    }, [toast]);

    const handleScan = () => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;

        // Set canvas dimensions to match video
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;
        canvas.width = videoWidth;
        canvas.height = videoHeight;

        const context = canvas.getContext('2d');
        if (!context) return;
        
        // Draw the current video frame onto the canvas
        context.drawImage(video, 0, 0, videoWidth, videoHeight);

        // Get the image data from the canvas
        const photoDataUri = canvas.toDataURL('image/jpeg');

        setAiResult(null);
        startTransition(async () => {
            const result = await getWasteAnalysis({ photoDataUri, language });
            if (result.success && result.aiOutput) {
                toast({
                title: "Analysis Complete!",
                description: "The AI has analyzed the waste item.",
                });
                setAiResult(result.aiOutput);
            } else {
                toast({
                variant: "destructive",
                title: "Analysis Failed",
                description: result.error || "An unknown error occurred.",
                });
            }
        });
    }

    return (
        <AppLayout title={t('ai_waste_analyzer')}>
        <div className="mx-auto max-w-3xl space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Scan Waste with AI</CardTitle>
                    <CardDescription>
                    Point your camera at a waste item to learn if it's biodegradable and how to dispose of it correctly.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-secondary">
                        <video ref={videoRef} className="h-full w-full object-cover" autoPlay playsInline muted />
                        <canvas ref={canvasRef} className="hidden" />
                        {hasCameraPermission === false && (
                             <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 p-4">
                                <Camera className="h-12 w-12 text-muted-foreground" />
                                <p className="mt-4 text-center font-semibold">Camera Access Required</p>
                                <p className="text-center text-sm text-muted-foreground">Please allow camera access in your browser to use this feature.</p>
                            </div>
                        )}
                         {hasCameraPermission === null && (
                            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        )}
                    </div>
                     <Button onClick={handleScan} disabled={isPending || hasCameraPermission !== true} className="w-full">
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <ScanLine className="mr-2 h-4 w-4" />
                                Scan Waste
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>

            {isPending && (
                <Card>
                <CardContent className="pt-6 text-center">
                    <div className="flex justify-center items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <p>The AI is analyzing the image... Please wait.</p>
                    </div>
                </CardContent>
                </Card>
            )}

            {aiResult && (
                 <Card className="border-primary/50 shadow-lg shadow-primary/10">
                    <CardHeader>
                        <CardTitle className="font-headline text-lg flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        AI Analysis Result
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                            <p className="font-bold">Waste Type</p>
                            <Badge variant="outline" className="text-base">{aiResult.wasteType}</Badge>
                        </div>

                         <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                            <p className="font-bold">Biodegradable?</p>
                            {aiResult.isBiodegradable ? (
                                <Badge className="bg-green-600 hover:bg-green-700 text-base">
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Yes
                                </Badge>
                            ) : (
                                <Badge variant="destructive" className="text-base">
                                    <XCircle className="mr-2 h-4 w-4" />
                                    No
                                </Badge>
                            )}
                        </div>

                        <Alert>
                            <AlertTitle className="font-headline">Handling Instructions</AlertTitle>
                            <AlertDescription>
                                {aiResult.handlingInstructions}
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            )}
        </div>
        </AppLayout>
    );
}
