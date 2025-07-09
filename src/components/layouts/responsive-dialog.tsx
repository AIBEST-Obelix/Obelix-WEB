"use client"

import {useMediaQuery} from "@/lib/hooks/use-media-query";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button, ButtonProps} from "@/components/ui/button";
import React, {ReactElement} from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";

export function ResponsiveDialog(
    {
        buttonIcon, 
        buttonTitle, 
        dialogTitle, 
        dialogDescription, 
        form,
        buttonVariant,
        haveFlexSize
    } : { 
        buttonIcon?: ReactElement | undefined, 
        buttonTitle: string,
        dialogTitle: string,
        dialogDescription: string,
        form: ReactElement,
        buttonVariant: ButtonProps['variant'],
        haveFlexSize?: boolean
    }) {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant={buttonVariant} className="gap-1" >
                        {buttonIcon &&
                            <buttonIcon.type {...buttonIcon.props} />
                        }
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                           {buttonTitle}
                        </span>
                    </Button>
                </DialogTrigger>
                <DialogContent
                    className={haveFlexSize ? "w-[90%] max-w-[90%] h-[80%] max-h-[80%] flex flex-col overflow-y-auto" : "sm:max-w-[425px]"}>
                    <DialogHeader>
                        <DialogTitle>{dialogTitle}</DialogTitle>
                        <DialogDescription>
                            {dialogDescription}
                        </DialogDescription>
                    </DialogHeader>
                    <form.type {...form.props} setOpen={setOpen} />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant={buttonVariant} className="gap-1" >
                    {buttonIcon &&
                        <buttonIcon.type {...buttonIcon.props} />
                    }
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        {buttonTitle}
                    </span>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>{dialogTitle}</DrawerTitle>
                    <DrawerDescription>
                        {dialogDescription}
                    </DrawerDescription>
                </DrawerHeader>
                <form.type {...form.props} className={"mx-4"} setOpen={setOpen} />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Отказване</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}