import React from 'react'
import api from '../utils/api'
import queryString from 'query-string'
import Loading from './Loading'
import {Link} from 'react-router-dom'


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
        Results
      </div>
    )
    
  }
}