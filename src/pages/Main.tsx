import { IonContent, IonList, IonPage } from '@ionic/react';
import React from 'react';
import './Main.css';
import Widgets from '../components/Widgets';
import Payment from './Payment';
import { useParams } from 'react-router';
import tools from '../components/Tools';
import History from './History';
import Information from './Informations';
import Notification from './Notification';
import Inbox from './Inbox';
import OutBox from './Outbox';
import Favorites from './Favorites';
import Archived from './Archived';
import Trash from './Trash';
import Spam from './Spam';


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
          <History onOpen={name}/>
          <Information onOpen={name}/>
          <Notification onOpen={name}/>
          <Inbox onOpen={name}/>
          <OutBox onOpen={name}/>
          <Favorites onOpen={name}/>
          <Archived onOpen={name}/>
          <Trash onOpen={name}/>
          <Spam onOpen={name}/>
        </IonList>
      </IonContent>

      <Widgets.footer/>
    </IonPage>
  );
};

export default Page;
