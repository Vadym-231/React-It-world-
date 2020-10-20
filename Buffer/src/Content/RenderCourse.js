import React, { createRef } from 'react';
import PropTypes, { func } from 'prop-types';
import {Link} from "react-router-dom";

const CheckLink = ({styleModule,typeSrc,typeCourse,_url,_src,_title})=>{

    if(_url!==null){
        return (
            <Link to={_url} >
                <VideoRender styleModule={styleModule} src={_src} title={_title} typeCourse={typeCourse} typeSrc={typeSrc}/>
            </Link>
        )
    }else {
        return (
            <VideoRender styleModule={styleModule} src={_src} title={_title} typeCourse={typeCourse} typeSrc={typeSrc}/>
        )
    }
}
const VideoRender=({styleModule,typeSrc,typeCourse,url,src,title})=>{
    return (
        <div className={styleModule.mainContainer}>
            <p>{title}</p>
            {(typeSrc==='video')?<iframe className={styleModule.video}  src={src}/>:(typeSrc==='img')?<img className={styleModule.img} src={src} alt={title}/>:null}
            <p>{"Type :"+typeCourse}</p>
        </div>
    )
}
export default CheckLink;