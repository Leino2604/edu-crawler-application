import axios from "axios";

export const login = (body) => {
    return axios.post(
        "https://edu-crawler-application-be.onrender.com/api/auth/signin",
        body
    );
};

export const register = (body) =>
    axios.post(
        "https://edu-crawler-application-be.onrender.com/api/auth/signup",
        body
    );
