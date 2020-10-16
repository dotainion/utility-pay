import { IonButton, IonButtons, IonCard, IonHeader, IonIcon, IonImg, IonLoading, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './Widgets.css';
import '../pages/Main.css';
import { useParams } from 'react-router';
import tools from './Tools';
import { ellipsisVerticalSharp } from 'ionicons/icons';
import { Security } from '../entry-point/Security';

class Widgets{
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
    
    logo(data:any){
        const containerStyle = {
            marginLeft:data.left || "50%",
            marginTop:data.top || "20px"
        };
        const logoStyle = {
            width:data.size || "60px",
        };
        return(
            <IonCard hidden={tools.isMobil(true,false)} class="loginLogoContainer" style={containerStyle}>
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
            <div hidden={tools.isMobil(true,false)} className="utilitySideInfoContainer" style={{marginLeft:LEFT,marginTop:TOP}}>
                <div color="primary" className="utilitySideInfoTitle">NAWASA</div>
                <div className="utilitySideInfoSubTitle">{"National Water & Sewerage Authority"}</div>
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
                <IonButton hidden id="start-loader" onClick={()=>{setShowLoading(true);}}/>
                <IonButton hidden id="stop-loader" onClick={()=>{setShowLoading(false);}}/>
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

const widgets = new Widgets();
export default widgets;