import React, { createRef } from 'react';
import PropTypes, { func } from 'prop-types';
import s from './ContentBlock.module.css';
import  v from  './ContentBlockViewer.module.css'
import CheckType from './RenderBlock'
import {Link} from "react-router-dom";
var style;
class Content extends React.Component{
    constructor(props) {
        super(props);
        if(typeof this.props.typeOfBlock ==='undefined') style = s;
        else style = v;
        this.classStr = this.props.nameCont;
        this.store = this.props.store;
        this.fetchData(1);
    }
    fetchData(page){
        fetch('api/home/news/'+page).then(data=>{
            if(data.ok){
                return data.json()
            }
        }).then(data=>{
            this.store.dispatch({type:'SET_BUFFER_NEWS',arr:data})
        }).catch(err=>{
            console.log(err)
        })
    }
    render(){

        return(<div className={this.classStr}>
            <div className={style.blockContent}>

            {( this.store.getState().bufferNews.length > 0)?this.store.getState().bufferNews.map(data=><CheckType comments={data.comments} styleModule={style} title={data.Title} imgSrc_={data.ImgSrc} date={data.date}  idNews={data.id}  />):null}

            </div>
        </div>)
    }
}

Content.propTypes ={
    nameCont:PropTypes.string,
    store:PropTypes.object
}
export  default  Content;