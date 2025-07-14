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
import Link from "next/link";

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const form = event.currentTarget;
        const firstName = form['firstName'].value;
        const lastName = form['lastName'].value;
        const email = form['email'].value;
        const password = form['password'].value;
        const confirmPassword = form['confirmPassword'].value;

        try {
            if (password !== confirmPassword) {
                toast.error("Паролите не съвпадат.");
                return;
            }

            Validator.ValidateUserRegister({firstName, lastName, email, password });

            await authService.CreateUserAsync({ email, password });

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
                        <Label htmlFor="firstName">Име</Label>
                        <Input id="firstName" type="firstName" placeholder="John" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="lastName">Фамилия</Label>
                        <Input id="lastName" type="lastName" placeholder="Doe" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Имейл</Label>
                        <Input id="email" type="email" placeholder={"johndoe@example.com"} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Парола</Label>
                        <Input id="password" type="password" placeholder='••••••••' required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">Потвърди парола</Label>
                        <Input id="confirmPassword" type="password" placeholder='••••••••' required />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-row gap-2 justify-between">
                    <Button type="submit" className="w-1/3" disabled={isLoading}>
                        {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                        {isLoading ? "Моля изчакайте" : "Регистрация"}
                    </Button>
                    <Link href="/auth/login" passHref>
                        <Button variant="outline" className="w-full" type="button">
                            Имате акаунт? Впишете се
                        </Button>
                    </Link>
                </CardFooter>
            </form>
        </Card>
    );
}
