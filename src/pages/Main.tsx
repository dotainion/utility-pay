import { IonContent, IonList, IonPage } from '@ionic/react';
import React from 'react';
import './Main.css';
import Widgets from '../components/Widgets';
import Payment from './Payment';
import { useParams } from 'react-router';
import tools from '../components/Tools';


const Page: React.FC = () => {
  const { name } = useParams<{name:string}>();
  tools.redirect.ifNotLogin()//check if user is login else redirect to login
  return (
    <IonPage className="systemBackgrund">
      <Widgets.Header/>
      <Widgets.menuDropDown/>
    
      <IonContent>
        <IonList>
          <Payment onOpen={name}/>
        </IonList>
      </IonContent>

      <Widgets.footer/>
    </IonPage>
  );
};

export default Page;
