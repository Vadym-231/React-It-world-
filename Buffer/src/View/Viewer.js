import React, {createRef} from 'react';
import PropTypes, {func} from 'prop-types';
import Header from "../Header/Header";
import Content from "../Content/ContentBlock";
import '../CSS/App.css'
import styletest from './Viewer.module.css'
import style from './ViewerMain.module.css'
import CheckType from '../Content/RenderBlock';
import Render_comments from "../Comments/Comments_render";
class ViewerBlock extends React.Component{
    constructor(props) {
        super(props);
        this.store = this.props.Fuctori;
       // this.setState({obj:null})
        this.idNews = this.props.match.params.idNews;
        this.fetchContent(this.idNews)
    }
    fetchContent(id){
        if(Number(id)){
            fetch('http://localhost:3000/api/block/next/news/'+id).then(data=>{
                if(data.ok){
                    return data.json()
                }
            }).then(data=>{
                if(data.length>0) {
                    this.store.dispatch({type: 'ADD_BLOCK_VIEW', typeOfBlock: 'news', arr: data})

                    this.store.dispatch({type:'SET_COMMENTS',arr:{code:404,username:''}})
                    data.map(data_=>{

                        //Підгрузка коментів якщо вони є

                        if(Number(data_.id)===Number(id)&&Number(data_.comments)>0){
                            fetch('http://localhost:3000/api/comments/'+Number(id)).then(comments=>{
                                if(comments.ok){
                                    return comments.json()
                                }
                            }).then(result=>{
                                this.store.dispatch({type:'SET_COMMENTS',arr:result})
                            })
                        }
                    })
                }
            }).catch(err=>{
                console.log(err)
            })
        }else {
            window.href="/";
        }
    }
    render() {

        if(this.idNews!==this.props.match.params.idNews){
            this.idNews=this.props.match.params.idNews;
            this.fetchContent(this.idNews)
        }
        const RenderEnabledNew=({data})=>{
            if(Number(data.id)===Number(this.idNews)){
                return <CheckType styleModule={style} comments_block={ <Render_comments Fuctori={this.store} arr={this.store.getState().commentsBlock} {...this.props} />}   title={data.Title} imgSrc_={data.ImgSrc} content={data.Content} date={data.date}  idNews={data.id}  />
            }
            else return null;
        }
        return(

            <div id="content">
                <Header nameCl='head' Fuctori={this.store}/>
               <div id='textContent'>
                {this.store.getState().bufferNews.map(data=><RenderEnabledNew data={data}/>)}
                {this.store.getState().bufferNews.map(data=><CheckType comments={data.comments} styleModule={styletest} title={data.Title} imgSrc_={data.ImgSrc} date={data.date}  idNews={data.id}  />)}
            </div>
            </div>
        )
    }
}
ViewerBlock.propTypes={
    Fuctori:PropTypes.object
}
export default ViewerBlock;