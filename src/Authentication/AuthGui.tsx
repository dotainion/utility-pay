/*login register file*/
import { IonButton, IonCard, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './StyleSheet.css';
import userLogin from './Authenticate';
import Widgets from '../components/Widgets';
import LOGO from '../Images/nawasa.jpeg';
import tools from '../components/Tools';
import no_connection_img from '../Images/brokenRobot.png';

export const LoginRegister: React.FC = () =>{
    const [test, setTest] = useState("Try another way");
    const [internetConnection, setInternetConnection] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [LOGIN_INPUTS, SET_LOGIN_INPUTS] = useState({
        email:userLogin.getCreds().email,
        password:userLogin.getCreds().password,
        rembr:userLogin.rembr(),
    });
    const [REGISTER_INPUTS, SET_REGISTER_INPUT] = useState({
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
    });
    const [GUI_STATE, SET_GUI_STATE] = useState({
        login:true,
        register:false,
        recover:false,
    });
    const [IN_REGISTER_GUI_STATE, SET_IN_REGISTER_GUI_STATE] = useState({
        name:true,
        address:false,
        creds:false,
    });
    const login_id_obj = {
        email:"LOGIN-EMAIL",
        password:"LOGIN-PASSWORD",
    }
    const register_id_obj = {
        user:{
            firstname:"REGISTER-FIRST-NAME",
            lastname:"REGISTER-LAST-NAME",
            contact:"REGISTER-CONTACT",
        },
        area:{
            city:"REGISTER-CITY",
            state:"REGISTER-STATE",
            address:"REGISTER-ADDRESS",
        },
        creds:{
            email:"REGISTER-EMAIL",
            password:"REGISTER-PASSWORD",
            confirmpassord:"REGISTER-CONFIRM-PASSWORD",
        }
    }
    const [IN_RECOVER_GUI_STATE, SET_IN_RECOVER_GUI_STATE] = useState({
        enterEmail:true,
        enterVerification:false,
    })
    const [RECOVER_INPUTS, SET_RECOVER_INPUTS] = useState({
        email:"",
        validate:"",
    })
    const recover_id_obJ = {
        email:"RECOVER-EMAIL",
        validate:"RECOVER-VALIDATE",
    }
    const [resendCodeBtnText, setResendCodeBtnText] = useState("Send");

    const onLoginSubmit = (event:any) =>{
        setErrMsg(event.message);
        console.log(event)
        if (event.state === "no-connection"){
            console.log("no connections")
            setInternetConnection(true);
        }else{
            if (event.state){
                if (LOGIN_INPUTS.rembr) userLogin.saveCreds(LOGIN_INPUTS);
                tools.onClick.byId("payment");
                tools.onClick.showMenu();
            }
        }
    }
    const submitCall = async(cmd:string="login") =>{
        setErrMsg("");
        setSuccessMsg("");
        tools.onClick.startLoader();
        if (cmd == "login"){
            onLoginSubmit(await userLogin.login.check(LOGIN_INPUTS,login_id_obj));
            //place save to database codes here
        }else if (cmd === "register"){
            if (userLogin.checkEmailCrdsMatch(register_id_obj.creds,REGISTER_INPUTS.creds,(e:any)=>{
                setErrMsg(e.message);})){
                onLoginSubmit(await userLogin.register.check(REGISTER_INPUTS));
                //place save to database codes here
            }
        }else if (cmd === "recover"){
            console.log(RECOVER_INPUTS);
            setSuccessMsg("Sent");
            //place recover codes here
        }
        tools.onClick.stopLoader();
    }

    if (tools.redirect.didRedirect()){
        const toast_msg = "You must first login to visit services"
        tools.toastMsg(toast_msg,3000,"top","secondary");
        tools.redirect.setRedirectState()
    }

    return(
        <IonPage className="PAGE">
            <IonHeader className="HEADER">
                <IonToolbar class="HEADER-TITLE">
                    <IonTitle>NAWASA</IonTitle>
                </IonToolbar>
            </IonHeader>

            <Widgets.logo top="150px" left="22%" size="100px" src={LOGO}/>
            <Widgets.utilitySideInfo top="300px" left="22%"/>
            
            <IonContent>
                <Widgets.noConnection onRefresh={()=>{submitCall();setInternetConnection(false);}} 
                    isConnection={internetConnection} image={no_connection_img} onClose={()=>{setInternetConnection(false)}}/>
                <IonGrid hidden={internetConnection}>
                    <IonRow>
                        <IonCol size-md="4" offset-md="7">
                            <IonCard class="MAIN-CONTAINER">
                                <IonItem lines="none">
                                    <IonList className="TITLE-CONTAINER">
                                        <IonTitle class="MAIN-TITLE">NAWASA</IonTitle>
                                        <IonTitle class="SUB-TITLE">Login</IonTitle>
                                    </IonList>
                                </IonItem>

                                <IonList class="ERROR-CONTAINER">
                                    <IonLabel>{errMsg}</IonLabel>
                                    <IonLabel class="SUCCESS-MSG">{successMsg}</IonLabel>
                                </IonList>

                                <IonLabel class="TRY-ANOTHER-WAY-TO-LOGIN HOVER" onClick={()=>{
                                    setTest("Not currently available")
                                }}>{test}</IonLabel>

                                {/*login gui*/}
                                <IonList class="SUB-CONTAINER">
                                    <IonList hidden={!GUI_STATE.login}>
                                        <IonItem id={login_id_obj.email} class="INPUT-IONITEM" lines="none">
                                            <IonLabel position="floating">Email</IonLabel>
                                            <IonInput type="email" onIonChange={(e)=>{
                                                SET_LOGIN_INPUTS({
                                                    email:e.detail.value,
                                                    password:LOGIN_INPUTS.password,
                                                    rembr:LOGIN_INPUTS.rembr,
                                                })
                                                userLogin.errReset(login_id_obj.email);
                                            }} value={LOGIN_INPUTS.email}/>
                                        </IonItem>
                                        <IonItem id={login_id_obj.password} class="INPUT-IONITEM" lines="none">
                                            <IonLabel position="floating">Password</IonLabel>
                                            <IonInput type="password" onIonChange={(e)=>{
                                                SET_LOGIN_INPUTS({
                                                    email:LOGIN_INPUTS.email,
                                                    password:e.detail.value,
                                                    rembr:LOGIN_INPUTS.rembr,
                                                })
                                                userLogin.errReset(login_id_obj.password);
                                            }} value={LOGIN_INPUTS.password}/>
                                        </IonItem>

                                        <IonItem class="CHECK-BUTTON-CONTAINER" lines="none">
                                            <IonCheckbox checked={LOGIN_INPUTS.rembr} onIonChange={e =>{
                                                SET_LOGIN_INPUTS({
                                                    email:LOGIN_INPUTS.email,
                                                    password:LOGIN_INPUTS.password,
                                                    rembr:e.detail.checked,
                                                })
                                            }}></IonCheckbox>
                                            <IonLabel class="CHECK-BUTTON-LABEL">Remember me</IonLabel>
                                        </IonItem>

                                        <IonItem className="FORGET-CREDS-BUTTON" lines="none">
                                            <IonLabel class="HOVER" onClick={()=>{
                                                SET_GUI_STATE({
                                                    login:false,
                                                    register:false,
                                                    recover:true,
                                                })
                                            }}>Forgot credentials?</IonLabel>
                                        </IonItem>

                                        <IonItem className="ACCOUNT-ACTION-BUTTON-LOGIN-CONTAINE" lines="none">
                                            <IonLabel class="HOVER" slot="start" onClick={()=>{
                                                SET_GUI_STATE({
                                                    login:false,
                                                    register:true,
                                                    recover:false,
                                                })
                                            }}>Create account</IonLabel>
                                            <IonButton slot="end" onClick={async()=>{
                                                submitCall("login");
                                            }}>Login</IonButton>
                                        </IonItem>
                                    </IonList>



                                    {/*register gui*/}
                                    <IonList hidden={!GUI_STATE.register}>
                                        {/*register name gui*/}
                                        <IonList hidden={!IN_REGISTER_GUI_STATE.name}>
                                            <IonItem id={register_id_obj.user.firstname} class="INPUT-IONITEM" lines="none">
                                                <IonLabel position="floating">First Name</IonLabel>
                                                <IonInput type="text" onIonChange={(e)=>{
                                                    SET_REGISTER_INPUT({
                                                        user:{
                                                            firstname:e.detail.value || "",
                                                            lastname:REGISTER_INPUTS.user.lastname,
                                                            contact:REGISTER_INPUTS.user.contact,
                                                        },
                                                        area:{
                                                            city:REGISTER_INPUTS.area.city,
                                                            state:REGISTER_INPUTS.area.state,
                                                            address:REGISTER_INPUTS.area.address,
                                                        },
                                                        creds:{
                                                            email:REGISTER_INPUTS.creds.email,
                                                            password:REGISTER_INPUTS.creds.password,
                                                            confirmpassord:REGISTER_INPUTS.creds.confirmpassord,
                                                        }
                                                    });
                                                    userLogin.errReset(register_id_obj.user.firstname);
                                                }} value={REGISTER_INPUTS.user.firstname}/>
                                            </IonItem>
                                            <IonItem id={register_id_obj.user.lastname} class="INPUT-IONITEM" lines="none">
                                                <IonLabel position="floating">Last Name</IonLabel>
                                                <IonInput type="text" onIonChange={(e)=>{
                                                    SET_REGISTER_INPUT({
                                                        user:{
                                                            firstname:REGISTER_INPUTS.user.firstname,
                                                            lastname:e.detail.value || "",
                                                            contact:REGISTER_INPUTS.user.contact,
                                                        },
                                                        area:{
                                                            city:REGISTER_INPUTS.area.city,
                                                            state:REGISTER_INPUTS.area.state,
                                                            address:REGISTER_INPUTS.area.address,
                                                        },
                                                        creds:{
                                                            email:REGISTER_INPUTS.creds.email,
                                                            password:REGISTER_INPUTS.creds.password,
                                                            confirmpassord:REGISTER_INPUTS.creds.confirmpassord,
                                                        }
                                                    });
                                                    userLogin.errReset(register_id_obj.user.lastname);
                                                }} value={REGISTER_INPUTS.user.lastname}/>
                                            </IonItem>
                                            <IonItem id={register_id_obj.user.contact} class="INPUT-IONITEM" lines="none">
                                                <IonLabel position="floating">Phone number</IonLabel>
                                                <IonInput type="number" onIonChange={(e)=>{
                                                    SET_REGISTER_INPUT({
                                                        user:{
                                                            firstname:REGISTER_INPUTS.user.firstname,
                                                            lastname:REGISTER_INPUTS.user.lastname,
                                                            contact:e.detail.value || "",
                                                        },
                                                        area:{
                                                            city:REGISTER_INPUTS.area.city,
                                                            state:REGISTER_INPUTS.area.state,
                                                            address:REGISTER_INPUTS.area.address,
                                                        },
                                                        creds:{
                                                            email:REGISTER_INPUTS.creds.email,
                                                            password:REGISTER_INPUTS.creds.password,
                                                            confirmpassord:REGISTER_INPUTS.creds.confirmpassord,
                                                        }
                                                    });
                                                    userLogin.errReset(register_id_obj.user.contact);
                                                }} value={REGISTER_INPUTS.user.contact}/>
                                            </IonItem>
                                            <IonItem className="ACCOUNT-ACTION-BUTTON-REGISTER-CONTAINER" lines="none">
                                                <IonLabel class="HOVER" slot="start" onClick={()=>{
                                                    SET_GUI_STATE({
                                                        login:true,
                                                        register:false,
                                                        recover:false,
                                                    })
                                                }}>Go back</IonLabel>
                                                <IonButton slot="end" onClick={async()=>{
                                                    if (userLogin.errCheck(register_id_obj.user,REGISTER_INPUTS.user)){
                                                        SET_IN_REGISTER_GUI_STATE({
                                                            name:false,
                                                            address:true,
                                                            creds:false,
                                                        })
                                                    }
                                                }}>Next</IonButton>
                                            </IonItem>
                                        </IonList>

                                        {/*register address `gui*/}
                                        <IonList hidden={!IN_REGISTER_GUI_STATE.address}>
                                            <IonItem id={register_id_obj.area.city} class="INPUT-IONITEM" lines="none">
                                                <IonLabel position="floating">City</IonLabel>
                                                <IonInput type="text" onIonChange={(e)=>{
                                                    SET_REGISTER_INPUT({
                                                        user:{
                                                            firstname:REGISTER_INPUTS.user.firstname,
                                                            lastname:REGISTER_INPUTS.user.lastname,
                                                            contact:REGISTER_INPUTS.user.contact,
                                                        },
                                                        area:{
                                                            city:e.detail.value || "",
                                                            state:REGISTER_INPUTS.area.state,
                                                            address:REGISTER_INPUTS.area.address,
                                                        },
                                                        creds:{
                                                            email:REGISTER_INPUTS.creds.email,
                                                            password:REGISTER_INPUTS.creds.password,
                                                            confirmpassord:REGISTER_INPUTS.creds.confirmpassord,
                                                        }
                                                    });
                                                    userLogin.errReset(register_id_obj.area.city);
                                                }} value={REGISTER_INPUTS.area.city}/>
                                            </IonItem>
                                            <IonItem id={register_id_obj.area.state} class="INPUT-IONITEM" lines="none">
                                                <IonLabel position="floating">State</IonLabel>
                                                <IonInput type="text" onIonChange={(e)=>{
                                                    SET_REGISTER_INPUT({
                                                        user:{
                                                            firstname:REGISTER_INPUTS.user.firstname,
                                                            lastname:REGISTER_INPUTS.user.lastname,
                                                            contact:REGISTER_INPUTS.user.contact,
                                                        },
                                                        area:{
                                                            city:REGISTER_INPUTS.area.city,
                                                            state:e.detail.value || "",
                                                            address:REGISTER_INPUTS.area.address,
                                                        },
                                                        creds:{
                                                            email:REGISTER_INPUTS.creds.email,
                                                            password:REGISTER_INPUTS.creds.password,
                                                            confirmpassord:REGISTER_INPUTS.creds.confirmpassord,
                                                        }
                                                    });
                                                    userLogin.errReset(register_id_obj.area.state);
                                                }} value={REGISTER_INPUTS.area.state}/>
                                            </IonItem>
                                            <IonItem id={register_id_obj.area.address} class="INPUT-IONITEM" lines="none">
                                                <IonLabel position="floating">Address</IonLabel>
                                                <IonInput type="text" onIonChange={(e)=>{
                                                    SET_REGISTER_INPUT({
                                                        user:{
                                                            firstname:REGISTER_INPUTS.user.firstname,
                                                            lastname:REGISTER_INPUTS.user.lastname,
                                                            contact:REGISTER_INPUTS.user.contact,
                                                        },
                                                        area:{
                                                            city:REGISTER_INPUTS.area.city,
                                                            state:REGISTER_INPUTS.area.state,
                                                            address:e.detail.value || "",
                                                        },
                                                        creds:{
                                                            email:REGISTER_INPUTS.creds.email,
                                                            password:REGISTER_INPUTS.creds.password,
                                                            confirmpassord:REGISTER_INPUTS.creds.confirmpassord,
                                                        }
                                                    });
                                                    userLogin.errReset(register_id_obj.area.address);
                                                }} value={REGISTER_INPUTS.area.address}/>
                                            </IonItem>
                                            <IonItem className="ACCOUNT-ACTION-BUTTON-REGISTER-CONTAINER" lines="none">
                                                <IonLabel class="HOVER" slot="start" onClick={()=>{
                                                    SET_IN_REGISTER_GUI_STATE({
                                                        name:true,
                                                        address:false,
                                                        creds:false,
                                                    });
                                                }}>Go back</IonLabel>
                                                <IonButton slot="end" onClick={async()=>{
                                                    if (userLogin.errCheck(register_id_obj.area,REGISTER_INPUTS.area)){
                                                        SET_IN_REGISTER_GUI_STATE({
                                                            name:false,
                                                            address:false,
                                                            creds:true,
                                                        });
                                                    }
                                                }}>Next</IonButton>
                                            </IonItem>
                                        </IonList>

                                        {/*register address `gui*/}
                                        <IonList hidden={!IN_REGISTER_GUI_STATE.creds}>
                                            <IonItem id={register_id_obj.creds.email} class="INPUT-IONITEM" lines="none">
                                                <IonLabel position="floating">Email</IonLabel>
                                                <IonInput type="email" onIonChange={(e)=>{
                                                    SET_REGISTER_INPUT({
                                                        user:{
                                                            firstname:REGISTER_INPUTS.user.firstname,
                                                            lastname:REGISTER_INPUTS.user.lastname,
                                                            contact:REGISTER_INPUTS.user.contact,
                                                        },
                                                        area:{
                                                            city:REGISTER_INPUTS.area.city,
                                                            state:REGISTER_INPUTS.area.state,
                                                            address:REGISTER_INPUTS.area.address,
                                                        },
                                                        creds:{
                                                            email:e.detail.value || "",
                                                            password:REGISTER_INPUTS.creds.password,
                                                            confirmpassord:REGISTER_INPUTS.creds.confirmpassord,
                                                        }
                                                    });
                                                    userLogin.errReset(register_id_obj.creds.email);
                                                }} value={REGISTER_INPUTS.creds.email}/>
                                            </IonItem>
                                            <IonItem id={register_id_obj.creds.password} class="INPUT-IONITEM" lines="none">
                                                <IonLabel position="floating">Password</IonLabel>
                                                <IonInput type="password" onIonChange={(e)=>{
                                                    SET_REGISTER_INPUT({
                                                        user:{
                                                            firstname:REGISTER_INPUTS.user.firstname,
                                                            lastname:REGISTER_INPUTS.user.lastname,
                                                            contact:REGISTER_INPUTS.user.contact,
                                                        },
                                                        area:{
                                                            city:REGISTER_INPUTS.area.city,
                                                            state:REGISTER_INPUTS.area.state,
                                                            address:REGISTER_INPUTS.area.address,
                                                        },
                                                        creds:{
                                                            email:REGISTER_INPUTS.creds.email,
                                                            password:e.detail.value || "",
                                                            confirmpassord:REGISTER_INPUTS.creds.confirmpassord,
                                                        }
                                                    });
                                                    userLogin.errReset(register_id_obj.creds.password);
                                                }} value={REGISTER_INPUTS.creds.password}/>
                                            </IonItem>
                                            <IonItem id={register_id_obj.creds.confirmpassord} class="INPUT-IONITEM" lines="none">
                                                <IonLabel position="floating">Confirm Password</IonLabel>
                                                <IonInput type="password" onIonChange={(e)=>{
                                                    SET_REGISTER_INPUT({
                                                        user:{
                                                            firstname:REGISTER_INPUTS.user.firstname,
                                                            lastname:REGISTER_INPUTS.user.lastname,
                                                            contact:REGISTER_INPUTS.user.contact,
                                                        },
                                                        area:{
                                                            city:REGISTER_INPUTS.area.city,
                                                            state:REGISTER_INPUTS.area.state,
                                                            address:REGISTER_INPUTS.area.address,
                                                        },
                                                        creds:{
                                                            email:REGISTER_INPUTS.creds.email,
                                                            password:REGISTER_INPUTS.creds.password,
                                                            confirmpassord:e.detail.value || "",
                                                        }
                                                    });
                                                    userLogin.errReset(register_id_obj.creds.confirmpassord);
                                                }} value={REGISTER_INPUTS.creds.confirmpassord}/>
                                            </IonItem>
                                            <IonItem className="ACCOUNT-ACTION-BUTTON-REGISTER-CONTAINER" lines="none">
                                                <IonLabel class="HOVER" slot="start" onClick={()=>{
                                                    SET_IN_REGISTER_GUI_STATE({
                                                        name:false,
                                                        address:true,
                                                        creds:false,
                                                    });
                                                }}>Go back</IonLabel>
                                                <IonButton slot="end" onClick={async()=>{
                                                    submitCall("register");
                                                }}>Send</IonButton>
                                            </IonItem>
                                        </IonList>
                                    </IonList>

                                    {/*recover gui*/} 
                                    <IonList hidden={!GUI_STATE.recover}>
                                        <IonList hidden={!IN_RECOVER_GUI_STATE.enterEmail}>
                                            <IonItem className="RECOVER-VERIFICATION-INFO-TEXT" lines="none">
                                                <p>Enter your email and a verificaion will be sent to you, so your account will be recovered.</p>
                                            </IonItem>
                                            
                                            <IonItem id={recover_id_obJ.email} class="INPUT-IONITEM" lines="none">
                                                <IonLabel position="floating">Email address</IonLabel>
                                                <IonInput type="email" onIonChange={e=>{
                                                    SET_RECOVER_INPUTS({
                                                        email:e.detail.value || "",
                                                        validate:RECOVER_INPUTS.validate,
                                                    })
                                                    userLogin.errReset(recover_id_obJ.email)
                                                }} value={RECOVER_INPUTS.email}></IonInput>
                                            </IonItem>
                                            
                                            <IonItem style={{marginTop:"50px",color:"navy"}} lines="none">
                                                <IonButton slot="end" style={{cursor:"pointer"}} onClick={()=>{
                                                    const results = userLogin.isEmailValidWidthError(RECOVER_INPUTS.email,recover_id_obJ.email);
                                                    setErrMsg(results.message);
                                                    if (results.state){
                                                        SET_IN_RECOVER_GUI_STATE({
                                                            enterEmail:false,
                                                            enterVerification:true,
                                                        })
                                                    }else setSuccessMsg("");
                                                }}>Next</IonButton>
                                            </IonItem>
                                        </IonList>

                                        <IonList hidden={!IN_RECOVER_GUI_STATE.enterVerification}>
                                            <IonItem id={recover_id_obJ.validate}class="INPUT-IONITEM" lines="none">
                                                <IonLabel position="floating">Validation goes here</IonLabel>
                                                <IonInput type="text" onIonChange={e=>{
                                                    SET_RECOVER_INPUTS({
                                                        email:RECOVER_INPUTS.email,
                                                        validate:e.detail.value || "",
                                                    })
                                                    userLogin.errReset(recover_id_obJ.validate)
                                                }} value={RECOVER_INPUTS.validate}></IonInput>
                                            </IonItem>

                                                <p className="RECOVER-VERIFICATION-INFO-TEXT-SUBMIT">
                                                    <span>{"Check your mail box after submitting varification code."}</span>
                                                </p>

                                            <IonItem style={{marginTop:"50px",color:"navy"}} lines="none">
                                                <span>
                                                    <IonLabel class="underLine" onClick={()=>{
                                                        SET_IN_RECOVER_GUI_STATE({
                                                            enterEmail:true,
                                                            enterVerification:false,
                                                        })
                                                    }}>Back</IonLabel>
                                                </span>
                                                <IonButton slot="end" onClick={()=>{
                                                    if (userLogin.errCheck(recover_id_obJ,RECOVER_INPUTS)){
                                                        setResendCodeBtnText("Resend");
                                                        submitCall ("recover");
                                                    }else{
                                                        setErrMsg("Please provide a Verification code.");
                                                    }
                                                }}>{resendCodeBtnText}</IonButton>
                                            </IonItem>
                                        </IonList>
                                        
                                        <IonItem class="RECOVER-BACK-TO-LOGIN" lines="none">
                                            <span>
                                                <IonLabel class="HOVER" onClick={()=>{
                                                    SET_GUI_STATE({
                                                        login:true,
                                                        register:false,
                                                        recover:false,
                                                    })
                                                }}>Back to login</IonLabel>
                                            </span> 
                                        </IonItem>
                                    </IonList>
                                </IonList>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
            <IonButton hidden id="payment" routerDirection="none" routerLink="/page/Payment"/>
        </IonPage>
    )
}

export default LoginRegister;