"use client";

import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {useState} from "react";
import {ReloadIcon} from "@radix-ui/react-icons";
import {useRouter} from "next/navigation";
import {Validator} from "@/lib/validator/validator";
import authService from "@/lib/services/auth-service";
import ErrorHandler from "@/lib/error-handlers/ErrorHandler";
import {AxiosError} from "axios";

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const form = event.currentTarget;
        const email = form['email'].value;
        const username = form['username'].value;
        const password = form['password'].value;
        const confirmPassword = form['confirmPassword'].value;

        try {
            if (password !== confirmPassword) {
                toast.error("Паролите не съвпадат.");
                return;
            }

            Validator.ValidateUserRegister({ email, username, password });

            await authService.RegisterAsync({ email, username, password });

            toast.success("Регистрацията беше успешна.");
            router.push("/login");
        } catch (error) {
            const msg = ErrorHandler.HandleRegisterError(error as AxiosError);
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl">Регистрация</CardTitle>
                <CardDescription>Създайте нов акаунт</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Имейл</Label>
                        <Input id="email" type="email" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">Потребителско име</Label>
                        <Input id="username" type="text" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Парола</Label>
                        <Input id="password" type="password" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">Потвърди парола</Label>
                        <Input id="confirmPassword" type="password" required />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                        {isLoading ? "Моля изчакайте" : "Регистрация"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
