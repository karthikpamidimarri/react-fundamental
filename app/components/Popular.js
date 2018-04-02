var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

var LanguageItem = (props) => {
    return (<li
        style={props.language === props.selectedLanguage ? {color: '#d0021b' }: null}
        onClick={props.onSelect.bind(null, props.language)}
        >{props.language}</li>)
}

var SelectLanguage = (props) => {
    var languages = ['All','JavaScript','Ruby','Java','CSS', 'Python'];
    return (
        <ul className='languages'>
            {languages.map(function (language,index) {
                return (
                    <LanguageItem
                        language = {language}
                        {...props}
                        key = {index}
                    />
                )

            })}
        </ul>
    );
};

var RepoGrid = (props) =>{
  return(
      <ul className='popular-list'>
          {props.repos.map(function (repo, index) {
              return (
                  <li key={index} className='popular-item'>
                  <div className='popular-rank'>#{index + 1}</div>
                  <ul className='space-list-items'>
                    <li>
                        <img className='avatar'
                             src={repo.owner.avatar_url}
                             alt={'Avatar for '+ repo.owner.login}
                        />
                    </li>
                      <li><a href={repo.htm_url}>{repo.name}</a></li>
                      <li>@{repo.owner.login}</li>
                      <li>{repo.stargazers_count} stars</li>
                  </ul>
              </li>
              )
          })}
      </ul>
  )
};

RepoGrid.propTypes ={
   repos: PropTypes.array.isRequired,
};

LanguageItem.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
};

class Popular extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null
        };
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage);
    }
    updateLanguage(lang){
        this.setState(function () {
            return{
                selectedLanguage:lang
            }
        });
        api.fetchPopularRepos(lang)
            .then(function (repos) {
                this.setState({repos:repos});
            }.bind(this));
    }


    render(){
        return(
            <div>
                <SelectLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect = {this.updateLanguage}
                />
                {!this.state.repos ? <p>Loading ...</p>:
                    <RepoGrid repos = {this.state.repos}/>
                }

            </div>
        )
    }
}

module.exports = Popular;