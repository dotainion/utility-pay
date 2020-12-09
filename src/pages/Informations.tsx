import { IonCard, IonCol, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './Information.css';
import '../Main/Main.css';
import { pay } from '../components/CardPay';
import tools from '../components/Tools';
import Widgets from '../components/Widgets';
import LOGO from '../Images/nawasa.jpeg';
import testImg from '../Images/test.png';
import auth from '../Authentication/Authenticate';
import { appPages } from '../components/Config';


const Information = (data:any) => {
    let HIDDEN = true;
    if (data.onOpen === appPages.information().title) HIDDEN = false;

    return (
        <IonList hidden={HIDDEN}>
            <div className="empty-info">
                <div>{data.onOpen} is comming soon</div>
                <img className="empty-image" src={testImg}/>
            </div>
        </IonList>
    );
};

export default Information;
