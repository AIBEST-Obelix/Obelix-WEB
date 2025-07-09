"use client"

import {ComponentProps, Dispatch, FormEvent, SetStateAction, useState} from "react";
import {Validator} from "@/lib/validator/validator";
import {toast} from "sonner";
import {USER_TABLE_REFRESH_EVENT} from "@/lib/shared/constants";
import ErrorHandler from "@/lib/error-handlers/ErrorHandler";
import {AxiosError} from "axios";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {ReloadIcon} from "@radix-ui/react-icons";
import {cn} from "@/lib/utils";
import userService from "@/lib/services/user-service";

export function EditUserForm(
    {
        setOpen,
        className,
        username,
        userId
    } : ComponentProps<"form"> & {
        setOpen?: Dispatch<SetStateAction<boolean>>,
        username: string,
        userId: string
    })
{
    const [isLoading, setIsLoading] = useState(false);
    const [checked, setChecked] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const form = event.currentTarget;
        const username = form['username'].value;
        const password = form['password']?.value;

        try {
            Validator.ValidateUserUm({username, password});

            await userService.UpdateUserAsync(userId,{username, password});
            toast.success(`Успешно редактирахте потребител ${username} в системата.`);

            const event = new CustomEvent(USER_TABLE_REFRESH_EVENT)

            window.dispatchEvent(event);

            if (setOpen) {
                setOpen(false);
            }
            
        } catch (error) {
            const msg = ErrorHandler.HandleLoginError(error as AxiosError);
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={cn("grid items-start gap-4 pr-4 pl-4 md:pr-0 md:pl-0", className)}>
            <div className="grid gap-2">
                <Label htmlFor="username">Потребителско име</Label>
                <Input id="username" defaultValue={username}/>
                <div className="flex items-center space-x-2">
                    <Checkbox checked={checked} id="passwordCheck" onCheckedChange={() => setChecked(!checked)} />
                    <Label htmlFor="passwordCheck" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Промяна на паролата
                    </Label>
                </div>
                {checked && (
                    <>
                        <Label htmlFor="password">Парола</Label>
                        <Input id="password" type="password" />
                    </>
                )}


            </div>
            <Button type={"submit"} className="w-full" disabled={isLoading}>
                {isLoading &&
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                }
                {isLoading ? "Моля изчакайте" : "Запазване"}
            </Button>
        </form>
    )
}