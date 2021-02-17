import {IonButton, IonContent,IonIcon,IonItem,IonLabel,IonList,IonListHeader,IonMenu,IonMenuToggle,IonNote,} from '@ionic/react';
import React, { useState } from 'react';
//import { useLocation } from 'react-router-dom';
import './Menu.css';
import tools from './Tools';
import { appPages } from './Config';
import { globalVar } from '../Global/GlobalVar';
import { useHistory } from 'react-router';



const labels = ['Reminders'];

const Menu: React.FC = () => {
  const history = useHistory();
  const [hideMenu, setHideMenu] = useState(false);
  return (
    <IonMenu hidden={hideMenu} contentId="menu" type="overlay" className="menuMain">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>{tools.texts().APPNAME.replace("Payments","")}</IonListHeader>
          <IonNote>NAWASA authority</IonNote>
          {appPages.get().map((appPage, index) => {
            return (
              <div key={index}>
                <IonListHeader id="#inbox-list" hidden={appPage.title !== "Reminder"} style={{borderBottom:"1px solid gray",marginTop:"40px"}}>Settings</IonListHeader>
                <IonMenuToggle autoHide={false}>
                  <IonItem className="menuItemContainer" routerLink={appPage.url} routerDirection="none" lines="none">
                    <IonIcon className="menuItemIcon" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              </div>
            );
          })}
        </IonList>
      </IonContent>
      <IonButton hidden id={globalVar.id.showMenu} onClick={()=>{setHideMenu(false)}}/>
      <IonButton hidden id={globalVar.id.hidemenu} onClick={()=>{setHideMenu(true)}}/>
    </IonMenu>
  );
};

export default Menu;
