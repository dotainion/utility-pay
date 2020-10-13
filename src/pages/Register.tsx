import React, { useState } from 'react';
import { IonPage, IonItem, IonLabel, IonInput, IonContent, IonToolbar, IonTitle, IonButton, IonHeader, IonList, IonCheckbox, IonRouterLink } from '@ionic/react';
import { Widgets } from '../components/Widgets';
import tools from '../components/Tools';
import './Register.css';
import './Main.css';
import { Creds, Security } from '../components/Security';
import LOGO from '../Images/nawasa.jpeg';


const Register: React.FC = () =>{
    const CREDS = new Creds();
    const Widget = new Widgets();
    const SECURE = new Security();

    var MARGIN = tools.isMobil("2%","35%")

    const [firstPage, setFirstPage] = useState(true);
    const [secondPage, setSecondPage] = useState(false);
    const [thirdPage, setThirdPage] = useState(false);
    const [rememberChecked, setRememberChecked] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [passwordMatchErrorText, setPasswordMatchErrorText] = useState("");
    const [progressCreds, setProgressCreds] = useState("");
    const [customer, setCustomer] = useState({
        firstname:"",
        lastname:"",
        email:"",
        contact:"",
        city:"",
        stateaddress:"",
        address:"",
        password:"",
        confirmpassword:"",
        shippingaddress:"",
    });

    
    async function server(){
        setErrorText("");
        tools.onIdClick("start-loader");
        const response = await SECURE.register(customer.email,customer.password);
        if (response.state === true){
            if (rememberChecked){
                CREDS.save(customer.email,customer.password);
            }
            tools.onIdClick("payment");
            tools.onIdClick("show-menu");
        }else{
            setErrorText(response.message);
        }
        tools.onIdClick("stop-loader");
    }

    const matchWhileTyping = (value:any, reference:any) =>{
        if (value !== reference){
            tools.inputValidationSet("register-confirmpassword","orange")
            setPasswordMatchErrorText(tools.texts().passwordMatch);
        }else{
            setPasswordMatchErrorText("");
            tools.inputValidationReset("register-confirmpassword");
        };
        tools.inputValidationReset("register-password");
    }    

    return(
        <IonPage className="systemBackgrund">
            <Widget.loadSpinner/>
            
            <Widget.prospectHeader/>

            <Widget.utilitySideInfo left="-20%"/>

            <IonContent>
                <Widget.logo src={LOGO}/>
                <IonItem lines="none">
                    <p style={{textAlign:"center",color:"red",width:"100%"}}>{errorText}</p>
                </IonItem>
                <IonList class="registerMainContainer" style={{marginLeft:MARGIN,marginRight:MARGIN,border:tools.isMobil("1px solid lightgray","")}}>

                    {/*this is the first page*/}
                    <div hidden={!firstPage} id="register-firstpage">
                        <IonItem id="register-firstname" class="registerItemStyle">
                            <IonLabel position="floating">First name</IonLabel>
                            <IonInput onIonChange={e=>{
                                if (e.detail.value){
                                    setCustomer({firstname:e.detail.value,lastname:customer.lastname,email:customer.email,
                                    contact:customer.contact,city:customer.city,stateaddress:customer.stateaddress,address:customer.address,
                                    password:customer.password,confirmpassword:customer.confirmpassword,shippingaddress:customer.shippingaddress,});
                                    tools.inputValidationReset("register-firstname"); 
                                }
                            }} type="text" value={customer.firstname}/>
                        </IonItem>
                        <IonItem id="register-lastname" class="registerItemStyle">
                            <IonLabel position="floating">Last name</IonLabel>
                            <IonInput onIonChange={e=>{
                                if (e.detail.value){
                                    setCustomer({firstname:customer.firstname,lastname:e.detail.value,email:customer.email,
                                        contact:customer.contact,city:customer.city,stateaddress:customer.stateaddress,address:customer.address,
                                        password:customer.password,confirmpassword:customer.confirmpassword,shippingaddress:customer.shippingaddress,});
                                    tools.inputValidationReset("register-lastname");
                                }
                            }} type="text" value={customer.lastname}/>
                        </IonItem>

                        <IonItem id="register-email" class="registerItemStyle">
                            <IonLabel position="floating">Email Address</IonLabel>
                            <IonInput onIonChange={e=>{
                                if (e.detail.value){
                                    setCustomer({firstname:customer.firstname,lastname:customer.lastname,email:e.detail.value,
                                        contact:customer.contact,city:customer.city,stateaddress:customer.stateaddress,address:customer.address,
                                        password:customer.password,confirmpassword:customer.confirmpassword,shippingaddress:customer.shippingaddress,});
                                    tools.inputValidationReset("register-email");
                                }
                            }} type="email" value={customer.email}/>
                        </IonItem>
                        <IonItem id="register-contact" class="registerItemStyle">
                            <IonLabel position="floating">Phone Number</IonLabel>
                            <IonInput onIonChange={e=>{
                                if (e.detail.value){
                                    setCustomer({firstname:customer.firstname,lastname:customer.lastname,email:customer.email,
                                        contact:e.detail.value,city:customer.city,stateaddress:customer.stateaddress,address:customer.address,
                                        password:customer.password,confirmpassword:customer.confirmpassword,shippingaddress:customer.shippingaddress,});
                                    tools.inputValidationReset("register-contact");
                                }
                            }} type="number" value={customer.contact}/>
                        </IonItem>
                        <IonItem style={{color:"navy"}} lines="none">
                            <IonRouterLink routerLink="/login" routerDirection="none">
                                <IonLabel style={{marginLeft:"2px"}} class="underLine">Sign in instead</IonLabel>
                            </IonRouterLink>
                            <IonButton slot="end" id="firstPage-go" style={{cursor:"pointer"}} onClick={()=>{
                                var validate = [
                                    [customer.firstname,"register-firstname"],
                                    [customer.lastname,"register-lastname"],
                                    [customer.email,"register-email"],
                                    [customer.contact,"register-contact"],
                                ]
                                if (tools.inputValidation(validate)){
                                    if (tools.emailValidate(customer.email)){
                                        setFirstPage(false);
                                        setSecondPage(true);
                                        setThirdPage(false);
                                        setErrorText("");
                                    }else{
                                        tools.inputValidation([["","register-email"]]);
                                        setErrorText(tools.texts().validEmail);
                                    }
                                }
                            }}>Next</IonButton>
                        </IonItem>
                    </div>

                    {/*this is the second page*/}
                    <div hidden={!secondPage}>
                        <IonItem id="register-city" class="registerItemStyle">
                            <IonLabel position="floating">City</IonLabel>
                            <IonInput onIonChange={e=>{
                                if (e.detail.value){
                                    setCustomer({firstname:customer.firstname,lastname:customer.lastname,email:customer.email,
                                        contact:customer.contact,city:e.detail.value,stateaddress:customer.stateaddress,address:customer.address,
                                        password:customer.password,confirmpassword:customer.confirmpassword,shippingaddress:customer.shippingaddress,});
                                    tools.inputValidationReset("register-city");
                                }
                            }} type="text" value={customer.city}/>
                        </IonItem>
                        <IonItem id="register-stateaddress" class="registerItemStyle">
                            <IonLabel position="floating">State</IonLabel>
                            <IonInput onIonChange={e=>{
                                if (e.detail.value){
                                    setCustomer({firstname:customer.firstname,lastname:customer.lastname,email:customer.email,
                                        contact:customer.contact,city:customer.city,stateaddress:e.detail.value,address:customer.address,
                                        password:customer.password,confirmpassword:customer.confirmpassword,shippingaddress:customer.shippingaddress,});
                                    tools.inputValidationReset("register-stateaddress");
                                }
                            }} type="text" value={customer.stateaddress}/>
                        </IonItem>

                        <IonItem id="register-address" class="registerItemStyle">
                            <IonLabel position="floating">Home address</IonLabel>
                            <IonInput onIonChange={e=>{
                                if (e.detail.value){
                                    setCustomer({firstname:customer.firstname,lastname:customer.lastname,email:customer.email,
                                        contact:customer.contact,city:customer.city,stateaddress:customer.stateaddress,address:e.detail.value,
                                        password:customer.password,confirmpassword:customer.confirmpassword,shippingaddress:customer.shippingaddress,});
                                    tools.inputValidationReset("register-address");
                                }
                            }} type="text" value={customer.address}/>
                        </IonItem>
                        <IonItem id="register-shippingaddress" class="registerItemStyle">
                            <IonLabel position="floating">Shipping address 
                                <span style={{fontSize:"11px",marginLeft:"5px",color:"teal"}}>
                                    Optional</span></IonLabel>
                            <IonInput onIonChange={e=>{
                                if (e.detail.value){
                                    setCustomer({firstname:customer.firstname,lastname:customer.lastname,email:customer.email,
                                        contact:customer.contact,city:customer.city,stateaddress:customer.stateaddress,address:customer.address,
                                        password:customer.password,confirmpassword:customer.confirmpassword,shippingaddress:e.detail.value,});
                                    tools.inputValidationReset("register-shippingaddress");
                                }
                            }} type="text" value={customer.shippingaddress}/>
                        </IonItem>
                        <IonItem style={{color:"blue"}} lines="none">
                            <IonLabel class="underLine" onClick={()=>{
                                setFirstPage(true);
                                setSecondPage(false);
                                setThirdPage(false);
                            }}>Back</IonLabel>
                            <IonButton id="secondPage-go" style={{cursor:"pointer"}} onClick={()=>{
                                var validate = [
                                    [customer.city,"register-city"],
                                    [customer.stateaddress,"register-stateaddress"],
                                    [customer.address,"register-address"],
                                    //[this.registration.shippingaddress,"register-shippingaddress"],
                                ]
                                if (tools.inputValidation(validate)){
                                    setFirstPage(false);
                                    setSecondPage(false);
                                    setThirdPage(true);
                                    setErrorText("");
                                };
                            }}>Next</IonButton>
                        </IonItem>
                    </div>

                    {/*this is the third page*/}
                    <div hidden={!thirdPage}>
                        <Widget.passwordProgressBar max={4} creds={progressCreds} mTop="22.3%"/>
                        <IonItem id="register-password" class="registerItemStyle">
                            <IonLabel position="floating">Password</IonLabel>
                            <IonInput onIonChange={e=>{
                                if (e.detail.value){
                                    setCustomer({firstname:customer.firstname,lastname:customer.lastname,email:customer.email,
                                        contact:customer.contact,city:customer.city,stateaddress:customer.stateaddress,address:customer.address,
                                        password:e.detail.value,confirmpassword:customer.confirmpassword,shippingaddress:customer.shippingaddress,});
                                    tools.inputValidationReset("register-password");
                                    matchWhileTyping(e.detail.value, customer.confirmpassword);
                                    setProgressCreds(e.detail.value);
                                }
                            }} type="password" value={customer.password}/>
                        </IonItem>
                        <div style={{color:"red",fontSize:"12px"}}>
                            <IonLabel>{passwordMatchErrorText}</IonLabel>
                        </div>
                        <IonItem id="register-confirmpassword" class="registerItemStyle">
                            <IonLabel position="floating">Confirm password</IonLabel>
                            <IonInput onIonChange={e=>{
                                if (e.detail.value){
                                    setCustomer({firstname:customer.firstname,lastname:customer.lastname,email:customer.email,
                                        contact:customer.contact,city:customer.city,stateaddress:customer.stateaddress,address:customer.address,
                                        password:customer.password,confirmpassword:e.detail.value,shippingaddress:customer.shippingaddress,});
                                    matchWhileTyping(customer.password,e.detail.value);
                                }
                            }} type="password" value={customer.confirmpassword}/>
                        </IonItem>
                        <div style={{marginTop:"20px",color:"navy",marginBottom:"19%"}}>
                            <IonCheckbox checked={rememberChecked} onIonChange={e =>{
                                setRememberChecked(e.detail.checked);
                            }}></IonCheckbox>
                            <IonLabel>Remember me</IonLabel>
                        </div>
                        <IonItem style={{color:"blue"}} lines="none">
                            <IonLabel class="underLine" onClick={()=>{
                                setFirstPage(false);
                                setSecondPage(true);
                                setThirdPage(false);
                            }}>Back</IonLabel>
                            <IonButton id="thirdPage-go" style={{cursor:"pointer"}} onClick={()=>{
                                var validate = [
                                    [customer.password,"register-password"],
                                    [customer.confirmpassword,"register-confirmpassword"]
                                ]
                                if (tools.inputValidation(validate)){
                                    if (tools.credsConfirmValidation(validate)){
                                        if (tools.passwordStrength(customer.password).value >= 3){
                                            server();
                                        }else{
                                            tools.inputValidation([
                                                ["","register-password"],
                                                ["","register-confirmpassword"]
                                            ])
                                            setErrorText(tools.texts().passwordStrength);
                                        }
                                    }else{
                                        setErrorText(tools.texts().passwordMatch);
                                    };
                                }else{
                                    setErrorText(tools.texts().fieldsRequired);
                                };
                            }}>Finish</IonButton>
                        </IonItem>
                    </div>
                </IonList>
            </IonContent>
            <IonButton hidden id="payment" routerLink="/page/Payment" routerDirection="none"/>
        </IonPage>
    )
}


export default Register;
