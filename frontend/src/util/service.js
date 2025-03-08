
export const setUser = (user) => {
    localStorage.setItem("user",user)  
}; 

export const getUser = () => { 
    localStorage.getItem("user");
}; 

export const setIsLogin = (value) => { 
    localStorage.setItem("isLogin", user);
}

export const getIsLogin = () => {
    localStorage.getItem("isLogin");
}

export const setAccessToken = (token) => { 
    localStorage.setItem("access_token", access_token); 
}; 

export const getToken = () => { 
    localStorage.getItem("access_token");
}; 

export const setRefreshToken = (refresh_token) => {
    localStorage.setItem("refresh_token", refresh_token);
}; 

export const getRefreshToken = () => {
    localStorage.getItem("refresh_token");
};




