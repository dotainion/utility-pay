import React, { useEffect, useState } from 'react';
import { IonPage, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonCheckbox, IonList, IonThumbnail, IonImg, IonCard, IonCardSubtitle } from '@ionic/react';
import tools from '../components/Tools';
import './Login.css';
import './Main.css';
import LOGO from '../Images/nawasa.jpeg';
import { Creds, Security } from '../components/Security';
import { Widgets } from '../components/Widgets';


const Login: React.FC = () => { 
    const [creds, setCreds] = useState({email:"",password:"",remember:false});
    const [error, setError] = useState({msg:"",hide:true});
    const style = {marginLeft:"10px",marginRight:"10px"};
    const CREDS = new Creds();
    const SECURE = new Security();
    const Widget = new Widgets();

    const reset = () => setError({msg:"",hide:true});

    const checks = async (email:string,password:string) =>{
        if (CREDS.check(email)){
            const response = await SECURE.login(email,password);
            if (response.state){
                if (creds.remember) CREDS.save(email,password);
                tools.onIdClick("payment");
            }else setError({msg:response.message,hide:true});
        }else if (!email) setError({msg:"No email was provided",hide:false});
        else setError({msg:"Email is in incorrect format",hide:false});
    }

    return (
        <IonPage className="systemBackgrund">
            <IonHeader className="systemHeaderbackground">
                <IonToolbar>
                <IonTitle>Nawasa Payments</IonTitle>
                </IonToolbar>
            </IonHeader>
            
            <IonContent>
                <Widget.logo src={LOGO}/>
                <IonList className="loginMainContainer" style={{width:tools.isMobil("95%","")}}>
                    <IonItem lines="none">
                        <div className="loginTitleContainer">
                            <IonTitle class="loginTitle">NAWASA</IonTitle>
                            <IonTitle class="loginSubTitle">Login</IonTitle>
                        </div>
                    </IonItem>

                    <span hidden={!error.hide} className="loginErrorSpan">{error.msg}</span>
                    <IonItem id="login-email" class="loginItemStyle">
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput type="text" onIonChange={e=>{
                            if (e.detail.value) setCreds({
                                email:e.detail.value,password:creds.password,remember:creds.remember
                            });
                            reset();
                        }} value={creds.email}></IonInput>
                    </IonItem>
                    <div className="loginErrorContainer">
                        <span hidden={error.hide} className="loginErrorSpan">{error.msg}</span>
                    </div>

                    <IonItem id="login-password" class="loginItemStyle">
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput type="password" onIonChange={e=>{
                            if (e.detail.value) setCreds({
                                email:creds.email,password:e.detail.value,remember:creds.remember
                            });
                            reset();
                        }} value={creds.password}></IonInput>
                    </IonItem>

                    <div style={{marginTop:"20px",color:"navy"}}>
                        <IonCheckbox checked={creds.remember} onIonChange={e =>{
                            if (e.detail.value) setCreds({
                                email:creds.email,password:creds.password,remember:e.detail.checked
                            })
                        }}></IonCheckbox>
                        <IonLabel style={{paddingLeft:"5px"}}>Remember me</IonLabel>
                    </div>

                    <div style={{marginTop:"15px",color:"Crimson"}}>
                        <IonLabel class="loginUnderLine loginHover" onClick={()=>{

                        }}>Forgot credentials?</IonLabel>
                    </div>
                    
                    <IonItem class="loginCreatebuttonContainer" lines="none">
                        <IonLabel class="loginUnderLine loginHover" onClick={()=>{

                        }}>Create account</IonLabel>
                        <IonButton id="login-go" onClick={()=>{
                            checks(creds.email,creds.password);
                            tools.onIdClick("payment");
                        }}>Login</IonButton>
                    </IonItem>
                </IonList>
            </IonContent>
            <IonButton hidden id="payment" routerLink="/page/Payment" routerDirection="none"/>
        </IonPage>
    );
};

export default Login;