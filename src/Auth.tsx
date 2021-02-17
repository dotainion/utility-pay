import React from 'react';
import { Redirect, Route, useHistory } from 'react-router';
import { globalVar } from './Global/GlobalVar';
import auth from './Authentication/Authenticate';


const Auth = ({Components}:any) =>{
    const history = useHistory();
    return(
        <Route render={()=>{
            if (auth.secure.isLogin()){
                return(
                    <Components/>
                )
            }else{
                return(
                    <Redirect to={{
                        pathname: globalVar.route.login,
                        state: {
                            from: history.location.pathname
                        }
                    }}/>
                )
            }
        }}/>
    )
}

export default Auth;