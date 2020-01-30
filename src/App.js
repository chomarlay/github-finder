import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import './App.css';
import axios from 'axios';
import Search from './components/layout/Search';

class App extends Component {
  state = { users: [], loading: false };

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

  render() {
    return (
      <div className='App'>
        <Navbar title=' No Plan B - Github Finder' />
        <div className='container'>
          <Search searchUsers={this.searchUsers} />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
