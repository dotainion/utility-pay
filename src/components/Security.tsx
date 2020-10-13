import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDQdSVTeVQEk4i3VPfyc8jckSgPzK8Qf5A",
    authDomain: "billpay-4204e.firebaseapp.com",
    databaseURL: "https://billpay-4204e.firebaseio.com",
    projectId: "billpay-4204e",
    storageBucket: "billpay-4204e.appspot.com",
    messagingSenderId: "556255543987",
    appId: "1:556255543987:web:7c9cb57eab3828a7e866c6",
}

firebase.initializeApp(config);

export class Creds{
    check(email:string){
        const regix = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (regix.test(email)) return true;
        return false;
    }
    save(email:string,password:string){
        const creds = JSON.stringify({email:email,password:password});
        window.localStorage.setItem("creds",creds);
    }
    get(){
        const creds = window.localStorage.getItem("creds");
        if (creds) return JSON.parse(creds);
        else return {email:"",password:""};
    }
    rmbr(){
        const creds = window.localStorage.getItem("creds");
        if (creds){
            if (JSON.parse(creds).email && JSON.parse(creds).password) return true;
            return false;
        }
    }
}
export class Security{
    async login(email:string,password:string){
        try{
            const response = await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log(response);
            window.localStorage.setItem("login","login");
            return {state:true,message:""};
        }catch(error){
            window.localStorage.setItem("login","logout");
            if (error.code === "auth/user-not-found"){
                return {state:null,message:"User dose not exist or may have been deactivated"};
            }else if (error.code === "auth/network-request-failed"){
                return {state:"no-connection",message:"Unable to connect to server, try again later"};
            }else{
                return {state:false,message:"Email or password is incorrect"};
            }
        }
    }
    async register(email:string,password:string){
        try{
            console.log("firebase starting");
            const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
            console.log(response);
            return {state:true,message:""};
        }catch(error){
            return {state:false,message:error.message};
        }
    }
    isLogin(init:string=""){
        if (init === "init"){
            window.localStorage.setItem("login","logout");
        }else{
            const is_login = window.localStorage.getItem("login");
            if (is_login === "login") return true;
            return false;
        }
    }
}

