import { IonContent, IonList, IonPage } from '@ionic/react';
import React from 'react';
import './Main.css';
import Widgets from '../components/Widgets';
import Payment from './Payment';
import { useParams } from 'react-router';


const Page: React.FC = () => {
  const { name } = useParams<{name:string}>();
  return (
    <IonPage className="systemBackgrund">
      <Widgets.Header/>
    
      <IonContent>
        <IonList>
          <Payment onOpen={name}/>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Page;
