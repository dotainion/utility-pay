import { IonCard, IonCol, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './Reminder.css';
import '../Main/Main.css';
import testImg from '../Images/test.png';
import { appPages } from '../components/Config';


const ChangeAddress = (data:any) => {
    let HIDDEN = true;
    if (data.onOpen === appPages.address().title) HIDDEN = false;

    return (
        <IonList hidden={HIDDEN}>
            <div className="empty-info">
                <div>{data.onOpen} is comming soon</div>
                <img className="empty-image" src={testImg}/>
            </div>
        </IonList>
    );
};

export default ChangeAddress;
