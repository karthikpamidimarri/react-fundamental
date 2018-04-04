var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;

function PlayerPreview(props) {
    return(
        <div>
            <div className='column'>
                <img
                    className='avatar'
                    src={props.avatar}
                    alt={`Avatar for` + props.username}
                />
                <h2 className='username'>@{props.username}</h2>
            </div>
            <button className='reset'
                    onClick={props.onReset.bind(null,props.id)}
            >Reset</button>
        </div>
    )
}

PlayerPreview.propTypes = {
    avatar : PropTypes.string.isRequired,
    username : PropTypes.string.isRequired,
    id:PropTypes.string.isRequired,
    onReset : PropTypes.func.isRequired
};

class PlayerInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({username : event.target.value})
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.onSubmit(
            this.props.id,
            this.state.username
        )
    }
    render(){
        return(
            <form className='column' onSubmit={this.handleSubmit}>
                <label className='header' htmlFor='username'>
                    {this.props.label}
                </label>
                <input
                    id='username'
                    value={this.state.username}
                    placeholder='github username'
                    type='text'
                    onChange={this.handleChange}
                    autoComplete='off'
                />
                <button className='battle-button'
                        type='submit'
                        disabled={!this.state.username}
                >Submit</button>
            </form>
        )
    }
}

PlayerInput.propTypes = {
    id : PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit:PropTypes.func.isRequired
};

class Battle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            playerOneName:'',
            playerTwoName:'',
            playerOneImage:null,
            playerTwoImage:null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit(id, username){
        var newState = {};
        newState[id + 'Name'] = username;
        newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';

        this.setState(newState);
    };

    handleReset(id){
        var newState = {};
        newState[id + 'Name'] = '';
        newState[id + 'Image'] = null;
        this.setState(newState);
    }

    render(){
        var match = this.props.match;
        var playerOneName = this.state.playerOneName;
        var playerTwoName = this.state.playerTwoName;
        var playerOneImage = this.state.playerOneImage;
        var playerTwoImage = this.state.playerTwoImage;
        return(
            <div>
                <div className='row'>
                    {!playerOneName &&
                        <PlayerInput
                            id='playerOne'
                            label='Player One'
                            onSubmit={this.handleSubmit}
                        />
                    }

                    {playerOneImage !== null &&
                        <PlayerPreview
                            avatar={playerOneImage}
                            username={playerOneName}
                            id='playerOne'
                            onReset={this.handleReset}/>
                    }
                    {!playerTwoName &&
                        <PlayerInput
                            id='playerTwo'
                            label='Player Two'
                            onSubmit={this.handleSubmit}
                        />
                    }
                    {playerTwoImage !== null &&
                    <PlayerPreview
                        avatar={playerTwoImage}
                        username={playerTwoName}
                        id='playerTwo'
                        onReset={this.handleReset}/>
                    }
                </div>

                {playerOneImage && playerTwoImage &&
                    <Link
                        className='button'
                        to={{
                            pathname : match.url + '/results',
                            search: `?playerOneName=` + playerOneName + `&playerTwoName=`+ playerTwoName
                        }}>Battle</Link>
                }
        </div>

        )
    }
}

module.exports = Battle;