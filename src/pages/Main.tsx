import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './Main.css';
import { Widgets } from '../components/Widgets';
import Payment from './Payment';
import { useParams } from 'react-router';


const Widget = new Widgets();
const Page: React.FC = () => {
  const { name } = useParams<{name:string}>();
  return (
    <IonPage className="systemBackgrund">
      <Widget.Header/>
    
      <IonContent>
        <IonList>
          <Payment onOpen={name}/>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Page;
