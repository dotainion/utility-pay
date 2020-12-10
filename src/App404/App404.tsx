import { IonContent, IonLabel, IonList, IonPage } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { appPages } from '../components/Config';
import tools from '../components/Tools';
import './App404.css';

const App404: React.FC = () =>{
    const locaton = useLocation();
    const [hiddenState, setHiddenState] = useState(false);

    useEffect(()=>{
        const routes = [];
        for (var pages of appPages.get()) routes.push(pages.url);
        if (routes.includes(locaton.pathname)){ 
            setHiddenState(true);
            tools.onClick.showMenu();
        }else{
            setHiddenState(false);
            tools.onClick.hideMenu();
        }
    })

    return(
        <IonPage hidden={hiddenState}>
            <IonList class="app-404-container">
                <IonList class="app-404-sub-container">
                    <IonLabel>404 page not found</IonLabel>
                </IonList>
            </IonList>
        </IonPage>
    )
}
export default App404;