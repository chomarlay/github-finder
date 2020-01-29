import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = { users: [], loading: false };

  async componentDidMount() {
    this.setState({ loading: true });
    // const res = await axios.get('https://api.github.com/users');
    const res = await axios.get(process.env.REACT_APP_GITHUB_URL); // get this from .env.local
    this.setState({ users: res.data, loading: false });
  }
  render() {
    return (
      <div className='App'>
        <Navbar title=' No Plan B - Github Finder' />
        <div className='container'>
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
