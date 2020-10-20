import React, { createRef } from 'react';
import PropTypes, { func } from 'prop-types';
import Content from "../Content/ContentBlock";
import style from './Comments_style.module.css'
import {Link} from "react-router-dom";



class Render_comments extends React.Component{
    constructor(props) {
        super(props);
        this.store = this.props.Fuctori;
        this.inputArea = React.createRef();
        this.idNews = this.props.match.params.idNews;
        //this.inputArea = this.inputArea.bind(this)

    }

    render() {
        const {arr} = this.props;

        if(this.idNews!==this.props.match.params.idNews){
            this.idNews=this.props.match.params.idNews;
        }

        const submitProcess=(ev)=>{
            ev.preventDefault();
            let str = '';
            if(this.inputArea.current.value.length>10&&this.inputArea.current.value.length<230&&this.inputArea.current.value!=='Please write more text to response the comment'){
                str =this.inputArea.current.value;
                fetch('http://localhost:3000/api/commenting',{
                    method:'POST',
                        headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({idNews:this.idNews, commentData:str})
                }).then(data=>{
                    console.log(data.status)
                })
            }
            else {
                this.inputArea.current.value='Please write more text to response the comment';
            }
        }


        const Render_block_for_commenter=()=>{
            if((typeof this.store.getState().username)!== 'undefined'&&this.store.getState().username.length>3) {
                return (
                    <div className={style.commenter_block}>
                            <form onSubmit={event => submitProcess(event)}>
                                <label className={style.commenter}>
                                <figure className={style.figura}>
                            <img className={style.img} src={this.store.getState().src_user_header} alt={this.store.getState().username}/>
                            <figcaption >
                                {this.store.getState().username}
                            </figcaption>
                        </figure></label>
                        <textarea ref={this.inputArea}  className={style.commenter_input}/>
                        <input type="submit" className={style.commenter_submit}/>
                        </form>

                    </div>
                )
            }
        }

        const Render_Comment = ({img_src,content,src_user,user_name})=>{
            return (<div className={style.block}>
                <Link to={src_user} className={style.link}>
                <figure className={style.figura}>
                    <img className={style.img} src={img_src.replace(/&amp;/gi,'&')} alt={user_name}/>
                    <figcaption>
                        {user_name}
                    </figcaption>
                </figure>
                    <span className={style.text}>{content}</span>
                </Link>
            </div>)
        }
          return(<div>
              <Render_block_for_commenter/>
                {(typeof arr!=='undefined')?arr.map(data=><Render_Comment content={data.coment_data} img_src={data.img_src} src_user={data.src_on_facebook} user_name={data.name_comenter}/>):null}
        </div>)
    }
}
/*Render_comments.propTypes ={
  //  comments_array:PropTypes.array,
    store:PropTypes.object
}*/
export default Render_comments;