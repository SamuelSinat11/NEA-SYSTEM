export const isEmptyOrNull = (value) => {
    return value === "" || value === null || value === "null" || value === undefined || value === "undefined";
};

// Set user data in localStorage
export const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user)); // Store in JSON format
};

// Get user data from localStorage
export const getUser = () => {
    const user = localStorage.getItem("user");
    return !isEmptyOrNull(user) ? JSON.parse(user) : null;
};

// Set login status in localStorage
export const setIsLogin = (value) => {
    localStorage.setItem("isLogin", value ? "1" : "0"); // Store as "1" or "0"
};

// Get login status from localStorage
export const getIsLogin = () => {
    return localStorage.getItem("isLogin") === "1"; // Returns true if "1", otherwise false
};

// Set access token in localStorage
export const setAccessToken = (token) => {
    localStorage.setItem("access_token", token);
};

// Get access token from localStorage
export const getToken = () => {
    return localStorage.getItem("access_token");
};

// Set refresh token in localStorage
export const setRefreshToken = (refresh_token) => {
    localStorage.setItem("refresh_token", refresh_token);
};

// Get refresh token from localStorage
export const getRefreshToken = () => {
    return localStorage.getItem("refresh_token");
};
