import {UserIm} from "@/lib/api/models/user/user-im";
import {RegisterIm} from "@/lib/api/models/user/register-im";
import {UserUm} from "@/lib/api/models/user/user-um";

export class Validator {
    public static ValidateUserIm(userIm: UserIm) {
        console.log(`Validating UserIm:`, userIm);
        if (!userIm.email) {
            throw new Error("Email is required.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userIm.email)) {
            throw new Error("Email is not in the correct format.");
        }
        
        if (!userIm.password) {
            throw new Error("Password is required.");
        }
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/;
        
        if (!passwordRegex.test(userIm.password)) {
            throw new Error("Password is not in the correct format.");
        }

        // Validate firstName if provided
        if (userIm.firstName) {
            const nameRegex = /^[a-zA-Zа-яА-ЯёЁ]{2,30}$/;
            if (!nameRegex.test(userIm.firstName)) {
                throw new Error("First name is not in the correct format. It should be 2-30 characters long and contain only letters.");
            }
        }

        // Validate lastName if provided
        if (userIm.lastName) {
            const nameRegex = /^[a-zA-Zа-яА-ЯёЁ]{2,30}$/;
            if (!nameRegex.test(userIm.lastName)) {
                throw new Error("Last name is not in the correct format. It should be 2-30 characters long and contain only letters.");
            }
        }
    }

    public static ValidateUserRegister(user: RegisterIm) {
        if (!user.password) {
            throw new Error("Password is required.");
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/;
        if (!passwordRegex.test(user.password)) {
            throw new Error("Password is not in the correct format.");
        }

        if (!user.email) {
            throw new Error("Email is required.");
        }

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!emailRegex.test(user.email)) {
            throw new Error("Email is not in the correct format.");
        }
    }

    public static ValidateUserUm(userUm: UserUm) {
        console.log("Validating UserUm:", userUm);
        if (userUm.firstName) {
            const nameRegex = /^[a-zA-Zа-яА-ЯёЁ]{2,30}$/;
            if (!nameRegex.test(userUm.firstName)) {
                throw new Error("First name is not in the correct format. It should be 2-30 characters long and contain only letters.");
            }
        }

        if (userUm.lastName) {
            const nameRegex = /^[a-zA-Zа-яА-ЯёЁ]{2,30}$/;
            if (!nameRegex.test(userUm.lastName)) {
                throw new Error("Last name is not in the correct format. It should be 2-30 characters long and contain only letters.");
            }
        }

        if (userUm.email) {
            const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            if (!regex.test(userUm.email)) {
                throw new Error("Email is not in the correct format. It should be 5-20 characters long and contain only letters, numbers, and dots.");
            }
        }

        if (userUm.password) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/;
    
            if (!passwordRegex.test(userUm.password)) {
                throw new Error("Password is not in the correct format. It should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.");
            }
        }
    }
}