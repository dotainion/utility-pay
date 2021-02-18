import { IonButton, IonCard, IonCol, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './ChangeAddress.css';
import testImg from '../Images/test.png';
import { appPages } from '../components/Config';


const ChangeAddress = (data:any) => {
    let HIDDEN = true;
    if (data.onOpen === appPages.address().title) HIDDEN = false;

    return (
        <IonList hidden={HIDDEN} className="change-address-backdrop">
            <IonList className="change-address-main-container">
                <div className="change-address-header">
                    <IonLabel>Request to change account detail</IonLabel>
                </div>
                <div className="change-address-sub-header">
                    Leave the field that is not being updated blank.
                </div>
                <IonList className="change-address-sub-container">
                    <IonList>
                        <IonLabel>First Name</IonLabel>
                        <IonInput class="change-address-input"/>
                    </IonList>
                    <IonList>
                        <IonLabel>Last Name</IonLabel>
                        <IonInput class="change-address-input"/>
                    </IonList>
                </IonList>
                <IonList className="change-address-sub-container">
                    <IonList>
                        <IonLabel>Email</IonLabel>
                        <IonInput class="change-address-input"/>
                    </IonList>
                    <IonList>
                        <IonLabel>Confirm Email</IonLabel>
                        <IonInput class="change-address-input"/>
                    </IonList>
                </IonList>
                <IonList className="change-address-sub-container">
                    <IonList>
                        <IonLabel>State</IonLabel>
                        <IonInput class="change-address-input"/>
                    </IonList>
                    <IonList>
                        <IonLabel>Parish</IonLabel>
                        <IonInput class="change-address-input"/>
                    </IonList>
                </IonList>
                <IonList style={{marginLeft:"5px",marginRight:"5px"}}>
                    <IonLabel>Address</IonLabel>
                    <IonInput class="change-address-input"/>
                </IonList>
                <IonItem lines="full">
                    <IonButton slot="end">Submit Request</IonButton>
                </IonItem>
            </IonList>
        </IonList>
    );
};

export default ChangeAddress;
