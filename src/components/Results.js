import React from 'react'
import api from '../utils/api'

export default class Results extends React.Component {
  
  componentDidMount() {
    console.log(api.battle(['loctv', 'davidtran']))
  }
  render() {
    return (
      <div>
        Results
      </div>
    )
  }
}