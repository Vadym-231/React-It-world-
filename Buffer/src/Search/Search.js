import React from "react";
import PropTypes, { func } from 'prop-types';
import Header from "../Header/Header";
import CheckType from '../Content/RenderBlock'
import CheckLink from '../Content/RenderCourse'
import  style_for_courses from '../Content/CursesBlockView.module.css'
import style_for_news from '../Content/ContentBlockViewer.module.css'
import style_for_all_search_data from './SearchCss.module.css'
class Search extends React.Component{
    constructor(props) {
        super(props);
        this.store = this.props.Fuctori;
        this.state={searchStr:this.props.match.params.searchStr}
        this.fetchData(this.props.match.params.searchStr);
    }
    fetchData(str){
        if(str.length>3){

            //http://
            fetch('http://localhost:3000/api/search/search='+str.toString()).then(data=>{
                if(data.ok){
                    return data.json()
                }
            }).then(data=>{
                this.store.dispatch({type:'ADD_SEARCH_BUFFER',arr:data})
            })
        }
    }
  /* componentWillReceiveProps(nextProps) {
        this.setState({ searchStr:nextProps.match.params.searchStr });
        console.log('its work')
        this.fetchData(nextProps.match.params.searchStr);
    }*/
    render() {
        if(this.state.searchStr!==this.props.match.params.searchStr){
            this.setState({ searchStr:this.props.match.params.searchStr });
            this.fetchData(this.props.match.params.searchStr);
        }
        const Render =({data})=>{
            if(typeof data.url!=='undefined'){
                return <CheckLink styleModule={style_for_all_search_data} _src={data.src} typeSrc={data.srcType} _title={data.nameCourse} typeCourse={data.typeCourse} _url={data.url}/>
            }
            else {
                return <CheckType comments={data.comments} styleModule={style_for_all_search_data} title={data.Title} imgSrc_={data.ImgSrc} date={data.date}  idNews={data.id}  />
            }
        }
        return(
                <div id="content">
                    <Header nameCl='head' Fuctori={this.store}/>
                    <div className='textContent'>
                        <div className='search_container'>
                        {this.store.getState().buffer.map(data=><Render data={data}/>)}
                        </div>
                    </div>
            </div>
        )
    }
}
Search.PropTypes ={
    store: PropTypes.object
}
export default Search;

