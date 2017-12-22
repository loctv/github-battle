import React, { Component } from 'react'
import Nav from './Nav'
import Home from './Home'
import Popular from './Popular'
import Battle from './Battle'
import Results from './Results'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/popular" component={Popular} />
            <Route exact path="/battle" component={Battle} />
            <Route path="/battle/results" component={Results} /> 
            <Route 
              render={() => <p>Not Found</p>}
            />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
