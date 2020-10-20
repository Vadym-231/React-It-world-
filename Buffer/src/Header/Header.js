import React, { createRef } from 'react';
import PropTypes, { func } from 'prop-types';
import styleNew from './headerStyle.module.css'
import {Link, Redirect} from "react-router-dom";
import Authorize from "../auth/Singin";


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.classHeader = this.props.nameCl;
        this.search_input = React.createRef();
        this.store = this.props.Fuctori;
        this.state ={redirect:false,str:''}
        fetch('http://localhost:3000/api/username').then(data=>{
            if(data.ok){
                return data.json()
            }
        }).then(data=>{
                     this.store.dispatch({type:'SET_USER',code:data.code,username:data.userName,src_head:data.src_head})
        })
        this.serchEvent = this.serchEvent.bind(this);
    }
    serchEvent (ev){
        ev.preventDefault();
        if(this.search_input.current!==null) {
            if (this.search_input.current.value.length > 3) {
                this.setState({redirect: true,str:this.search_input.current.value})
            }
        }
    }
    render() {
        if(this.state.redirect){
            this.setState({redirect:false})
            return <Redirect to={'/search/'+this.state.str}/>
        }
        const Logo = () => {//http://
            return (
                <div >
                <Link to='/'><img src='http://localhost:3000/api/logo'/></Link>
                    <span id='caseMenu' className={styleNew.menuCase}><Link to='/news'>It-News</Link> <Link to='/courses'> Courses</Link></span>
                </div>
            )
        }
        const User =()=>{
            return (
                <div className={styleNew.usernameBlock}>
                    {(this.store.getState().username!==''&&typeof this.store.getState().username!=='undefined')?<span className={styleNew.username}><img className={styleNew.user_img} src={this.store.getState().src_user_header} alt='user_logo'/>{this.store.getState().username}</span>:<Authorize Fuctori={this.store}/>}
                </div>
            )
        }
        const InputSearch=()=>{
            return(
                <form className={styleNew.wform}>
                    <input type='text' ref={this.search_input} placeholder='Search' className={styleNew.inputText}/>
                    <button onClick={(event)=>this.serchEvent(event)} className={styleNew.inputButton}></button>
                </form>
            )
        }
        return ( <div className = { this.classHeader } >
            <Logo />
            <InputSearch />
            <User/>
            </div>)
    }
}
Header.propTypes ={
    nameCl:PropTypes.string
};
export default Header;