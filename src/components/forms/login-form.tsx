"use client";

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import axios, {Axios, AxiosError} from "axios";
import {Validator} from "@/lib/validator/validator";
import authService from "@/lib/services/auth-service";
import ErrorHandler from "@/lib/error-handlers/ErrorHandler";
import {useState} from "react";
import {ReloadIcon} from "@radix-ui/react-icons";
import { useRouter } from 'next/navigation'

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const form = event.currentTarget;
        const username = form['username'].value;
        const password = form['password'].value;

        try {
            Validator.ValidateUserIm({username, password});

            await authService.LoginAsync({username, password});

            toast.success("Успешно влязохте в системата.");
            
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
                <CardTitle className="text-2xl">Вход</CardTitle>
                <CardDescription>
                    Въведете вашето потребителско име и парола, за да продължите
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Потребителско име</Label>
                        <Input id="username" type="username" placeholder="Потребителско име" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Парола</Label>
                        <Input id="password" type="password" required />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type={"submit"} className="w-full" disabled={isLoading}>
                        {isLoading && 
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        }
                        {isLoading ? "Моля изчакайте" : "Вход"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
