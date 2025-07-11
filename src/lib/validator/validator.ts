import {UserIm} from "@/lib/api/models/user/user-im";
import {UserRegister} from "@/lib/api/models/user/register-im";
import {UserUm} from "@/lib/api/models/user/user-um";
import { CompanyIM } from "../api/models/company/company-im";
import { InvoiceIM } from "../api/models/invoice/invoice-im";

export class Validator {

    
    public static ValidateUserIm(userIm: UserIm) {
        if (!userIm.username) {
            throw new Error("Потребителксото име е задължително.");
        }

        const regex = /^(?=.{5,20}$)(?!.*\.\.)([a-zA-Z0-9]+\.)*[a-zA-Z0-9]+$/;
        if (!regex.test(userIm.username)) {
            throw new Error("Потребителското име не е в правилния формат.");
        }
        
        if (!userIm.password) {
            throw new Error("Паролата е задължителна.");
        }
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/;
        
        if (!passwordRegex.test(userIm.password)) {
            throw new Error("Паролата не е в правилния формат.");
        }
    }

    public static ValidateUserRegister(user: UserRegister) {
        if (!user.username) {
        throw new Error("Потребителското име е задължително.");
        }
        const usernameRegex = /^(?=.{5,20}$)(?!.*\.\.)([a-zA-Z0-9]+\.)*[a-zA-Z0-9]+$/;
        if (!usernameRegex.test(user.username)) {
        throw new Error("Потребителското име не е в правилния формат.");
        }

        if (!user.password) {
        throw new Error("Паролата е задължителна.");
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/;
        if (!passwordRegex.test(user.password)) {
        throw new Error("Паролата не е в правилния формат.");
        }

        if (user.password !== user.confirmPassword) {
        throw new Error("Паролите не съвпадат.");
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
        if (!userUm.username) {
            throw new Error("Потребителксото име е задължително.");
        }

        const regex = /^(?=.{5,20}$)(?!.*\.\.)([a-zA-Z0-9]+\.)*[a-zA-Z0-9]+$/;
        if (!regex.test(userUm.username)) {
            throw new Error("Потребителското име не е в правилния формат.");
        }

        if (userUm.password) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/;
    
            if (!passwordRegex.test(userUm.password)) {
                throw new Error("Паролата не е в правилния формат.");
            }
        }
    }

    public static ValidateCompanyIm(companyIm: CompanyIM) {
        if (!companyIm.status?.trim()) {
            throw new Error("Статусът на фирмата е задължителен.");
        }
    
        if (!companyIm.uic?.trim()) {
            throw new Error("ЕИК (UIC) е задължителен.");
        }
    
        if (!companyIm.name?.trim()) {
            throw new Error("Името на фирмата е задължително.");
        }
    
        if (!companyIm.transliteration?.trim()) {
            throw new Error("Транслитерацията на името е задължителна.");
        }
    
        if (!companyIm.legalForm?.trim()) {
            throw new Error("Правната форма на фирмата е задължителна.");
        }
    
        if (!companyIm.headquarters?.trim()) {
            throw new Error("Адресът на седалището е задължителен.");
        }
    
        if (!companyIm.scopeOfActivity?.trim()) {
            throw new Error("Обхватът на дейност е задължителен.");
        }
    
        if (!companyIm.capital?.trim()) {
            throw new Error("Капиталът е задължителен.");
        }
    
        // Coerce string → Date if needed
        if (companyIm.registrationDate && !(companyIm.registrationDate instanceof Date)) {
            companyIm.registrationDate = new Date(companyIm.registrationDate as any);
        }

        // Now safely validate
        if (companyIm.registrationDate && isNaN(companyIm.registrationDate.getTime())) {
            throw new Error("Датата на регистрация не е валидна.");
        }
    }

    public static ValidateInvoiceIm(invoiceIm: InvoiceIM) {
        if (!invoiceIm.documentNumber?.trim())
            throw new Error("Номерът на фактурата е задължителен.");

        if (!invoiceIm.uicReceiver?.trim())
            throw new Error("ЕИК на получателя е задължителен.");

        if (!invoiceIm.uicSender?.trim())
            throw new Error("ЕИК на изпращача е задължителен.");

        if (!invoiceIm.paymentMethod?.trim())
            throw new Error("Методът на плащане е задължителен.");

        if (invoiceIm.taxableAmount == null || invoiceIm.taxableAmount <= 0)
            throw new Error("Облагаемата сума трябва да бъде по-голяма от 0.");

        if (invoiceIm.vatAmount == null || invoiceIm.vatAmount < 0)
            throw new Error("Сумата на ДДС не може да бъде отрицателна.");

        if (invoiceIm.netAmount == null || invoiceIm.netAmount < 0)
            throw new Error("Нетната сума не може да бъде отрицателна.");

        if (!Array.isArray(invoiceIm.products) || invoiceIm.products.length === 0)
            throw new Error("Трябва да има поне един артикул във фактурата.");

        // Validate each product
        invoiceIm.products.forEach((p, idx) => {
            if (p.quantity == null || p.quantity <= 0) {
                throw new Error(`Артикул ${idx + 1}: Количеството трябва да е по-голямо от 0.`);
            }
        });
    }
}