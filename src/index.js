//React
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
//Styling
import './index.css';
//Components
import Header from './components/Header';
import List from './components/lists/List';
import Card from './components/Card/Card';



const App = () => {
    return (
    <BrowserRouter>
        <div>
        <Header/> 
            <Switch>
                <Route path ="/" component={List} exact/>
                <Route path ='/currency/:Name'component ={Card} exact/>
            </Switch>
            </div>
    </BrowserRouter>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);