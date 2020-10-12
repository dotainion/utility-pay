import { isPlatform } from "@ionic/react";


class Tools{
    toastMsg(msg:string,duration:number=3000,position:any="top",color:string="dark"){
        const toast = document.createElement('ion-toast');
        toast.message = msg;
        toast.position = position;
        toast.duration = duration;
        toast.color = color;
    
        document.body.appendChild(toast);
        return toast.present();
    }
    toastWithCmd(msg:string="",onClick:any=false,okayText:string="Yes",
            cancelText:string="No",header:string="Warning!!",color:string="light",position:any="top"){
        const toast = document.createElement("ion-toast");
        toast.header = header;
        toast.message = msg;
        toast.position = position;
        toast.color = color;
        toast.buttons = [
            {
                //side: 'start',
                icon: 'star',
                text: okayText,
                handler: () => {
                    if (onClick){
                        onClick(true);
                    }
                }
            }, {
                role: 'cancel',
                text: cancelText,
                handler: () => {
                    if (onClick){
                        onClick(false);
                    }
                }
            }
        ];

        document.body.appendChild(toast);
        return toast.present();
    }
    platform(){
        if (!isPlatform("desktop")){
            if (isPlatform("mobile") || isPlatform("tablet") || isPlatform("ios")) return true;
            else return false;
        }else{
            if (window.innerWidth < 500) return true;
            else return false; 
        }
    }
    isMobil(returnTrue:any, returnFalse:any){
        if (this.platform()) return returnTrue;
        else return returnFalse;
    }
    onIdClick(cmd:string){
        try{
            document.getElementById(cmd)?.click()
        }catch{}
    }
    date(data:any=new Date().toString()){
        var index = 0;var temp = "";var dates = [];
        for (var value of data){
            if (value !== " "){
                temp = temp + value;
            }else{
                index ++;
                dates.push(temp);
                temp = "";
                if (index === 4){break;}
            }
        }
        const date = dates[0]+"/"+dates[2]+"/"+dates[1]+"/"+dates[3]
        return {week:dates[0],month:dates[1],day:dates[2],year:dates[3],date:date};
    }
}
const tools= new Tools();
export default tools;
