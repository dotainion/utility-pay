import {IonButton, IonContent,IonIcon,IonItem,IonLabel,IonList,IonListHeader,IonMenu,IonMenuToggle,IonNote,} from '@ionic/react';
import React, { useState } from 'react';
//import { useLocation } from 'react-router-dom';
import { bookmarkOutline } from 'ionicons/icons';
import './Menu.css';
import tools from './Tools';
import { appPages, settingsPages } from './Config';
import { globalVar } from '../Global/GlobalVar';



const labels = ['Reminders'];

const Menu: React.FC = () => {
  const [hideMenu, setHideMenu] = useState(false);
  //const location = useLocation();
  tools.redirect.ifNotLogin()
  return (
    <IonMenu hidden={hideMenu} contentId="menu" type="overlay" className="menuMain" style={{width:tools.isMobil("","100px")}}>
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>{tools.texts().APPNAME.replace("Payments","")}</IonListHeader>
          <IonNote>NAWASA authority</IonNote>
          {appPages.get().map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className="menuItemContainer" routerLink={appPage.url} routerDirection="none" lines="none">
                  <IonIcon color="tertiary" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Settings</IonListHeader>
          {settingsPages.get().map((settings, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem className="menuItemContainer" routerLink={settings.url} lines="none">
                <IonIcon color="tertiary" slot="start" icon={bookmarkOutline} />
                <IonLabel>{settings.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
      </IonContent>
      <IonButton hidden id={globalVar.id.showMenu} onClick={()=>{setHideMenu(false)}}/>
      <IonButton hidden id={globalVar.id.hidemenu} onClick={()=>{setHideMenu(true)}}/>
    </IonMenu>
  );
};

export default Menu;
