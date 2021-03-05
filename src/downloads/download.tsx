import { IonButton, IonContent, IonItem, IonLabel, IonList, IonPage } from '@ionic/react';
import React from 'react';


const Downloads = () =>{
    const onDownload = () =>{
        var file_path = 'nawasa-apk.jks';
        var a = document.createElement('a');
        a.href = file_path;
        a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    return(
        <IonPage>
            <IonContent>
                <IonList style={{position:"absolute",top:"50%",left:"50%",transform:"translate3d(-50%,-50%,0)",padding:"20px",boxShadow:"2px 2px 5px gray"}}>
                    <IonLabel>National Water and Sewerage Authority</IonLabel>
                    <IonItem lines="full">
                        <IonButton onClick={onDownload}>Download</IonButton>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default Downloads;