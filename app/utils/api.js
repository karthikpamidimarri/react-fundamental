var axios = require('axios');

var id = "73c8b367163aaf9d87a8";
var sec = "1daa061404ed59739d9d4beca58a8a980fb42091";
var params = "?client_id=" + id + "&client_secret=" + sec;

function getProfile(username){
    return axios.get("https://api.github.com/user/" + username +params)
        .then(function (user) {
            return user.data;
        });
}

function getRepos(username) {
    return axios.get("https://api.github.com/user/" + username + '/repos' +params + '&per_page=100')
}

function getStarCount(repos) {
    return repos.data.reduce(function (count, repo) {
        return count+repo.stargazers_count;
    },0)
}

function calculateScore(profile, repos) {
    var followers = profile.followers;
    var totalStars = getStarCount(repos);

    return (followers * 3) + totalStars;
}

function handleError(error) {
    console.warn(error);
    return null;
}

function getUserData(player) {
    return axios.all([
        getProfile(player),
        getRepos(player)
    ]).then(function (data) {
        var profile = data[0];
        var repos = data[1];

        return{
            profile: profile,
            score: calculateScore(profile, repos)
        }
    })
}

function sortPlayers(players) {
    return players.sort(function (player1, player2) {
        return player2.score - player1.score;
    })
}


module.exports = {

    battle: function (players) {
        return axios.all(players.map(getUserData))
            .then(sortPlayers)
            .catch(handleError)
    },

    fetchPopularRepos : function (language) {
        var encodedURI = window.encodeURI('https://api.github.com/search/' +
            'repositories?q=stars:>1+language: '+language+'' +
            '&sort=starts&order=desc&type=Repositories');

        return axios.get(encodedURI)
            .then(function (response) {
                return response.data.items;
            })
    }
};

