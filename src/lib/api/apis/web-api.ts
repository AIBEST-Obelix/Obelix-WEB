import {cookies} from "next/headers";

export abstract class WebApi {
    protected async generateHeader(isFormData: boolean = false): Promise<object> {
        const token = (await cookies()).get("accessToken");
        
        if (isFormData) {
            return {
                headers: {
                    Authorization: `Bearer ${token?.value}`,
                    'Content-Type': 'multipart/form-data'
                },
            }
        }
        
        return {
            headers: {
                Authorization: `Bearer ${token?.value}`,
            },
        }
    }
}
