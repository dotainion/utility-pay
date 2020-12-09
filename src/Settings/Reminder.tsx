import { IonCard, IonCol, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './Reminder.css';
import '../Main/Main.css';
import { pay } from '../components/CardPay';
import tools from '../components/Tools';
import Widgets from '../components/Widgets';
import LOGO from '../Images/nawasa.jpeg';
import testImg from '../Images/test.png';
import auth from '../Authentication/Authenticate';
import { appPages, settingsPages } from '../components/Config';


const Reminder = (data:any) => {
    let HIDDEN = true;
    if (data.onOpen === settingsPages.reminder().title) HIDDEN = false;

    return (
        <IonList hidden={HIDDEN}>
            <div className="empty-info">
                <div>{data.onOpen} is comming soon</div>
                <img className="empty-image" src={testImg}/>
            </div>
        </IonList>
    );
};

export default Reminder;