import { IonBackButton, IonButton, IonButtons, IonCard, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonMenuButton, IonPopover, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { database } from 'firebase';
import React from 'react';
import './Widgets.css';
import '../pages/Main.css';
import { useParams } from 'react-router';

export class Widgets{
    Header(){
        const { name } = useParams<{name:string}>();
        return (
            <IonHeader className="systemHeaderbackground">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>
        );
    };
    
    ItemList(data:any){
        const { name } = useParams<{name:string}>();
        const style:any = {
            width:data.width || "300px",
            zIndex:99888,
            position:"absolute",
            marginTop:data.top,
            userSelect:"none",
            border:"1px solid lightgray",
        }
        return (
            <IonCard className="itemListMainContainer" hidden={!data.isOpen} style={style}>
                <div style={{overflowY:"scroll",height:data.height || "300px"}}>
                    {
                        data.list.map((item:any,key:number) =>{return(
                            <IonItem key={key} onClick={()=>{
                                if(data.onClick) data.onClick(item);
                                if (data.dismiss) data.dismiss();
                                }}>
                                <IonLabel color="primary">{item}</IonLabel>
                            </IonItem>
                        )})
                    }
                </div>
                <IonItem lines="none">
                    <IonButton slot="end" color="light" onClick={()=>{
                        if (data.dismiss) data.dismiss()
                    }}>Cancel</IonButton>
                </IonItem>
            </IonCard>
        );
    };

    logo(data:any){
        const containerStyle = {marginLeft:data.left || "50%",marginTop:data.top || "20px"};
        const logoStyle = {width:data.size || "60px",};
        return(
            <IonCard class="loginLogoContainer" style={containerStyle}>
                <IonCard class="loginLogoSubContainer">
                    <IonImg class="loginLogo" src={data.src} style={logoStyle}/>
                </IonCard>
            </IonCard>
        )
    }
}  