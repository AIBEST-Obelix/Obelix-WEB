"use client";

import React, {Dispatch, SetStateAction, useState} from "react";
import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Validator} from "@/lib/validator/validator";
import {toast} from "sonner";
import ErrorHandler from "@/lib/error-handlers/ErrorHandler";
import {AxiosError} from "axios";
import {ReloadIcon} from "@radix-ui/react-icons";
import authService from "@/lib/services/auth-service";
import { USER_TABLE_REFRESH_EVENT } from "@/lib/shared/constants";

export function CreateUserForm(
    { 
        setOpen, 
        className 
    } : React.ComponentProps<"form"> & { 
        setOpen?: Dispatch<SetStateAction<boolean>>
    }) 
{
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const form = event.currentTarget;
        const username = form['username'].value;
        const password = form['password']?.value;

        try {
            Validator.ValidateUserIm({username, password});

            await authService.CreateUserAsync({username, password});

            toast.success(`Успешно създадохте потребител ${username} в системата.`);

            const event = new CustomEvent(USER_TABLE_REFRESH_EVENT)

            window.dispatchEvent(event);

            setOpen && setOpen(false);
        } catch (error) {
            const msg = ErrorHandler.HandleRegisterError(error as AxiosError);
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={cn("grid items-start gap-4 pr-4 pl-4 md:pr-0 md:pl-0", className)}>
            <div className="grid gap-2">
                <Label htmlFor="username">Потребителско име</Label>
                <Input id="username" placeholder="username" required/>
                <Label htmlFor="password">Парола</Label>
                <Input id="password" type="password" required/>

            </div>
            <Button type={"submit"} className="w-full" disabled={isLoading}>
                {isLoading &&
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                }
                {isLoading ? "Моля изчакайте" : "Създаване"}
            </Button>
        </form>
    );
}