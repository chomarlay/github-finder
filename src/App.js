import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import './App.css';
import axios from 'axios';
import Search from './components/layout/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

class App extends Component {
  state = { users: [], loading: false, alert: null };

  // async componentDidMount() {
  //   console.log('No Plan B');
  //   this.setState({ loading: true });
  //   // const res = await axios.get('https://api.github.com/users');
  //   const res = await axios.get(process.env.REACT_APP_GITHUB_URL); // get this from .env.local
  //   this.setState({ users: res.data, loading: false });
  // }
  searchUsers = async searechText => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${searechText}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, loading: false });
  };

  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  };
  render() {
    const { users, loading, alert } = this.state;

    return (
      <Router>
        <div className='App'>
          <Navbar title=' No Plan B - Github Finder' />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
