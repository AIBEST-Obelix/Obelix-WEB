import {AxiosError} from "axios";

const INVALID_JSON = "Invalid JSON.";
const INVALID_USERNAME = "Invalid Username.";
const INVALID_PASSWORD = "Invalid Password.";
const ADMIN_EXISTS = "Admin already exists.";
const PROVIDER_ADMIN_EXISTS = "Provider admin already exists.";
const USER_ALREADY_EXISTS = "User already exists";

export default class ErrorHandler {
    public static HandleLoginError(error: any) : string {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data.error;
            if ([INVALID_JSON, INVALID_USERNAME, INVALID_PASSWORD].includes(errorMessage)) {
                return "Неправилни данни за вход.";
            } else {
                return errorMessage || error.message;
            }
        } else {
            return error.message;
        }
    }
    
    public static HandleRegisterError(error: any) : string {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data.error;
            if ([INVALID_JSON, INVALID_USERNAME, INVALID_PASSWORD].includes(errorMessage)) {
                return "Неправилни данни за регистрация.";
            } else if ([ADMIN_EXISTS, USER_ALREADY_EXISTS, PROVIDER_ADMIN_EXISTS].includes(errorMessage)) {
                return "Потребител със същото потребителско име вече съществува. (Проверете дали има изтрит потребител със същото потребителско име)";
            } else {
                return errorMessage || error.message;
            }
        } else {
            return error.message;
        }
    }
    
    public static HandleUserError(error: any) : string {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data.error;
            if ([INVALID_JSON].includes(errorMessage)) {
                return "Неправилни данни за потребител.";
            } else {
                return errorMessage || error.message;
            }
        } else {
            return error.message;
        }
    }
    
    public static HandleProviderError(error: any) : string {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data.error;
            if ([INVALID_JSON].includes(errorMessage)) {
                return "Неправилни данни за дистрибутор.";
            } else {
                return errorMessage || error.message;
            }
        } else {
            return error.message;
        }
    }

    public static HandleBrandError(error: any) : string {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data.error;
            if ([INVALID_JSON].includes(errorMessage)) {
                return "Неправилни данни за марка.";
            } else {
                return errorMessage || error.message;
            }
        } else {
            return error.message;
        }
    }

    public static HandleStreetError(error: any) : string {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data.error;
            if ([INVALID_JSON].includes(errorMessage)) {
                return "Неправилни данни за улица.";
            } else {
                return errorMessage || error.message;
            }
        } else {
            return error.message;
        }
    }

    public static HandleAddressError(error: any) : string {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data.error;
            if ([INVALID_JSON].includes(errorMessage)) {
                return "Неправилни данни за адрес.";
            } else {
                return errorMessage || error.message;
            }
        } else {
            return error.message;
        }
    }

    public static HandleContainerError(error: any): string {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data.error;
            if ([INVALID_JSON].includes(errorMessage)) {
                return "Неправилни данни за контейнер.";
            } else {
                return errorMessage || error.message;
            }
        } else {
            return error.message;
        }
    }
}