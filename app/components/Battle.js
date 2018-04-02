var React = require('react');
var PropTypes = require('prop-types');

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
    id : PropTypes.string.required,
    label: PropTypes.string.required,
    onSubmit:PropTypes.func.required
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
    }

    handleSubmit(id, username){
        var newState = {};
        newState[id + 'Name'] = username;
        newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';

        this.setState(newState);
    };
    render(){
        var playerOneName = this.state.playerOneName;
        var playerTwoName = this.state.playerTwoName;
        return(
            <div className='row'>
                {!playerOneName &&
                    <PlayerInput
                        id='playerOne'
                        label='Player One'
                        onSubmit={this.handleSubmit}
                    />
                }
                {!playerTwoName &&
                    <PlayerInput
                        id='playerTwo'
                        label='Player Two'
                        onSubmit={this.handleSubmit}
                    />
                }
            </div>
        )
    }
}

module.exports = Battle;