import React, { createRef } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import ccaImage from '../Images/cca_icon.png'
import { IonButton } from '@ionic/react';
import tools from './Tools';


class Checkout{
    STRIPE_KEY = "pk_test_51HMQLOBZvIBjqI0ERBmRc4Feu7qu6fXdnc8IZ9whUpTWAMIEZyYRSUsFCc2LQlXIPJJqBYgzcIbQJY5WODNXdiuf00TucXVjmM"
    SERVER_URL = "http://127.0.0.1:4242/checkout";

    onTokenSend(TOKEN:any,PRODUCTS:any,onReturn:any=false){
        axios.post(pay.SERVER_URL,{token:TOKEN,product:PRODUCTS})
        .then(response =>{
            const { status } = response.data;
            if (status === "success"){
                const msg = "Payment was preccess successful, a total of $"+PRODUCTS.price+" was charge towards your account";
                tools.toastWithCmd(msg,false,"Okay","","Payment update!!","success","top")
                if (onReturn) onReturn(response.data);
            }        
            console.log(response.data)
        })
        .catch(error=>{
            console.log(error)
            return {state:null, msg: error};
        })
    }

    checkOut(data:any){
        const btnSubmitRef = createRef<HTMLIonButtonElement>();
        const TITLE = data.title || "CCA";
        const IMAGE = data.image || ccaImage;
        const SUB_TITLE = data.subTitle || "Testing";
        const CURRENCY = data.currency || "USD";
        const SUBMITE_BUTTON = "PAY";
        const BUTTON_TEXT = data.buttonText || "Pay With Card";
        const PRICE = parseFloat(data.price) * 100 || 0;
        const EMAIL = data.email || "example@gmail.com"
        const SHIPPING_ADDRESS = data.shippingAddress || false;
        const BILLING_ADDRESS = data.billingAddress || false ;
        const onSubmit = (token:any) => pay.onTokenSend(token,data.products,data.onReturn);
        const whenClick = () =>{
            if (PRICE > 0 && !data.disable) btnSubmitRef.current?.click();
            if (data.onOpen) data.onOpen();
        }
        return(
            <div>
                <StripeCheckout
                    name={TITLE}
                    description={SUB_TITLE}
                    image={IMAGE}
                    panelLabel={SUBMITE_BUTTON}
                    amount={PRICE}
                    currency={CURRENCY}
                    stripeKey={pay.STRIPE_KEY}
                    email={EMAIL}
                    shippingAddress={SHIPPING_ADDRESS}
                    billingAddress={BILLING_ADDRESS}
                    zipCode={false}
                    allowRememberMe={true} // "Remember Me" option (default true)
                    token={onSubmit}>
                    <IonButton ref={btnSubmitRef} hidden>Pay With Card</IonButton>
                </StripeCheckout>
                <div className={data.class}>
                    <IonButton onClick={async()=>{
                        if (!data.onWillOpen){
                            whenClick();
                        }else{
                            if (await data.onWillOpen() === true){
                                whenClick();
                            }
                        }
                    }}>{BUTTON_TEXT}</IonButton>
                </div>
            </div>
        )
    }
}
export var pay = new Checkout();






