import React from 'react';
import './ComingSoon.css';
import defaulImage from '../Images/test.png';



export const ComingSoon = ({name}:any) =>{
    return(
        <div className="empty-info">
            <div>{name} is coming soon.</div>
            <img className="empty-image" src={defaulImage}/>
        </div>
    )
}