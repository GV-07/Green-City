
"use client";

import { useState, useEffect, useTransition, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { createReport } from "./actions";
import { MapPin, Loader2, Camera, Mic } from "lucide-react";
import Image from "next/image";
import type { AICitizenReportValidationOutput } from "@/ai/flows/ai-citizen-report-validation-types";
import { Badge } from "@/components/ui/badge";
import { reportsStore } from "@/lib/reports-store";
import { useUser } from "@/hooks/use-user";
import type { Report } from "@/lib/types";

const formSchema = z.object({
  description: z.string().min(10, "Description must be at least 10 characters."),
  location: z.string().min(1, "Location is required."),
  timestamp: z.string(),
  photoOrVideoDataUri: z.string().min(1, "Photo or video evidence is required."),
});

type FormValues = z.infer<typeof formSchema>;

export function ReportForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [preview, setPreview] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<AICitizenReportValidationOutput | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  const currentUser = useUser();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      location: "",
      timestamp: "",
      photoOrVideoDataUri: "",
    },
  });
  
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

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      form.setValue("description", transcript, { shouldValidate: true });
    };

    recognition.onerror = (event: any) => {
      let description: string;
      let variant: 'destructive' | 'default' = 'destructive';
      let title = "Speech Recognition Error";

      switch (event.error) {
        case 'not-allowed':
          description = 'Microphone access was denied. Please enable it in your browser settings.';
          break;
        case 'audio-capture':
          description = 'No microphone was found. Please ensure a microphone is connected and working.';
          variant = 'default';
          break;
        case 'no-speech':
          title = 'No Speech Detected';
          description = 'Please try speaking again.';
          variant = 'default';
          break;
        default:
          description = `An unknown error occurred: ${event.error}`;
          break;
      }
      
      toast({
        variant: variant,
        title: title,
        description: description,
      });

      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
  }, [form, toast]);
  
  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current || isPending) return;

    if (videoRef.current.videoWidth === 0 || videoRef.current.videoHeight === 0) {
      toast({
        variant: "destructive",
        title: "Camera Not Ready",
        description: "The video stream is not yet available. Please wait a moment and try again.",
      });
      return;
    }

    startTransition(async () => {
        toast({ title: "Capturing...", description: "Getting location data." });
        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                });
            });

            const { latitude, longitude } = position.coords;
            const locationString = `Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`;
            const now = new Date();

            const video = videoRef.current!;
            const canvas = canvasRef.current!;
            const context = canvas.getContext("2d");

            if (!context) {
                throw new Error("Could not get canvas context");
            }

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            const scaleFactor = canvas.width / 1280; 
            const overlayHeight = Math.max(120 * scaleFactor, 90);
            const overlayY = canvas.height - overlayHeight - (20 * scaleFactor);
            const overlayPadding = 15 * scaleFactor;

            context.fillStyle = "rgba(0, 0, 0, 0.65)";
            context.fillRect(0, overlayY, canvas.width, overlayHeight);
            
            context.fillStyle = "white";
            context.textAlign = "left";
            context.textBaseline = "top";
            let textX = overlayPadding;
            let textY = overlayY + overlayPadding;
            
            let largeFontSize = Math.max(32 * scaleFactor, 20);
            context.font = `bold ${largeFontSize}px sans-serif`;
            context.fillText("Green City", textX, textY);
            textY += largeFontSize + (10 * scaleFactor);
            
            let smallFontSize = Math.max(22 * scaleFactor, 14);
            context.font = `${smallFontSize}px sans-serif`;

            context.fillText(locationString, textX, textY);
            textY += smallFontSize + (8 * scaleFactor);

            const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()];
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = now.getFullYear();
            let hours = now.getHours();
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours %= 12;
            hours = hours || 12;

            const tzOffset = now.getTimezoneOffset();
            const offsetSign = tzOffset > 0 ? '-' : '+';
            const offsetHours = String(Math.floor(Math.abs(tzOffset) / 60)).padStart(2, '0');
            const offsetMinutes = String(Math.abs(tzOffset) % 60).padStart(2, '0');
            const gmtString = `GMT${offsetSign}${offsetHours}:${offsetMinutes}`;
            
            const dateTimeString = `${dayOfWeek}, ${day}/${month}/${year} ${hours}:${minutes} ${ampm} ${gmtString}`;
            context.fillText(dateTimeString, textX, textY);

            context.textAlign = "start";
            context.textBaseline = "alphabetic";

            const dataUri = canvas.toDataURL("image/jpeg");

            form.setValue("photoOrVideoDataUri", dataUri, { shouldValidate: true });
            form.setValue("location", locationString);
            form.setValue("timestamp", now.toISOString());
            setPreview(dataUri);

        } catch (error) {
            console.error("Capture failed:", error);
            toast({
                variant: "destructive",
                title: "Capture Failed",
                description: (error as Error).message || "Could not get location. Please enable permissions and try again.",
            });
        }
    });
};

  const handleMicClick = () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      toast({
        variant: "destructive",
        title: "Feature Not Supported",
        description: "Speech recognition is not available in your browser.",
      });
      return;
    }

    if (isRecording) {
      recognition.stop();
    } else {
      form.setValue("description", ""); // Clear field before starting
      try {
        recognition.start();
        setIsRecording(true);
        toast({
          title: "Listening...",
          description: "Start speaking. Recording will stop automatically.",
        });
      } catch(e) {
        // Fails silently if recognition is already started.
        // The onerror handler will catch more critical errors.
      }
    }
  };

  const onSubmit = (values: FormValues) => {
    setAiResult(null);
    startTransition(async () => {
      const result = await createReport(values);
      if (result.success && result.aiOutput) {
        toast({
          title: "Report Submitted & Analyzed!",
          description: "Your report has been successfully analyzed by our AI.",
        });
        setAiResult(result.aiOutput);
        const newReport: Report = {
          id: `REP-${String(Date.now()).slice(-6)}`,
          description: values.description,
          location: values.location,
          timestamp: values.timestamp,
          imageUrl: values.photoOrVideoDataUri,
          imageHint: 'custom report',
          status: 'Pending',
          user: {
              name: currentUser.name,
              avatarUrl: currentUser.avatarUrl,
          },
          violationType: result.aiOutput.violation?.type,
          authenticity: result.aiOutput.authenticity,
        };
        reportsStore.addReport(newReport);
      } else {
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: result.error || "An unknown error occurred.",
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Violation Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="photoOrVideoDataUri"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Photo Evidence</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                        <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-secondary">
                          <video ref={videoRef} className="h-full w-full object-cover" autoPlay playsInline muted />
                          <canvas ref={canvasRef} className="hidden" />

                          {preview && (
                              <Image src={preview} alt="Evidence preview" layout="fill" objectFit="cover" />
                          )}

                          {!preview && hasCameraPermission === false && (
                              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 p-4">
                                  <Camera className="h-12 w-12 text-muted-foreground" />
                                  <p className="mt-4 text-center font-semibold">Camera Access Required</p>
                                  <p className="text-center text-sm text-muted-foreground">Please allow camera access.</p>
                              </div>
                          )}
                          {!preview && hasCameraPermission === null && (
                              <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                              </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                            {preview ? (
                                <Button type="button" variant="outline" onClick={() => {
                                    setPreview(null);
                                    form.setValue("photoOrVideoDataUri", "");
                                    form.setValue("location", "");
                                    form.setValue("timestamp", "");
                                }}>Retake Photo</Button>
                            ) : (
                                <Button type="button" onClick={handleCapture} disabled={isPending || hasCameraPermission !== true}>
                                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Camera className="mr-2 h-4 w-4" />}
                                    {isPending ? "Capturing..." : "Capture with Geotag"}
                                </Button>
                            )}
                        </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        placeholder="Describe the sanitation issue in detail, or use the mic to speak."
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleMicClick}
                        disabled={isPending}
                        className="absolute right-1 top-1.5 h-8 w-8"
                      >
                        {isRecording ? (
                          <Mic className="h-5 w-5 text-destructive animate-pulse" />
                        ) : (
                          <Mic className="h-5 w-5 text-muted-foreground" />
                        )}
                        <span className="sr-only">
                          {isRecording ? "Stop recording" : "Record voice description"}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Location will be geotagged" {...field} readOnly className="pl-10" />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Precise coordinates are embedded in the photo.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {aiResult && (
              <Card className="bg-secondary">
                <CardHeader>
                  <CardTitle className="font-headline text-lg">AI Analysis Result</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Authenticity</h4>
                    {aiResult.authenticity?.isAuthentic ? (
                      <Badge className="bg-green-600 hover:bg-green-700">Authentic</Badge>
                    ) : (
                      <div>
                        <Badge variant="destructive">Not Authentic</Badge>
                        <ul className="list-disc list-inside text-sm mt-2">
                          {aiResult.authenticity?.authenticityReasons.map((reason, i) => <li key={i}>{reason}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold">Violation Type</h4>
                    <Badge variant="outline" className="capitalize">{aiResult.violation?.type.replace(/_/g, ' ')}</Badge>
                    <p className="text-sm text-muted-foreground mt-2">{aiResult.violation?.description}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button type="submit" disabled={isPending || !preview} className="w-full">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? "Analyzing..." : "Submit & Analyze Report"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
