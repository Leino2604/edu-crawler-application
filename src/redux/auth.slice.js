import { createSlice } from "@reduxjs/toolkit";
const clearLS = () => {
    localStorage.removeItem("profile");
};

const getProfileFromLS = () => {
    const result = localStorage.getItem("profile");
    return result ? JSON.parse(result) : null;
};

const setProfileToLS = (profile) => {
    localStorage.setItem("profile", JSON.stringify(profile));
};

const initialState = {
    isAuthenticated: Boolean(getProfileFromLS()),
    user: getProfileFromLS(),
    isEdit: false,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSlice: (state, action) => {
            state.user = action.payload;
            setProfileToLS(action.payload);
            state.isAuthenticated = true;
        },
        logoutSlice: (state) => {
            clearLS();
            state.user = null;
            state.isAuthenticated = false;
        },
        setEdit: (state, action) => {
            state.isEdit = action.payload;
        },
        editSlice: (state, action) => {
            const data = { ...getProfileFromLS(), ...action.payload };
            setProfileToLS(data);
            state.user = getProfileFromLS();
        },
    },
});

export const { loginSlice, logoutSlice, setEdit, editSlice } =
    authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
