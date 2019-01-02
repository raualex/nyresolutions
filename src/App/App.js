import React, { Component } from 'react';
import './App.css';
// import { ResolutionCard } from '../ResolutionCard';

class App extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      description: '',
      status: '',
      isErrored: false
    }
  }

  componentDidMount = () => {
    localStorage.setItem('resolutions', JSON.stringify([]))
  }

  handleChange = (event) => {
    let { value, name } = event.target

    this.setState({ [name]: value })
  }

  handleRadioChange = (event) => {
    let { value } = event.target

    this.setState({ status: value })
  }

  handleClick = (event) => {
    event.preventDefault()
    let { name, description, status } = this.state
    
    if (name && description && status) {
      let localStore = JSON.parse(localStorage.getItem('resolutions'))
      let resolutionToStore = [ { name, description, status } ]
      localStorage.setItem('resolutions', JSON.stringify([...localStore, ...resolutionToStore]))
      this.setState({ isErrored: false })
    } else {
      this.setState({ isErrored: true })
    }
  }

  render() {
    let { name, description, isErrored } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <h1>New Year's Resolutions!</h1>
        </header>
        <form>
          <div className='App-input-container'>
            <input type='text' value={name} name='name' onChange={this.handleChange} />
            <input type='text' value={description} name='description' onChange={this.handleChange} />
          </div>
          <div className='App-radio-container'>
            <div>
              <input type='radio' id='In Progress' name='resolution-status' value='In Progress' onChange={this.handleRadioChange} />
              <label>In Progress</label>
            </div>
            <div>
              <input type='radio' id='Reached/Completed' name='resolution-status' value='Reached/Completed' onChange={this.handleRadioChange} />
              <label>Reached/Completed</label>
            </div>
            <div>
              <input type='radio' id='Not Complete' name='resolution-status' value='Not Complete' onChange={this.handleRadioChange} />
              <label>Not Complete</label>
            </div>
          </div>
          <button onClick={this.handleClick}>Submit</button>
        </form>
        <div className={isErrored ? 'App-error-msg' : 'App-error-msg hide'}>
          <h2>YOU MUST FILL OUT ALL REQUIRED FIELDS</h2>
        </div>
      </div>
    );
  }
}

export default App;
