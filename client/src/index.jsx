import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  componentDidMount() {
    // $.ajax('/', {
    //   method: 'GET',
    //   data: {sort: '-forks'},
    //   success: docs => {
    //     this.setState({repos: docs}); 
    //   },
    //   error: err => {
    //     throw err;
    //   }
    // });
    this.getRepos();
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax('/repos', {
      method: 'POST',
      data: {username: term},
      success: this.getRepos.bind(this), //What about arrow function this binding?
      error: err => {
        console.log('ERROR: ', err);
      }
    });
  }

  getRepos() {
    $.ajax('/repos', {
      method: 'GET',
      data: {sort: '-forks'},
      success: docs => {
        this.setState({repos: docs}); 
      },
      error: err => {
        console.log('ERROR: ', err);
      }
    });
  }

  render () {
    return (
      <div>
        <h1>Github Fetcher</h1>
        <RepoList repos={this.state.repos}/>
        <Search onSearch={this.search.bind(this)}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));