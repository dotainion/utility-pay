import { IonCard, IonCol, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonRow, IonSelect, IonSelectOption, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './Information.css';
import '../Main/Main.css';
import Widgets from '../components/Widgets';
import payImg from '../Images/pay.png';
import payAccImg from '../Images/pay-access.png';
import payProtImg from '../Images/protecion-payment.png';
import image from '../Images/pay-online.jpg';
import auth from '../Authentication/Authenticate';
import { appPages } from '../components/Config';
import { ComingSoon } from '../components/ComingSoon';


const Information = (data:any) => {
    let HIDDEN = true;
    if (data.onOpen === appPages.information().title) HIDDEN = false;

    return (
        <IonList hidden={HIDDEN}>
            <IonList class="notification-container">
                <IonThumbnail class="notification-image">
                    <IonImg src={payImg}/>
                    <IonImg src={payAccImg}/>
                    <IonImg src={payProtImg}/>
                </IonThumbnail>
                <IonItem lines="full">
                    <p>
                        Your security is important to us. 
                        We do not store your credit card information. 
                        Online payments are passed via a secure socket 
                        layer to a payment processor where your information 
                        is tokenized (whereby a random number is generated to 
                        represent your payment). The payment processor is PCI 
                        compliant which ensures that your information is being 
                        handled in accordance with industry security standards.
                    </p>
                </IonItem>
            </IonList>
        </IonList>
    );
};

export default Information;
