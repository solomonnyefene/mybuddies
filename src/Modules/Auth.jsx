import Cookies from "js-cookie";

class Auth {
    static authenticateToken(token){
        Cookies.set("token", token, { expires: 1860 });
        // sessionStorage.setItem('token', token);
    }

    static isUserAunthenticated(){
        Cookies.get("token");
        // return sessionStorage.getItem('token') !== null;
    }

    static deauthenticateUser(){
        sessionStorage.removeItem('token');
    }

    static getToken(){
        return sessionStorage.getItem('token');
    }

    static clearStorage(){
        sessionStorage.clear();
    }

}

export default Auth