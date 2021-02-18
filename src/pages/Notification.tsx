import { IonCard, IonCol, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './Notification.css';
import '../Main/Main.css';
import { appPages } from '../components/Config';
import { GiDroplets } from 'react-icons/gi';
import { BsDropletHalf } from 'react-icons/bs';
import noWater from '../Images/no-water.png';
import tools from '../components/Tools';


const Notification = (data:any) => {
    const [openPendDis, setOpenPendDis] = useState(true);
    const [openOutage, setOpenOutage] = useState(false);

    let HIDDEN = true;
    if (data.onOpen === appPages.notificaton().title) HIDDEN = false;

    return (
        <IonList hidden={HIDDEN}>
            <IonList class="notification-main-container">

                <IonList class="notification-item-container">
                    <div onClick={()=>{
                        if (openPendDis) setOpenPendDis(false);
                        else setOpenPendDis(true);
                    }}>
                        <BsDropletHalf className="notification-icon"/>
                        <IonLabel>Pending Disconnect</IonLabel>
                    </div>

                    <IonList hidden={!openPendDis}>
                        <IonItem>
                            <IonLabel color="success">You are current</IonLabel>
                        </IonItem>
                        <IonItem lines="none">
                            <IonLabel>Bill due on {tools.date().date}</IonLabel>
                        </IonItem>
                    </IonList>
                </IonList>

                <IonList class="notification-item-container">
                    <div onClick={()=>{
                        if (openOutage) setOpenOutage(false);
                        else setOpenOutage(true);
                    }}>
                        <GiDroplets className="notification-icon2"/>
                        <IonLabel>Water Outage</IonLabel>
                    </div>

                    <IonList hidden={!openOutage}>
                        <IonItem lines="none">
                            <IonLabel>No water outage</IonLabel>
                        </IonItem>
                    </IonList>
                </IonList>

                <IonList>
                    <IonItem class="notification-general-info-header" lines="full">
                        <IonLabel>General information from NAWASA</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>No information</IonLabel>
                    </IonItem>
                </IonList>
            </IonList>
        </IonList>
    );
};

export default Notification;
