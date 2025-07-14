import {UserIm} from "@/lib/api/models/user/user-im";
import {RegisterIm} from "@/lib/api/models/user/register-im";
import {UserUm} from "@/lib/api/models/user/user-um";

export class Validator {
    public static ValidateUserIm(userIm: UserIm) {
        if (!userIm.email) {
            throw new Error("Имейлът е задължителен.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userIm.email)) {
            throw new Error("Имейлът не е в правилния формат.");
        }
        
        if (!userIm.password) {
            throw new Error("Паролата е задължителна.");
        }
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/;
        
        if (!passwordRegex.test(userIm.password)) {
            throw new Error("Паролата не е в правилния формат.");
        }
    }

    public static ValidateUserRegister(user: RegisterIm) {
        if (!user.password) {
        throw new Error("Паролата е задължителна.");
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/;
        if (!passwordRegex.test(user.password)) {
        throw new Error("Паролата не е в правилния формат.");
        }


        if (!user.email) {
        throw new Error("Имейлът е задължителен.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
        throw new Error("Имейлът не е валиден.");
        }
    }

    public static ValidateUserUm(userUm: UserUm) {
        if (userUm.firstName) {
            const nameRegex = /^[a-zA-Zа-яА-ЯёЁ]{2,30}$/;
            if (!nameRegex.test(userUm.firstName)) {
                throw new Error("Името не е в правилния формат.");
            }
        }

        if (userUm.email) {
            const regex = /^(?=.{5,20}$)(?!.*\.\.)([a-zA-Z0-9]+\.)*[a-zA-Z0-9]+$/;
            if (!regex.test(userUm.email)) {
                throw new Error("Имейлът не е в правилния формат.");
            }
        }

        if (userUm.password) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/;
    
            if (!passwordRegex.test(userUm.password)) {
                throw new Error("Паролата не е в правилния формат.");
            }
        }
    }
}