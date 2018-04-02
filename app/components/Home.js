var React = require('react');
var Link = require('react-router-dom').Link;
class Home extends React.Component{
    render() {
        return (
            <div className='home-container'>
                <h1>Github Battle: Battle your friends ... and stuff</h1>
                <Link to='/Battle' className='battle-button'>Battle</Link>
            </div>
        )
    }
};

module.exports = Home;