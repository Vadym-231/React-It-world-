import React, {createFactory} from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import App from './App';
import store_ from "./ReduxFuctory/createFactory";
import { Switch, HashRouter,BrowserRouter,  Route,Router } from 'react-router-dom'
import Viewer from "./Content Scroll/NewsView";
import ViewerBlock from "./View/Viewer";
import Search from "./Search/Search";
window.React=React;

const errorFunc =()=>{
    return (<div>
        <h1>PATH ERROR</h1>
    </div>)
}
const render =()=> {

    ReactDOM.render(
        <BrowserRouter>
                <div>
                <Switch>
                    <Route path='/:typeOfPage' exact render={(props)=><Viewer Fuctori={store_} {...props} />}/>
                    <Route  path='/' exact render={(props)=><App  Fuctori={store_} {...props}/>}/>
                    <Route path='/block/:idNews' exact render={(props)=><ViewerBlock  Fuctori={store_} {...props}/>}/>
                    <Route path='/search/:searchStr' exact render={(props)=><Search  Fuctori={store_} {...props}/>}/>
                    <Route component= {errorFunc}/>
                </Switch>
              </div>
        </BrowserRouter>,
        document.getElementById('root')
    );
};
store_.subscribe(render);
render();


//serviceWorker.unregister();
