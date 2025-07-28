"use client"

import {Dispatch, SetStateAction, useState} from "react";
import {toast} from "sonner";
import {USER_TABLE_REFRESH_EVENT} from "@/lib/shared/constants";
import ErrorHandler from "@/lib/error-handlers/ErrorHandler";
import {AxiosError} from "axios";
import {Button} from "@/components/ui/button";
import {ReloadIcon} from "@radix-ui/react-icons";
import {cn} from "@/lib/utils";
import userService from "@/lib/services/user-service";

export function DeleteUserForm(
    {
        setOpen,
        className,
        username,
        userId
    } : React.ComponentProps<"form"> & {
        setOpen?: Dispatch<SetStateAction<boolean>>,
        username: string,
        userId: string
    })
{
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        try {

            await userService.DeleteUserAsync(userId);

            toast.success(`Successfully deleted user ${username} from the system.`);

            const events: Array<CustomEvent> = [
                new CustomEvent(USER_TABLE_REFRESH_EVENT)
            ]
            
            events.forEach(event => window.dispatchEvent(event));
            
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
            <Button type={"submit"} className="w-full" disabled={isLoading}>
                {isLoading &&
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                }
                {isLoading ? "Please wait" : "Delete"}
            </Button>
        </form>
    )
}