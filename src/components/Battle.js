import React from 'react'
import PropTypes from 'prop-types'

const PlayerPreview = (props) => (
  <div>
  
  </div>
)

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
        >
          Submit
        </button>
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
  }

  handleSubmit (id, username) {
    this.setState(() => {
      let newState = {}
      newState[id + 'Name'] = username
      newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200'
      return newState
    })
  }
  
  render () {
    const {playerOneName, playerTwoName} = this.state
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
          {!playerTwoName &&
            <PlayerInput
              label="Player Two"
              id="playerTwo"
              onSubmit={this.handleSubmit}  
            />
          }
        </div>
      </div>
    )
  }
}

export default Battle