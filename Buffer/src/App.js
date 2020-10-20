import React, {createRef} from 'react';
import PropTypes, {func} from 'prop-types';
import Header from "./Header/Header";
import Content from "./Content/ContentBlock";
import './CSS/App.css'
import Courses from "./Content/CoursesBlock";

class App extends  React.Component{
    constructor(props) {
        super(props);
        this.store = this.props.Fuctori;
      }
    render(){
        /*

         */
               return (
                   <div id="content">
                       <Header nameCl='head' Fuctori={this.store}/>
                       <Courses coursesClass='videoContent' store={this.props.Fuctori}/>
                       <Content nameCont='textContent' store={this.props.Fuctori} />
                   </div>
            )
    }
}
App.propTypes={
    Fuctori:PropTypes.object
}
export default App;
