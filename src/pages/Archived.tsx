import { IonCard, IonCol, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './Archived.css';
import '../Main/Main.css';
import { pay } from '../components/CardPay';
import tools from '../components/Tools';
import Widgets from '../components/Widgets';
import LOGO from '../Images/nawasa.jpeg';
import auth from '../Authentication/Authenticate';
import { appPages } from '../components/Config';
import { ComingSoon } from '../components/ComingSoon';


const Archived = (data:any) => {
    let HIDDEN = true;
    if (data.onOpen === appPages.archived().title) HIDDEN = false;

    return (
        <IonList hidden={HIDDEN}>
            <ComingSoon name={data.onOpen}/>
        </IonList>
    );
};

export default Archived;
