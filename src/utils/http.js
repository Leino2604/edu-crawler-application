import axios from "axios";

class Http {
    constructor() {
        this.instance = axios.create({
            baseURL: "https://educrawlerapi.onrender.com/",
            timeout: 150000,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

const http = new Http().instance;

export default http;
