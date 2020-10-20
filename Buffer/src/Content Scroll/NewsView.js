import React, {createRef} from 'react';
import PropTypes, {func} from 'prop-types';
import Header from "../Header/Header";
import Content from "../Content/ContentBlock";
import '../CSS/App.css'
import Courses from "../Content/CoursesBlock";

class Viewer extends React.Component{
    constructor(props) {
        super(props);
        this.type = this.props.match.params.typeOfPage;
        //console.log(this.props.match.params.typeOfPage)
        this.store_ =this.props.Fuctori;
        this.loading = false;
        this.onScrollList = this.onScrollList.bind(this);
    }
    fetchData(arr){
        let maxId=arr[0].id;
        arr.map(data=>{
            if(data.id<maxId){
                maxId=data.id;
            }
        })
        fetch('api/next/'+this.type+'/'+maxId).then(data=>{
            if(data.ok){
                return data.json()
            }
        }).then(data=>{
            if(data.length>0) this.store_.dispatch({type:'ADD_BLOCK',typeOfBlock:this.type,arr:data})
            this.loading=false;
        }).catch(err=>{
            console.log(err);
        })
    }
    componentDidMount() {
        window.addEventListener('scroll', this.onScrollList);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScrollList);
    }

      onScrollList(event) {

             const scrollBottom = ( document.body.scrollHeight - window.innerHeight - document.documentElement.scrollTop )>200
          console.log(scrollBottom + ' sdf'+ this.loading)
          if (!scrollBottom&&!this.loading) {

              switch (this.type) {
                  case 'news':
                      this.fetchData(this.store_.getState().bufferNews);
                      this.loading=true;
                      break;
                  case 'courses':
                      this.fetchData(this.store_.getState().bufferLearnCourses);
                      this.loading=true;
                      break;
              }
             }
         }

    render() {

        if(this.type!==this.props.match.params.typeOfPage){
            this.type=this.props.match.params.typeOfPage;
        }
        if(this.type ==='news'){
            return (
                <div id="content" >
                    <Header nameCl='head'Fuctori={this.store_}/>
                    <Content  typeOfBlock='letsDoThis' nameCont='textContent'  store={this.store_} />
                </div>
            )
        }
        if(this.type==='courses'){
            return (
                <div id="content">
                    <Header nameCl='head' Fuctori={this.store_}/>
                    <Courses typeOfBlock='letsDoThis' coursesClass='textContent' store={this.store_}/>
                </div>
            )
    }else {
        return (<div>
                <h1>ERROR 404</h1>
            </div>
        )
        }
    }
}
Viewer.propTypes={
    Fuctori:PropTypes.object
}
export default Viewer;
