var React = require('react');
var Popular = require('./Popular');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');
var Results = require('./Results');

class App extends React.Component{
    render(){
        return(
            <Router>
                <div className='container'>
                    <Nav/>
                    <Route exact path='/' component={Home}/>
                    <Route path='/popular' component={Popular}/>
                    <Route path='/battle/results' component={Results}/>
                    <Route exact path='/battle' component={Battle}/>
                </div>
            </Router>
        )
    }
}

module.exports = App;