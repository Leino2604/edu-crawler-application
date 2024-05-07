import axios from "axios";

export const login = (body) => {
    return axios.post(
        "https://edu-crawler-application-be.onrender.com/api/auth/signin",
        body
    );
};

export const register = (body) =>
    // axios.post(`${API_BASE_URL}/auth/register.php`, body);
    {
        console.log(body);
    };
