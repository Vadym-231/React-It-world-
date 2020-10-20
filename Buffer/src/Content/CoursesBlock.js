import React, { createRef } from 'react';
import PropTypes, { func } from 'prop-types';
import s from './CoursesBlock.module.css'
import v from  './CursesBlockView.module.css'
import CheckLink from './RenderCourse'
import {Link} from "react-router-dom";
var style;
class Courses extends React.Component{

    constructor(props) {
        super(props);
        if(typeof this.props.typeOfBlock ==='undefined'){
            style = s;
        }else {
            style = v;
        }
        this.store= this.props.store;
        this.coursesClass= this.props.coursesClass;
        this.fetchData(1)
    }
    fetchData(page){
        fetch('api/home/courses/'+page).then(data=>{
            if(data.ok){
                return data.json()
            }
        }).then(data=>{
            this.store.dispatch({type:"SET_COURSES_BUFFER",arr:data})
        }).catch(err=>{
            console.log(err)
        })
    }
    render() {

        return(<div className={this.coursesClass}>
            <div ><p className={style.mainBlock}>Curses:</p>
                { (this.store.getState().bufferLearnCourses.length>0)?this.store.getState().bufferLearnCourses.map(data=><CheckLink styleModule={style} _src={data.src} typeSrc={data.srcType} _title={data.nameCourse} typeCourse={data.typeCourse} _url={data.url}/>):null}
            </div>
        </div>)
    }

}

Courses.propTypes={
    coursesClass:PropTypes.string,
    store:PropTypes.object
}
export default Courses;