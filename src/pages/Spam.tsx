import { IonCard, IonCol, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './Spam.css';
import './Main.css';
import { pay } from '../components/CardPay';
import tools from '../components/Tools';
import Widgets from '../components/Widgets';
import LOGO from '../Images/nawasa.jpeg';
import testImg from '../Images/test.png';
import auth from '../Authentication/Authenticate';
import { appPages } from '../components/Config';


const Spam = (data:any) => {
    let HIDDEN = true;
    if (data.onOpen === appPages.spam().title) HIDDEN = false;

    return (
        <IonList hidden={HIDDEN}>
            <div className="empty-info">
                <div>{data.onOpen} is comming soon</div>
                <img className="empty-image" src={testImg}/>
            </div>
        </IonList>
    );
};

export default Spam;
