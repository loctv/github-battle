import React, { Component } from 'react'
import Nav from './Nav'
import Home from './Home'
import Popular from './Popular'
import Battle from './Battle'
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
            <Route path="/popular" component={Popular} />
            <Route exact path="/" component={Home} />
            <Route exact path="/battle" component={Battle} />
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
