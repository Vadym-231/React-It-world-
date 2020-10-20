import { actions, reducer, signin, signout } from 'react-redux-oauth2'
import React from "react";
import FacebookLogin from 'react-facebook-login';
// import {request} from 'request'


class AuthComponent extends React.Component {
    constructor(props) {
        super(props);
        this.store = this.props.Fuctori;
    }
    responseFacebook(response) {
      //  const {Fuctori}=this.props

        fetch("http://localhost:3000/api/authorize",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(response)
        }).then(data=>{
            if(data.status===200){
                fetch('http://localhost:3000/api/username').then(data=>{
                    if(data.ok){
                        return data.json()
                    }
                }).then(data=>{
                    this.props.Fuctori.dispatch({type:'SET_USER',code:data.code,username:data.username})
                })

            }
        })


    }

    render() {
        return (
            <FacebookLogin
                appId="346598226455097"
                autoLoad={false}
                fields="name,email,picture"
                callback={this.responseFacebook}
                cssClass="my-facebook-button-class"
                icon="fa-facebook"
            />
        )
    }
}

export default AuthComponent;