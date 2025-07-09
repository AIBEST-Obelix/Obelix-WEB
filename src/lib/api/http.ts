import axios from "axios";

const apiHttpClient = axios.create({
    baseURL: "http://localhost:5151",
    headers: {
        "Content-type": "application/json"
    },
    withCredentials: true
});

export default apiHttpClient;