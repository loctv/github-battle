import React from 'react'
import {Link} from 'react-router-dom'

const Home = (props) => (
  <div className="home-container">
    <h1>Github Battle: Battle your friends... and stuffs.</h1>

    <Link className="button" to="/battle">
      Battle
    </Link>
  </div>
)

export default Home