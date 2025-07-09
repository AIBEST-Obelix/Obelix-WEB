export class SessionStorageService{
    public static setItem<Type>(key: string, value: Type) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    public static getItem<Type>(key: string): Type | null {
        if (typeof sessionStorage === "undefined") {
            return null;
        }
        
        const item = sessionStorage.getItem(key);
        try {
            return item ? JSON.parse(item) : null;
        } catch (e) {
            return null;
        }
    }
    
    public static removeItem(key: string) {
        sessionStorage.removeItem(key);
    }
}