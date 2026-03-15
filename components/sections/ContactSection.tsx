"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AnimatedSection } from "../ui/AnimatedSection";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { FaPaperPlane, FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess(true);
                reset();
            } else {
                setError(result.message || "Failed to send message.");
            }
        } catch (err) {
            setError("Something went wrong. Please check your connection and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatedSection id="contact" className="py-20 bg-card/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    title="Get In Touch"
                    subtitle="Have a question or want to work together? Send me a message!"
                />

                <div className="mt-16 mx-auto max-w-3xl">
                    <Card>
                        {success ? (
                            <div className="py-12 text-center">
                                <FaCheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
                                <h3 className="text-2xl font-bold text-foreground">Message Sent!</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                                </p>
                                <Button className="mt-8" onClick={() => setSuccess(false)}>
                                    Send Another Message
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-foreground">
                                            Name
                                        </label>
                                        <input
                                            id="name"
                                            {...register("name")}
                                            className={`block w-full rounded-md border bg-background px-4 py-2 text-sm outline-none transition-colors focus:border-primary ${errors.name ? "border-red-500" : "border-border"
                                                }`}
                                            placeholder="Your Name"
                                        />
                                        {errors.name && (
                                            <p className="flex items-center gap-1 text-xs text-red-500">
                                                <FaExclamationCircle /> {errors.name.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-foreground">
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            {...register("email")}
                                            className={`block w-full rounded-md border bg-background px-4 py-2 text-sm outline-none transition-colors focus:border-primary ${errors.email ? "border-red-500" : "border-border"
                                                }`}
                                            placeholder="your.email@example.com"
                                        />
                                        {errors.email && (
                                            <p className="flex items-center gap-1 text-xs text-red-500">
                                                <FaExclamationCircle /> {errors.email.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium text-foreground">
                                        Subject
                                    </label>
                                    <input
                                        id="subject"
                                        {...register("subject")}
                                        className={`block w-full rounded-md border bg-background px-4 py-2 text-sm outline-none transition-colors focus:border-primary ${errors.subject ? "border-red-500" : "border-border"
                                            }`}
                                        placeholder="Wanna talk about..."
                                    />
                                    {errors.subject && (
                                        <p className="flex items-center gap-1 text-xs text-red-500">
                                            <FaExclamationCircle /> {errors.subject.message}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        {...register("message")}
                                        className={`block w-full rounded-md border bg-background px-4 py-2 text-sm outline-none transition-colors focus:border-primary resize-none ${errors.message ? "border-red-500" : "border-border"
                                            }`}
                                        placeholder="Tell me more about it..."
                                    />
                                    {errors.message && (
                                        <p className="flex items-center gap-1 text-xs text-red-500">
                                            <FaExclamationCircle /> {errors.message.message}
                                        </p>
                                    )}
                                </div>

                                {error && (
                                    <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                                        <p className="text-sm text-red-500">{error}</p>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full sm:w-auto"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <FaSpinner className="mr-2 animate-spin" /> Sending...
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane className="mr-2" /> Send Message
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}
                    </Card>
                </div>
            </div>
        </AnimatedSection>
    );
}
