import { IonButton, IonButtons, IonCard, IonCheckbox, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonLoading, IonMenuButton, IonModal, IonNote, IonPopover, IonRefresher, IonRefresherContent, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './Widgets.css';
import '../Main/Main.css';
import { useParams } from 'react-router';
import tools from './Tools';
import { addOutline, chevronDownCircleOutline, chevronDownOutline, closeCircle, ellipsisVerticalSharp } from 'ionicons/icons';
import { Security } from '../Authentication/Authenticate';
import { appPages, footerNotify } from './Config';
import { BiMessageRoundedAdd } from 'react-icons/bi';


class Widgets{
    headerList:any = [
        {
            cmd: "logout",
            name: "logout",
        },
    ];

    Header(){
        const { name } = useParams<{name:string}>();
        const SECURE = new Security();
        return (
            <IonHeader className="systemHeaderbackground header-main-container">
                <IonToolbar>
                    <IonButtons hidden={tools.compare(SECURE.isLogin(),true,false,true)} slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>{name}</IonTitle>
                    
                    <div className="hide-if-desktop header-desktop-lists" slot="end">
                        {widgets.headerList.map((list:any,key:any)=>(
                            <span className="header-hover" key={key} onClick={()=>{
                                tools.onClick.byId(list.cmd);
                            }}>{list.name}</span>
                        ))}
                    </div>
                    <IonButtons className="hide-if-mobile header-three-dot-button" slot="end">
                        <IonIcon icon={ellipsisVerticalSharp} onClick={()=>{
                            tools.onClick.byId("drop-down-menu");
                        }} />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
        );
    };

    footer(data:any){
        return(
            <IonFooter class="footer-mobile-main-container">
                <IonToolbar>
                    {appPages.footer().map((page:any,key:number)=>(
                        <IonItem id={footerNotify.id()[key]} className="footer-title-container" routerLink={page.url} onClick={()=>{
                            tools.onClick.byId(page.url);
                        }} slot="end" key={key} lines="none">
                            <span className="footer-span-container">
                                <IonIcon class="footer-icon" icon={page.mdIcon}/>
                                <div className="footer-title">{page.title}</div>
                            </span>
                        </IonItem>
                    ))}
                </IonToolbar>
            </IonFooter>
        )
    }

    menuDropDown(){
        const [open, setOpen] = useState(false);
        return(
            <IonList hidden={!open} onMouseLeave={()=>{
                console.log("hello world")
            }} className="drop-down-menu-main-container">
                {widgets.headerList.map((list:any,key:any)=>(
                    <IonItem class="drop-down-hover" key={key} onClick={()=>{
                        tools.onClick.byId(list.cmd);
                    }}>
                        <IonLabel>{list.name}</IonLabel>
                    </IonItem>
                ))}

                <IonButton id="drop-down-menu" hidden onClick={()=>{
                    if (open) setOpen(false);
                    else setOpen(true);
                }}/>
            </IonList>
        )
    }

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
            <div className="utilitySideInfoContainer" style={{marginLeft:LEFT,marginTop:TOP}}>
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
   
    sendMail(){
        const [openMail, setOpenMail] = useState(false);
        const options:any = ["Fault","Recommendation","About my bill"]
        return(
            <IonList>
                <IonButton color="light" onClick={()=>{
                    setOpenMail(true);
                }}>Send Email<BiMessageRoundedAdd style={{color:"dodgerblue",fontSize:"25px"}}/></IonButton>

                <IonModal isOpen={openMail} onDidDismiss={()=>{setOpenMail(false)}}>
                    <IonList class="send-mail-container">
                        <IonItem class="send-mail-header" lines="full">
                            <IonLabel>Send Mail</IonLabel>
                        </IonItem>

                        <IonList class="send-mail-info">
                            <IonNote>message test info</IonNote>
                        </IonList>

                        <IonItem class="send-mail-select-option" lines="none">
                            <IonSelect style={{overflow:"none"}} placeholder="Select a option" interface="popover">
                                {options.map((option:any, key:any)=>(
                                    <IonSelectOption key={key}>{option}</IonSelectOption>
                                ))}
                            </IonSelect>
                        </IonItem>
                        
                        <IonLabel>Message</IonLabel>
                        <IonTextarea class="send-mail-textarea" onIonChange={()=>{

                        }} placeholder="Place your message here"/>
                    
                        <IonItem lines="none">
                            <IonButton slot="end" onClick={()=>{
                                setOpenMail(false);
                            }}>Close</IonButton>
                            <IonButton slot="end">Send</IonButton>
                        </IonItem>
                    </IonList>
                </IonModal>
            </IonList>
        )
    }
}  

const widgets = new Widgets();
export default widgets;