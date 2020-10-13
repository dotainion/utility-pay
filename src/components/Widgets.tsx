import { IonBackButton, IonButton, IonButtons, IonCard, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonLoading, IonMenuButton, IonPopover, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { database } from 'firebase';
import React, { useState } from 'react';
import './Widgets.css';
import '../pages/Main.css';
import { useParams } from 'react-router';
import tools from './Tools';
import { ellipseSharp, ellipsisVerticalSharp } from 'ionicons/icons';
import { Security } from './Security';

export class Widgets{
    Header(){
        const { name } = useParams<{name:string}>();
        const SECURE = new Security();
        return (
            <IonHeader className="systemHeaderbackground">
                <IonToolbar>
                    <IonButtons hidden={tools.compare(SECURE.isLogin(),true,false,true)} slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>{name}</IonTitle>
                    <IonButtons style={{marginRight:"20px",fontSize:"25px"}} slot="end">
                        <IonIcon icon={ellipsisVerticalSharp} />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
        );
    };

    prospectHeader(){
        return(
            <IonHeader className="systemProspectHeader">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle class="prospectHeaderTitle">{tools.texts().APPNAME}</IonTitle>
                </IonToolbar>
            </IonHeader>
        )
    }
    
    ItemList(data:any){
        const { name } = useParams<{name:string}>();
        const style:any = {
            width:data.width || "300px",
            zIndex:99888,
            position:"absolute",
            marginTop:data.top,
            userSelect:"none",
            border:"1px solid lightgray",
            marginLeft:data.left || "3%",
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

    utilitySideInfo(data:any){
        const LEFT = data.left || "10%";
        const TOP = data.top || "200px";
        return(
            <div hidden={tools.isMobil(true,false)} style={{zIndex:1155,position:"absolute",right:0,width:"340px",
                transform:"translate("+LEFT+")",marginTop:TOP}}>
                <div>
                    <IonLabel color="primary" style={{fontSize:"35px",fontWeight:"bolder"}}>NAWASA</IonLabel>
                </div>
                <div>
                    <p style={{fontSize:"20px"}}>{"National Water & Sewerage Authority"}</p>
                </div>
            </div>
        )
    }

    loadSpinner(){
        const [ showLoading, setShowLoading ] = useState(false);
        return(
            <>
                <IonLoading
                    cssClass='my-custom-class'
                    isOpen={showLoading}
                    onDidDismiss={() => setShowLoading(false)}
                    message={'Please wait...'}
                    //duration={5000}
                    />
                
                <IonButton hidden id="start-loader" onClick={()=>{
                    setShowLoading(true);
                }}/>
                <IonButton hidden id="stop-loader" onClick={()=>{
                    setShowLoading(false);
                }}/>
            </>
        )
    }

    passwordProgressBar(data:any){
        var results:any = tools.passwordStrength(data.creds);
        var percentageValue = ((100 / data.max) * parseFloat(results.value)).toString();
        return(
            <>
                <div style={{width:"100%",height:"9px",marginTop:data.mTop,
                        borderRadius:"25px",border:"1px solid gray"}}>
                    <div style={{backgroundColor:results.color,width:percentageValue+"%",
                            height:"7px",borderRadius:"25px",marginTop:"0px"}}></div>
                </div>
                <div style={{color:results.color,fontSize:"12px",margin:"5px"}}>{results.text}</div>
            </>
        )
    }
}  