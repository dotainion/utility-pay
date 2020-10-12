import { IonButtons, IonCard, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
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
    const BANKS_LIST = [1,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6];
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
            <Widget.ItemList isOpen={open.banks} list={BANKS_LIST} dismiss={()=>{
            setOpen({banks:false,type:false})}} onClick={(value:any)=>{
                setCustomer({
                    bank:value,type:customer.type,acount:customer.acount,
                    email:customer.email,amount:customer.amount
                });
            }} top="150px"/>
            <Widget.ItemList isOpen={open.type} list={SERVICE_TYPE} dismiss={()=>{
            setOpen({banks:false,type:false})}} onClick={(value:any)=>{
                setCustomer({
                    bank:customer.bank,type:value,acount:customer.acount,
                    email:customer.email,amount:customer.amount
                });
            }} top="205px" height="150px"/>

            <div style={{zIndex:1155,position:"absolute",right:0,
                marginRight:"130px",marginTop:"200px"}}>
                <div>
                    <IonLabel color="primary" style={{fontSize:"35px",fontWeight:"bolder"}}>NAWASA</IonLabel>
                </div>
                <div>
                    <p style={{fontSize:"20px"}}>{"National Water & Sewerage Authority"}</p>
                </div>
            </div>

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

                <IonItem className="paymentLableStyle" class="paymentItems" lines="none" onClick={()=>{
                        setOpen({banks:true,type:false});
                    }}>
                    <IonLabel>Bank Name{asterisks}<span className="paymentClickSpan">{customer.bank}</span></IonLabel>
                </IonItem>
                <IonItem className="paymentLableStyle" class="paymentItems" lines="none" onClick={()=>{
                        setOpen({banks:false,type:true});
                    }}>
                    <IonLabel>Service Type{asterisks}<span className="paymentClickSpan">{customer.type}</span></IonLabel>
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
                    <IonLabel position="floating">example@gamil.com{asterisks}</IonLabel>
                    <IonInput value={customer.email} onIonChange={(e)=>{
                        if (e.detail.value) setCustomer({
                            bank:customer.bank,type:customer.type,acount:customer.acount,
                            email:e.detail.value,amount:customer.amount
                        });
                    }}/>
                </IonItem>
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
