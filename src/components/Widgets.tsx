import { IonButton, IonButtons, IonCard, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonLoading, IonMenuButton, IonPopover, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './Widgets.css';
import '../pages/Main.css';
import { useParams } from 'react-router';
import tools from './Tools';
import { chevronDownCircleOutline, chevronDownOutline, closeCircle, ellipsisVerticalSharp } from 'ionicons/icons';
import { Security } from '../Authentication/Authenticate';
import { appPages, footerNotify } from './Config';


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
   
    noConnection(data:any){
        //accepts only 2 parameter 'hidden and image'
        //hidden will show or hide the widget and image will display to the screen as connection error
        const [showDetails, setShowDetails] = useState(false);
        const doRefresh = (event:any) =>{          
            setTimeout(() => {
                if (data.onRefresh && data.isConnection === true){
                    data.onRefresh();
                }
                event.detail.complete();
            }, 500);
        }
        return(
            <>
            <IonRefresher className="noConnectionReferesher" slot="fixed" onIonRefresh={(e)=>{doRefresh(e);}}>
                <p hidden={data.isConnection}>NAWASA SERVING THE NATION.</p>
                <IonRefresherContent
                    hidden={!data.isConnection}
                    pullingIcon={chevronDownCircleOutline}
                    pullingText="Pull to refresh"
                    refreshingSpinner="circles"
                    refreshingText="Refreshing...">
                </IonRefresherContent>
            </IonRefresher>
            <IonList hidden={!data.isConnection} class="noConnectionContainer">
                <div className="noConnectionCloseXbutton noConnectionHover">
                    <IonIcon onClick={()=>{if (data.onClose) data.onClose()}} icon={closeCircle}/>
                </div>
                <IonItem lines="none">
                    <IonImg class="noConnectionImage" src={data.image}/>
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
                <IonLabel>Pull to refresh</IonLabel>
                <IonIcon class="noConnectionArrowIcon" icon={chevronDownOutline}/>
            </IonList>
            </>
        )
    }
}  

const widgets = new Widgets();
export default widgets;