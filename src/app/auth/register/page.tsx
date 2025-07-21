"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "@/components/forms/register-form";
import { motion } from "framer-motion";

export default function RegisterPage() {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 animate-gradient-xy opacity-30 blur-2xl" />

            <div className="absolute inset-0 flex items-center justify-center px-4 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-md"
                >
                    <Card className="backdrop-blur-lg bg-white/10 dark:bg-black/10 shadow-2xl border border-white/20 dark:border-zinc-800 rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-center text-2xl font-semibold text-white dark:text-zinc-100">
                                Create Your Account
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <RegisterForm />
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}