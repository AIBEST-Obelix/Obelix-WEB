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
                return "Invalid login credentials.";
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
                    return "Invalid registration data.";
            } else if ([ADMIN_EXISTS, USER_ALREADY_EXISTS, PROVIDER_ADMIN_EXISTS].includes(errorMessage)) {
                return "User with the same username already exists. (Check if there is a deleted user with the same username)";
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
                return "Invalid user data.";
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
                return "Invalid provider data.";
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
                return "Invalid brand data.";
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
                return "Invalid street data.";
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
                return "Invalid address data.";
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
                return "Invalid container data.";
            } else {
                return errorMessage || error.message;
            }
        } else {
            return error.message;
        }
    }
}