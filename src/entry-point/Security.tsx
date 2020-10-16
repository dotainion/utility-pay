/*tools file*/
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


export class Security{
    async login(email:string,password:string){
        try{
            const response = await firebase.auth().signInWithEmailAndPassword(email, password);
            window.localStorage.setItem("login",JSON.stringify(true));
            return {state:true,message:"",data:response};
        }catch(error){
            window.localStorage.setItem("login",JSON.stringify(false));
            if (error.code === "auth/user-not-found"){
                return {state:null,message:"User dose not exist or may have been deactivated",data:null};
            }else if (error.code === "auth/network-request-failed"){
                return {state:"no-connection",message:"Unable to connect to server, try again later",data:null};
            }else{
                return {state:false,message:"Email or password is incorrect",data:null};
            }
        }
    }
    async register(email:string,password:string){
        try{
            const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
            window.localStorage.setItem("login",JSON.stringify(true));
            return {state:true,message:"",data:response};
        }catch(error){
            window.localStorage.setItem("login",JSON.stringify(false));
            return {state:false,message:error.message,data:null};
        }
    }
    logOut(){
        window.localStorage.setItem("login",JSON.stringify(true));
    }
    isLogin(){
        const is_login = window.localStorage.getItem("login");
        if (is_login && JSON.parse(is_login) === true) return true
        return false;
    }
}


class LoginHandlerClass{
    tools:any = null;
    toServer = new Security();
    constructor(tools:any){
        this.tools = tools;
    }
    async check(credsObject:any,IdObject:any,color:string="red"){
        let isValid = true;
        let errMsg = "";
        let emailError = false;
        let passwordError = false;
        if (this.tools.isEmailValid(credsObject.email) === false){
            isValid = false;
            document.getElementById(IdObject.email)!.style.border = "1px solid "+color;
            emailError = true;
        }
        if (!credsObject.password){
            isValid = false;
            document.getElementById(IdObject.password)!.style.border = "1px solid "+color;
            passwordError = true;
        }
        if (isValid) return await this.toServer.login(credsObject.email,credsObject.password);
        if (emailError && passwordError) errMsg = "Invalid email and password format";
        else if (emailError) errMsg = "Invalid email format";
        else errMsg = "A password was not provided";
        return {state:false,message:errMsg,data:null}
    }
}

class RegisterHandler{
    tools:any = null;
    toServer = new Security();
    constructor(tools:any){
        this.tools = tools;
    }
    REGISTER_INPUTS = {
        user:{
            firstname:"",
            lastname:"",
            contact:"",
        },
        area:{
            city:"",
            state:"",
            address:"",
        },
        creds:{
            email:"",
            password:"",
            confirmpassord:"",
        }
    }
    objOganizer(){

    }
    async check(credsObject:any){
        if (this.tools.isEmailValid(credsObject.creds.email) === false) return {state:false,message:"Invalid email and password format"};
        return await this.toServer.register(credsObject.creds.email,credsObject.creds.password);
    }
}

class Tools{

    login = new LoginHandlerClass(this);
    register = new RegisterHandler(this);

    errCheck(objId:any,inputsObj:any,color:string="red"){
        let STATE = true;
        for (var inputs of Object.keys(inputsObj)){
            if (inputsObj[inputs] === ""){
                document.getElementById(objId[inputs])!.style.border = "1px solid "+color;
                STATE = false;
            }
        }
        return STATE;
    }
    checkEmailCrdsMatch(objId:any,inputsObj:any,onReturnFunc:any){
        let msg = "";
        let msgCreds = "";
        let msgEmail = "";
        let STATE = this.errCheck(objId,inputsObj);
        if (STATE){
            if (inputsObj.password !== inputsObj.confirmpassord){
                STATE = false;
                msgCreds = "Passwords mismatch";
            }
            if (!this.isEmailValid(inputsObj.email)){
                STATE = false;
                msgEmail = "Invalid email format";
            }
            if (!STATE && onReturnFunc){
                if (msgCreds && msgEmail) msg = msgEmail + " and " + msgCreds;
                else if (msgCreds) msg = msgCreds;
                else msg = msgEmail;
            }
            if (STATE){
                if (!this.credsStrenght(inputsObj.password).is_strong){
                    STATE = false;
                    msg = "Password must contain a Capital letter, number and a symbol.";
                }
            }
            onReturnFunc({state:STATE,message:msg,data:null});            
        }
        return STATE;
    }
    credsStrenght(password:string){
        var result = 0;
        //check to see if password has 8 or more characters
        if (password.split("").length >= 8) result ++;
        //check for Capital letters
        if (/[A-Z]/.test(password)) result ++;
        //check for a Numeric value
        if (/\d/.test(password)) result ++;
        //check if password has a Symbol character
        if (password.match(/[|\\/~^:,;?!&%$@#*+()]/)) result ++;
        //check if value is 4
        if (result === 4) return {value:result,is_strong:true};
        return {value:result,is_strong:false};
    }
    errReset(id:string,color="lightgray"){
        document.getElementById(id)!.style.border = "1px solid "+color;
    }
    errSet(id:string,color="lightgray"){
        document.getElementById(id)!.style.border = "1px solid "+color;
    }
    isEmailValid(email:string){
        const regix = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (regix.test(email)) return true;
        return false;
    }
    isEmailValidWidthError(email:string,id:string,color:string="red"){
        const regix = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (regix.test(email)) return {state:true,message:""};
        else {
            document.getElementById(id)!.style.border = "1px solid "+color;
            return {state:false,message:"Invalid email format"};
        };
    }
    saveCreds(credentials:any){
        const creds = JSON.stringify({email:credentials.email,password:credentials.password});
        window.localStorage.setItem("creds",creds);
    }
    clearCreds(){
        window.localStorage.setItem("creds","");
    }
    getCreds(){
        const creds = window.localStorage.getItem("creds");
        if (creds) return JSON.parse(creds);
        else return {email:"",password:""};
    }
    rembr(){
        const creds = window.localStorage.getItem("creds");
        if (creds){
            if (JSON.parse(creds).email && JSON.parse(creds).password) return true;
            return false;
        }
    }
}

const tools = new Tools();
export default tools;