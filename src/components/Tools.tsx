import { isPlatform } from "@ionic/react";
import auth from "../Authentication/Authenticate";
import { globalVar } from "../Global/GlobalVar";

class OnClick{
    byId(ID:string){
        try{
            if (ID === "logout") auth.secure.logOut();
            else document.getElementById(ID)?.click();
        }catch(error){
            console.log("by trying to click id: "+ID+" an error accure =>",error);
        }
    }
    showMenu(){
        try{ document.getElementById(globalVar.id.showMenu)?.click();
        }catch(error){ console.log("Menu id dosent seem to exist =>",error);}
    }
    hideMenu(){
        try{ document.getElementById(globalVar.id.hidemenu)?.click();
        }catch(error){ console.log("Menu id dosent seem to exist =>",error);}
    }
    startLoader(){
        try{ document.getElementById("start-loader")?.click();
        }catch(error){ console.log("loader id dosent seem to exist =>",error);}
    }
    stopLoader(){
        try{ document.getElementById("stop-loader")?.click();
        }catch(error){ console.log("loader id dosent seem to exist =>",error);}
    }
}
class PageDirection{
    ifNotLogin(direction:string=globalVar.id.toLogin){
        if (!auth.secure.isLogin()){
            tools.onClick.byId(direction);
            window.localStorage.setItem("redirect-error",JSON.stringify(true));
        }
    }
    setRedirectState(state=false){
        window.localStorage.setItem("redirect-error",JSON.stringify(state));
    }
    didRedirect(){
        const is_redirect = window.localStorage.getItem("redirect-error");
        if (is_redirect && JSON.parse(is_redirect) === true) return true;
        else return false;
    }
    toLogin(){
        tools.onClick.byId(globalVar.id.toLogin);
    }
}
class Tools{
    onClick = new OnClick();
    redirect = new PageDirection();
    async toastMsg(msg:string,duration:number=3000,position:any="top",color:string="dark"){
        const toast = await document.createElement('ion-toast');
        toast.message = msg;
        toast.position = position;
        toast.duration = duration;
        toast.color = color;
    
        document.body.appendChild(toast);
        return toast.present();
    }
    async toastWithCmd(msg:string="",onClick:any=false,okayText:string="Yes",
            cancelText:string="No",header:string="Warning!!",color:string="light",position:any="top"){
        const toast = await document.createElement("ion-toast");
        toast.header = header;
        toast.message = msg;
        toast.position = position;
        toast.color = color;
        toast.buttons = [
            {
                //side: 'start',
                icon: 'star',
                text: okayText,
                handler: () => {
                    if (onClick){
                        onClick(true);
                    }
                }
            }, {
                role: 'cancel',
                text: cancelText,
                handler: () => {
                    if (onClick){
                        onClick(false);
                    }
                }
            }
        ];

        document.body.appendChild(toast);
        return toast.present();
    }
    platform(){
        if (!isPlatform("desktop")){
            if (isPlatform("mobile") || isPlatform("tablet") || isPlatform("ios")) return true;
            else return false;
        }else{
            if (window.innerWidth < 500) return true;
            else return false; 
        }
    }
    isMobil(returnTrue:any=true, returnFalse:any=false){
        if (this.platform()) return returnTrue;
        else return returnFalse;
    }
    compare(value:any,ref:any,returnIfTrue:any,returnIfFalse:any){
        if (value === ref){
            return returnIfTrue;
        }else{
            return returnIfFalse;
        }
    }
    date(data:any=new Date().toString()){
        var index = 0;var temp = "";var dates = [];
        for (var value of data){
            if (value !== " "){
                temp = temp + value;
            }else{
                index ++;
                dates.push(temp);
                temp = "";
                if (index === 4){break;}
            }
        }
        const date = dates[0]+"/"+dates[2]+"/"+dates[1]+"/"+dates[3]
        return {week:dates[0],month:dates[1],day:dates[2],year:dates[3],date:date};
    }
    inputValidation(itemsArray:any){
        var valid = true;
        for (var inputs of itemsArray){
            if (inputs[0] === ""){
                document.getElementById(inputs[1])!.style.border = "1px solid red";
                valid = false;
            }else{
                document.getElementById(inputs[1])!.style.border = "";
            }
        }
        return valid
    }

    inputValidationSet(reset:string,color="lightgray"){
        document.getElementById(reset)!.style.border = "1px solid "+color;
    }

    inputValidationReset(reset:string){
        document.getElementById(reset)!.style.border = "1px solid lightgray";
    }
    emailValidate(email:any){
        //check if email in valid format
        var validate = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (validate.test(email)){
            return true;
        }else{
            return false;
        }
    }
    credsConfirmValidation(validate:any){
        if (validate[0][0] === validate[1][0]){
            return true;
        }else{
            document.getElementById(validate[0][1])!.style.border = "1px solid orange";
            document.getElementById(validate[1][1])!.style.border = "1px solid orange";
        }
        return false;
    }

    passwordStrength(password:any){
        var result = 0;
        //check to see if password has 8 or more characters
        if (password.split("").length >= 8){
            result ++;
        }
        //check for Capital letters
        if (/[A-Z]/.test(password)){
            result ++;
        }
        //check for a Numeric value
        if (/\d/.test(password)){
            result ++;
        }
        //check if password has a Symbol character
        if (password.match(/[|\\/~^:,;?!&%$@#*+()]/)){
            result ++;
        }
            
        switch (result) {
            case 0:
                return {value:0.02,text:'Weak',color:"red"};
            case 1:
                return {value:1,text:'Weak',color:"red"};
            case 2:
                return {value:2,text:'Fair',color:"orange"};
            case 3:
                return {value:3,text:'Good',color:"blue"};
            case 4:
                return {value:4,text:'Strong',color:"green"};
            default:
                return {value:0,text:'Weak',color:"red"};
        }
    }

    texts(){
        return {
            APPNAME: "Nawasa Payments",//"Bill-Pay",
            fieldsRequired:"Feilds are required",
            passwordMatch:"Passwords dose not match",
            provideValidCreds:"Please provide valid credentials",
            recoverinfo:"A verification email will be sent to your email address. Please check your email account for your confirmation id after submiting this form.",
            recoververificationinfo:"Please enter the 5 digit code that was sent to your email address.",
            validEmail:"Email is invalid. Please double check email",
            resendverificationcode:{
                1:"To resend verification code click ",
                2:"here",
            },
            cartMsg:"Shipping cost will be calculated based on your shipping address.",
            userExist:"User already exist, try to login",
            passwordStrength:"Password must be above 50%.",
        }
    }
}

const tools= new Tools();
export default tools;
