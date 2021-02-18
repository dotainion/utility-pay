import { IonCard, IonCol, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './Inbox.css';
import '../Main/Main.css';
import { pay } from '../components/CardPay';
import tools from '../components/Tools';
import Widgets from '../components/Widgets';
import LOGO from '../Images/nawasa.jpeg';
import testImg from '../Images/test.png';
import auth from '../Authentication/Authenticate';
import { appPages } from '../components/Config';
import { ComingSoon } from '../components/ComingSoon';


const Inbox = (data:any) => {
    let HIDDEN = true;
    if (data.onOpen === appPages.inbox().title) HIDDEN = false;

    return (
        <IonList hidden={HIDDEN}>
            <Widgets.sendMail/>
            <IonList>
                <IonItem>
                    <IonLabel>No messages</IonLabel>
                </IonItem>
            </IonList>
        </IonList>
    );
};

export default Inbox;
