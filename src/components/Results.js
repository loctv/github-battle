import React from 'react'
import api from '../utils/api'
import queryString from 'query-string'
import Loading from './Loading'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import PlayerPreview from './PlayerPreview'


function Profile (props) {
  var info = props.info

  return (
    <PlayerPreview username={info.login} image={info.avatar_url}>
      <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
}

function Player (props) {
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
      <Profile info={props.profile} />
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
}


export default class Results extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      winner: null,
      loser: null,
      loading: true,
      error: null
    }
  }
  componentDidMount() {
    const {
      playerOneName,
      playerTwoName
    } = queryString.parse(this.props.location.search)
    
    api.battle([
      playerOneName,
      playerTwoName
    ]).then(function(players) {
      if (players === null) {
        return this.setState(function() {
          return {
            loading: false,
            error: {
              text: 'Look like there was an error. Check both users exist on Github.'
            }
          }
        })
      }

      this.setState(function() {
        return {
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false
        }
      })
    }.bind(this))
  }
  render() {
    const {
      winner,
      loser,
      loading,
      error
    } = this.state
    
    if (loading) {
      return <Loading />
    }
    if (error) {
      return (
        <div>
          <p>{error.text}</p>
          <Link
            to="/battle">
            Return
          </Link>
        </div>
      )
    }

    return (
      <div>
        <div className='row'>
          <Player
            label='Winner'
            score={winner.score}
            profile={winner.profile}
          />
          <Player
            label='Loser'
            score={loser.score}
            profile={loser.profile}
          />
        </div>
      </div>
    )
    
  }
}