import React from 'react'
import PropTypes from 'prop-types'
import IronImage from './lib/IronImage'
import placeHolder from './placeholder150x150.jpg'
import {Link} from 'react-router-dom'
import PlayerPreview from './PlayerPreview'

class PlayerInput extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = {
      username: null
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleChange (e) {
    const username = e.target.value
    this.setState(() => {
      return {
        username
      }
    })
  }
  
  handleSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(
      this.props.id,
      this.state.username
    )
  }
  
  render () {
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label htmlFor="username" className="header">
          {this.props.label}
        </label>
        <input 
          name="username"
          type="text"
          autoComplete="off"
          placeholder="github username"
          onChange={this.handleChange}
        />
        <button
          className="button"
          type="submit"
          disabled={!this.state.username}
        >Submit</button>
      </form>
    )
  }
}

PlayerInput.protoTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleSubmit (id, username) {
    this.setState(() => {
      let newState = {}
      newState[id + 'Name'] = username
      newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200'
      return newState
    })
  }

  handleReset (id) {
    this.setState(() => {
      let newState = {}
      newState[id + 'Name'] = ''
      newState[id + 'Image'] = null
      return newState
    })
  }
  
  render () {
    const {
      playerOneName, 
      playerTwoName,
      playerOneImage,
      playerTwoImage
    } = this.state

    return (
      <div>
        <div className="row">
          {!playerOneName &&
            <PlayerInput
              label="Player One"
              id="playerOne"
              onSubmit={this.handleSubmit}  
            />
          }
          {playerOneImage &&
            <PlayerPreview
              username={playerOneName}
              image={playerOneImage}  
            >
              <button 
                className="btn-reset"
                onClick={this.handleReset.bind(null, 'playerOne')}
              >Reset</button>
            </PlayerPreview>
          }
          {!playerTwoName &&
            <PlayerInput
              label="Player Two"
              id="playerTwo"
              onSubmit={this.handleSubmit}  
            />
          }
          {playerTwoImage &&
            <PlayerPreview
              username={playerTwoName}
              image={playerTwoImage}
              id="playerTwo"
              onReset={this.handleReset}  
            >
              <button 
                className="btn-reset"
                onClick={this.handleReset.bind(null, 'playerTwo')}
              >Reset</button>
            </PlayerPreview>
          }
        </div>

        {playerOneImage && playerTwoImage &&
          <Link
            className="button"
            to={{
              pathname: this.props.match.url + "/results",
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}&`
            }}
          >
            Battle
          </Link>
        }
      </div>
    )
  }
}

export default Battle