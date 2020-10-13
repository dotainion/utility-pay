import { IonButtons, IonCard, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './Payment.css';
import './Main.css';
import { pay } from '../components/CardPay';
import tools from '../components/Tools';
import { Widgets } from '../components/Widgets';
import { Creds } from '../components/Security';
import LOGO from '../Images/nawasa.jpeg';


const Widget = new Widgets();
const Payment = (data:any) => {
    const [open, setOpen] = useState({banks:false,type:false});
    const [customer, setCustomer] = useState({bank:"",type:"",acount:"",email:"",amount:""});
    var HIDDEN = true;
    if (data.onOpen === "Payment") HIDDEN = false;
    const asterisks = <span style={{color:"red"}}>*</span>;
    const BANKS_LIST = [0,1,2,3,4,5,6,7,8,9,10];
    const SERVICE_TYPE = ["residential","commercial","other"];

    const emailValidate = new Creds().check;
    const customerChecks = () =>{
        console.log(customer)
        if (!emailValidate(customer.email)) return false;
        else if (!customer.bank) return false;
        else if (!customer.type) return false;
        else if (!customer.acount) return false;
        else if (!customer.amount) return false;
        else return true;
    }
    return (
        <IonList hidden={HIDDEN}>

            <Widget.utilitySideInfo left="-50%"/>

            <IonCard class="mainContainer">
                <IonHeader class="paymentHeader" className="systemHeaderbackground">
                    <IonToolbar>
                        <IonTitle className="headerTitle">Payment</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonItem className="paymentLableStyle" lines="none">
                    <IonLabel>Date: {tools.date().date}</IonLabel>
                </IonItem>
                <IonItem className="paymentLableStyle" lines="none">
                    <IonLabel>Amount Due ${0.00}</IonLabel>
                </IonItem>

                <IonList class="mainSubContainer">
                    <IonCard>
                        <IonItem className="paymentLableStyle" class="paymentItems" lines="none">
                            <span>Bank Name{asterisks}</span>
                            <IonSelect slot="end" placeholder="Choose your bank name" interface="popover" onIonChange={(e)=>{
                                setCustomer({
                                    bank:e.detail.value,type:customer.type,acount:customer.acount,
                                    email:customer.email,amount:customer.amount
                                });}} value={customer.bank}>
                                {BANKS_LIST.map((item:any,key:number)=>{return(
                                    <IonSelectOption>{item}</IonSelectOption>
                                )})}
                            </IonSelect>
                        </IonItem>
                    </IonCard>
                    <IonCard>
                        <IonItem className="paymentLableStyle" class="paymentItems" lines="none">
                            <span>Service Type{asterisks}</span>
                            <IonSelect slot="end" placeholder="Choose your service type" interface="popover" onIonChange={(e)=>{
                                setCustomer({
                                    bank:customer.bank,type:e.detail.value,acount:customer.acount,
                                    email:customer.email,amount:customer.amount
                                });}} value={customer.type}>
                                {SERVICE_TYPE.map((item:any,key:number)=>{return(
                                    <IonSelectOption>{item}</IonSelectOption>
                                )})}
                            </IonSelect>
                        </IonItem>
                    </IonCard>
                    <IonCard>
                        <IonItem className="paymentLableStyle" class="paymentItems" lines="none">
                            <IonLabel position="floating">Utility Account Number{asterisks}</IonLabel>
                            <IonInput value={customer.acount} onIonChange={(e)=>{
                                if (e.detail.value) setCustomer({
                                    bank:customer.bank,type:customer.type,acount:e.detail.value,
                                    email:customer.email,amount:customer.amount
                                });
                            }}/>
                        </IonItem>
                    </IonCard>
                    <IonCard>
                        <IonItem className="paymentLableStyle" class="paymentItems" lines="none">
                            <IonLabel position="floating">example@gamil.com{asterisks}</IonLabel>
                            <IonInput value={customer.email} onIonChange={(e)=>{
                                if (e.detail.value) setCustomer({
                                    bank:customer.bank,type:customer.type,acount:customer.acount,
                                    email:e.detail.value,amount:customer.amount
                                });
                            }}/>
                        </IonItem>
                    </IonCard>
                    <IonCard>
                        <IonItem className="paymentLableStyle" class="paymentItems" lines="none">
                            <IonLabel position="floating">Amount Paying{asterisks}</IonLabel>
                            <IonInput value={customer.amount} onIonChange={(e)=>{
                                if (e.detail.value) setCustomer({
                                    bank:customer.bank,type:customer.type,acount:customer.acount,
                                    email:customer.email,amount:e.detail.value
                                });
                            }}/>
                        </IonItem>
                    </IonCard>
                </IonList>
            </IonCard>

            <pay.checkOut
                class="paymentButton"
                price={2}
                title={"My name"}
                subTitle="checkout"
                disable={false}
                onOpen={()=>{}}
                onDismiss={()=>{}}
                email="example@gmail.com"
                products={customer}
                onWillOpen={async()=>{return await customerChecks()}}
            />
        </IonList>
    );
};

export default Payment;
