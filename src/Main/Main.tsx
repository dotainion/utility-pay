import { IonContent, IonList, IonPage } from '@ionic/react';
import React from 'react';
import './Main.css';
import Widgets from '../components/Widgets';
import Payment from '../pages/Payment';
import { useParams } from 'react-router';
import tools from '../components/Tools';
import History from '../pages/History';
import Information from '../pages/Informations';
import Notification from '../pages/Notification';
import Inbox from '../pages/Inbox';
import OutBox from '../pages/Outbox';
import Favorites from '../pages/Favorites';
import Archived from '../pages/Archived';
import Trash from '../pages/Trash';
import Spam from '../pages/Spam';
import Reminder from '../settings/Reminder';
import ChangeAddress from '../settings/ChangeAddress';


const Page: React.FC = () => {
  const { name } = useParams<{name:string}>();
  return (
    <IonPage className="systemBackgrund">
      <Widgets.Header/>
      <Widgets.menuDropDown/>
    
      <IonContent>
        {/* from pages */}
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

        {/* from settings */}
        <Reminder onOpen={name}/>
        <ChangeAddress onOpen={name}/>
      </IonContent>

      <Widgets.footer/>
    </IonPage>
  );
};

export default Page;
