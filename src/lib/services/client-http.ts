import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const clientHttpClient = axios.create({
    headers: {
        "Content-type": "application/json"
    },
    withCredentials: true
});

createAuthRefreshInterceptor(clientHttpClient, (async (failedRequest) => {
    try {
        const res = await clientHttpClient.post("/api/auth/renew");
       
        Object.keys(res.headers).forEach(key => failedRequest.response.config.headers.set(key, res.headers[key]));
        
        failedRequest.response.config.headers['Authorization'] = `Bearer ${res.data.accessToken}`;

        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}));

export default clientHttpClient;