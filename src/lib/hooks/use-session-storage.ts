import {useEffect} from "react";
import {SessionStorageService} from "@/lib/services/session-storage-service";

function useSessionStorage(key: string, state: string | undefined, setState: (value: string | undefined) => void) {
    useEffect(() => {
        if (state == "") {
            SessionStorageService.removeItem(key);
            return;
        }

        if (state == undefined) {
            const storedValue = SessionStorageService.getItem<string>(key);

            if (storedValue == null) {
                SessionStorageService.removeItem(key);
            } else {
                setState(storedValue);
            }
        }

        SessionStorageService.setItem(key, state);
    }, [state, key, setState]);
}

export default useSessionStorage;