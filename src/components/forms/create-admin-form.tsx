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
import {ADMIN_TABLE_REFRESH_EVENT} from "@/lib/shared/constants";
import authService from "@/lib/services/auth-service";
import {UserIm} from "@/lib/api/models/user/user-im";

export function CreateAdminForm(
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
        const email = form['email'].value;
        const password = form['password'].value;
        const firstName = form['firstName'].value;
        const lastName = form['lastName'].value;

        try {
            // Create a proper UserIm object
            const adminData = new UserIm();
            adminData.email = email.trim();
            adminData.password = password.trim();
            adminData.firstName = firstName.trim();
            adminData.lastName = lastName.trim();

            // Validate using the proper UserIm validator
            Validator.ValidateUserIm(adminData);

            await authService.CreateAdminAsync(adminData);

            toast.success(`Successfully created admin ${email} in the system.`);

            const event = new CustomEvent(ADMIN_TABLE_REFRESH_EVENT);
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
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" required />

                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" required />

                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" required />

                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
            </div>

            <Button type={"submit"} className="w-full" disabled={isLoading}>
                {isLoading &&
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                }
                {isLoading ? "Please wait" : "Create Admin"}
            </Button>
        </form>
    );
}