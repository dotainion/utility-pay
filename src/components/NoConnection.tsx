import React, { useState } from 'react';
import { IonButton, IonIcon, IonImg, IonItem, IonLabel, IonList, IonModal, IonRefresher, IonRefresherContent } from "@ionic/react";
import { chevronDownCircleOutline, chevronDownOutline, closeCircle } from 'ionicons/icons';
import './NoConnection.css';
import tools from './Tools';


export const NoConnection = ({isNoConnection,onRefresh,onClose,image}:any) =>{
    //accepts only 2 parameter 'hidden and image'
    //hidden will show or hide the widget and image will display to the screen as connection error
    const [showDetails, setShowDetails] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const doRefresh = (event:any) =>{          
        setTimeout(() => {
            if (onRefresh && isNoConnection === true){
                if (tools.isMobil()) onRefresh();
            }
            event.detail.complete();
        }, 500);
    }
    return(
        <>
            <IonRefresher className="noConnectionReferesher" slot="fixed" onIonStart={()=>{
                if (tools.isMobil()) setDisabled(false);
                else setDisabled(true);
            }} disabled={disabled} onIonRefresh={(e)=>{doRefresh(e);}}>
                <p hidden={isNoConnection}>NAWASA SERVING THE NATION.</p>
                <IonRefresherContent
                    hidden={!isNoConnection}
                    pullingIcon={chevronDownCircleOutline}
                    pullingText="Pull to refresh"
                    refreshingSpinner="circles"
                    refreshingText="Refreshing...">
                </IonRefresherContent>
            </IonRefresher>
            <IonList hidden={!isNoConnection} class="noConnectionContainer">
                <div className="noConnectionCloseXbutton noConnectionHover">
                    <IonIcon onClick={()=>{if (onClose) onClose()}} icon={closeCircle}/>
                </div>
                <IonItem lines="none">
                    <IonImg class="noConnectionImage" src={image}/>
                </IonItem>
                <div><IonLabel className="noConnectionAlert">Oops!</IonLabel></div>
                <div><IonLabel className="noConnectionText">No Internet Connection</IonLabel></div>
                <div><IonLabel class="noConnectionSubText">Check your connection and try again</IonLabel></div>
                <IonItem hidden={showDetails} lines="none">
                    <span slot="end" onClick={()=>{
                        setShowDetails(true)
                    }} className="noConnectionDetailButton noConnectionDetailBtnHover">details</span> 
                </IonItem>
                <div hidden={!showDetails} className="noConnectionDetailTextContainer">
                    <p className="noConnectionDetailText">
                        “Any one can write code that a computer can understand. 
                        Good programmers write code that humans can understand.
                        When to use iterative development? You should use iterative
                        development only on projects that you want to succeed.”
                    </p>
                    <IonItem lines="none">
                        <IonButton class="noConnectionCloseButton" onClick={()=>{
                            setShowDetails(false)
                        }} color="light">Hide</IonButton> 
                    </IonItem>
                </div>
                <IonLabel class="noConnectionRetryBtn">Pull to refresh</IonLabel>
                <IonLabel class="noConnectionRetryBtn2" onClick={()=>{onRefresh()}}>Retry</IonLabel>
                <IonIcon class="noConnectionArrowIcon" icon={chevronDownOutline}/>
            </IonList>
        </>
    )
}