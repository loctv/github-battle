import axios from 'axios'

const id = 'Iv1.d89096f16cea67d9'
const sec = '3c6a30c8b54d74ebc20639856ff879b7c57b7d1d'
const params = '?client_id=' + id + '&client_secret=' + sec

const base_url = 'https://api.github.com'

function getProfile(username) {
  return axios.get(base_url + '/users/' + username + params)
    .then(function(user) {
      return user.data
    })
}

function getRepos(username) {
  return axios.get(base_url + '/users/' + username + '/repos' + params)
    .then(function(repos) {
      return repos.data
    })
}

function getStarCount(repos) {
  return repos.reduce(function(count, repo) {
    return count + repo.stargazers_count
  }, 0)
}

function caculateScore(profile, repos) {
  const followers = profile.followers
  const totalStars = getStarCount(repos)
  return followers * 3 + totalStars
}

function handleError(error) {
  console.log(error)
  return null
}

function getUserData(player) {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then(function(data) {
    const [profile, repos] = data
    return {
      profile,
      score: caculateScore(profile, repos)
    }
  })
}

function sortPlayers(players) {
  return players.sort(function(a, b) {
    return b.score - a.score
  })
}

export default {
  battle: players => {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError)
  },
  fetchPopularRepositories: lang => {
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${lang}&sort=stars&order=desc&type=Repositories`)
    return axios
      .get(encodedURI)
      .then(res => res.data.items)
  }
}