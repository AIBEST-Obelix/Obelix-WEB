"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Validator } from "@/lib/validator/validator";
import authService from "@/lib/services/auth-service";
import ErrorHandler from "@/lib/error-handlers/ErrorHandler";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const form = event.currentTarget;
        const email = form['email'].value;  // you use email, but named username in your original try
        const password = form['password'].value;

        try {
            Validator.ValidateUserIm({ email, password });

            await authService.LoginAsync({ email, password });

            toast.success("Successfully logged into the system.");

            router.push("/");
        } catch (error) {
            const msg = ErrorHandler.HandleLoginError(error as AxiosError);
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email and password to continue
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="johndoe@example.com" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder='••••••••' required />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-row gap-2 justify-between">
                    <Button type="submit" className="w-1/3" disabled={isLoading}>
                        {isLoading &&
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        }
                        {isLoading ? "Please wait" : "Login"}
                    </Button>
                    <Link href="/auth/register" passHref>
                        <Button variant="outline" className="w-full" type="button">
                            Don&apos;t have an account? Register
                        </Button>
                    </Link>
                </CardFooter>
            </form>
        </Card>
    );
}
