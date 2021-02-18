import { IonCard, IonCol, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './Payment.css';
import '../Main/Main.css';
import { pay } from '../components/CardPay';
import tools from '../components/Tools';
import Widgets from '../components/Widgets';
import LOGO from '../Images/nawasa.jpeg';
import auth from '../Authentication/Authenticate';
import { appPages } from '../components/Config';


const Payment = (data:any) => {
    const [customer, setCustomer] = useState({bank:"",type:"",acount:"",email:auth.getCreds().email,amount:""});
    let HIDDEN = true;
    if (data.onOpen === appPages.payment().title) HIDDEN = false;
    const asterisks = <span style={{color:"red"}}>*</span>;
    const BANKS_LIST = ["RBTT Bank","CBIC Bank","Republic Bank","Co-Operative"];
    const SERVICE_TYPE = ["residential","commercial","other"];
    
    const customerChecks = () =>{
        let STATE = true;
        let msg = "";
        const starts = "Your ";
        const ends = " either not entered or was entered incorrectly.";
        let index = 0;
        const msgHandler = (text:string, finalize:boolean=false) =>{
            if (!finalize){
                STATE = false;
                index ++;
                if (index === 1) msg = msg + text;
                else msg = msg + ", " + text;
                return msg;
            }else{
                if (text === "Invalid email address") return msg;
                else return starts + msg + ends;
            }
        }
        const amount = parseFloat(customer.amount);
        if (!customer.bank) msgHandler("bank name");
        if (!customer.type) msgHandler("utility type");
        if (!customer.acount)  msgHandler("utility account");
        if (isNaN(amount) || amount <= 0) msgHandler("payment cost");
        if (!tools.emailValidate(customer.email)) msgHandler("Invalid email address");

        if (STATE){
            return STATE;
        }else{
            tools.toastMsg(msgHandler(msg,true),4000,"top","secondary");
        }
    }

    return (
        <IonList hidden={HIDDEN}>

            <Widgets.logo top="150px" left="50%" size="100px" src={LOGO}/>
            <Widgets.utilitySideInfo top="300px" left="50%"/>

            <IonGrid>
                <IonRow>
                    <IonCol size-md="4" offset-md="0">
                        <IonList class="mainContainer">
                            <IonHeader class="paymentHeader" className="systemHeaderbackground">
                                <IonToolbar>
                                    <IonTitle className="headerTitle">Payment</IonTitle>
                                </IonToolbar>
                            </IonHeader>

                            <div className="paymentDateAndDue">
                                <IonLabel>Date: {tools.date().date}</IonLabel>
                            </div>
                            <div className="paymentDateAndDue">
                                <IonLabel>Amount Due ${0.00}</IonLabel>
                            </div>

                            <IonList class="mainSubContainer">
                                    <IonItem className="paymentLableStyle" class="paymentItems" lines="none">
                                        <span>Bank Name{asterisks}</span>
                                        <IonSelect slot="end" placeholder="Choose" interface="popover" onIonChange={(e)=>{
                                            setCustomer({
                                                bank:e.detail.value,type:customer.type,acount:customer.acount,
                                                email:customer.email,amount:customer.amount
                                            });}} value={customer.bank}>
                                            {BANKS_LIST.map((item:any,key:number)=>{return(
                                                <IonSelectOption key={key}>{item}</IonSelectOption>
                                            )})}
                                        </IonSelect>
                                    </IonItem>
                                    <IonItem className="paymentLableStyle" class="paymentItems" lines="none">
                                        <span>Service{asterisks}</span>
                                        <IonSelect slot="end" placeholder="Choose" interface="popover" onIonChange={(e)=>{
                                            setCustomer({
                                                bank:customer.bank,type:e.detail.value,acount:customer.acount,
                                                email:customer.email,amount:customer.amount
                                            });}} value={customer.type}>
                                            {SERVICE_TYPE.map((item:any,key:number)=>{return(
                                                <IonSelectOption key={key}>{item}</IonSelectOption>
                                            )})}
                                        </IonSelect>
                                    </IonItem>

                                    <IonItem className="paymentLableStyle" class="paymentItems" lines="none">
                                        <IonLabel position="floating">Utility Account Number{asterisks}</IonLabel>
                                        <IonInput value={customer.acount} onIonChange={(e)=>{
                                            if (e.detail.value) setCustomer({
                                                bank:customer.bank,type:customer.type,acount:e.detail.value,
                                                email:customer.email,amount:customer.amount
                                            });
                                        }}/>
                                    </IonItem>

                                    <IonItem className="paymentLableStyle" class="paymentItems" lines="none">
                                        <IonLabel position="floating">Email{asterisks}</IonLabel>
                                        <IonInput value={customer.email} onIonChange={(e)=>{
                                            if (e.detail.value) setCustomer({
                                                bank:customer.bank,type:customer.type,acount:customer.acount,
                                                email:e.detail.value,amount:customer.amount
                                            });
                                        }}/>
                                    </IonItem>

                                    <IonItem className="paymentLableStyle" class="paymentItems" lines="none">
                                        <IonLabel position="floating">Amount{asterisks}</IonLabel>
                                        
                                        <IonInput type="number" value={customer.amount} onIonChange={(e)=>{
                                            if (e.detail.value) setCustomer({
                                                bank:customer.bank,type:customer.type,acount:customer.acount,
                                                email:customer.email,amount:e.detail.value
                                            });
                                        }}><span>$</span></IonInput>
                                    </IonItem>
                            </IonList>
                        </IonList>
                    </IonCol>
                </IonRow>
            </IonGrid>

            <IonGrid>
                <IonRow>
                    <IonCol size-md="4" offset-md="0">
                        <pay.checkOut
                            class="paymentButton"
                            price={customer.amount}
                            title={"My name"}
                            image={LOGO}
                            subTitle="checkout"
                            disable={false}
                            onOpen={()=>{}}
                            onDismiss={()=>{}}
                            email={customer.email}
                            products={customer}//we are sending customer info as product
                            onWillOpen={async()=>{return await customerChecks()}}
                        />
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonList>
    );
};

export default Payment;
