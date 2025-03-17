export const setAccessToken = (value) => { 
    localStorage.setItem("access_token", value);
}; 

export const getAccessToken = () => { 
    return localStorage.getItem("access_token");
}; 

export const setProfile = (value) => { 
    localStorage.setItem("profile", value); 
}; 

export const getProfile = () => { 
    try { 
        let profile = localStorage.getItem("profile");  // Change `const` to `let`
        if(profile !== "" && profile !== null && profile !== undefined) { 
            profile = JSON.parse(profile); 
            return profile;  // Return the profile
        }
        return null;  // Return null if no profile exists
    } catch (error) { 
        return null;  // Return null if there's an error in parsing
    }
}; 
