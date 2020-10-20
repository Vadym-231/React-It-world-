import {createStore} from "redux";
import stateA from "./state";
let store_ = createStore(setAnithink);
store_.subscribe(()=>{
  //  console.log(store_.getState());
});
function setAnithink(state=stateA,action){


    if(action.type=== "ADD_SEARCH_BUFFER"){
        if(action.arr.length>0){
            state.buffer = action.arr;
        }
            return state

    }
    if(action.type==='SET_COMMENTS'){
        if(action.arr.length>0){
            state.commentsBlock  =action.arr;
        }
        return state;
    }
    if(action.type === "SET_USER"){
        if(action.code===200){
            state.username=action.username;
            state.src_user_header=action.src_head.replace(/&amp;/gi,'&');
        }
        return state;
    }
    if(action.type ==="ADD_BLOCK"){
        if(action.typeOfBlock==='news'){
            state.bufferNews=state.bufferNews.concat(action.arr);
        }
        if(action.typeOfBlock==='courses'){
            state.bufferLearnCourses=state.bufferLearnCourses.concat(action.arr);
        }
        return state;
    }
    if(action.type ==="ADD_BLOCK_VIEW"){
        if(action.typeOfBlock==='news'){
            state.bufferNews=action.arr

        }
        if(action.typeOfBlock==='courses'){
            state.bufferLearnCourse=action.arr

        }
        return state;
    }
    if(action.type==="SET_COURSES_BUFFER"){
        state.bufferLearnCourses = action.arr;
        return state;
    }
    if(action.type==="SET_BUFFER_NEWS"){

            state.bufferNews = action.arr;

        return state;
    }
    return state;

}
export default store_;
