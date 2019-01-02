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
    if (!localStorage.length) {
      localStorage.setItem('resolutions', JSON.stringify([]))
    } else {
      return
    }
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
      this.setState({ name: '', description: '', status: '', isErrored: false })
    } else {
      this.setState({ isErrored: true })
    }
  }

  handleDelete = (event) => {
    let resolutionName = event.target.parentNode.getAttribute('data-name')
    let localStore = JSON.parse(localStorage.getItem('resolutions'))
    let filteredStore = localStore.filter((item) => {
      return item.name !== resolutionName
    })
    localStorage.setItem('resolutions', JSON.stringify([...filteredStore]))
  }

  printCards = () => {
    let resolutions;

    if (localStorage.length) {
      resolutions = JSON.parse(localStorage.getItem('resolutions'))
      return resolutions
    } else {
      return []
    }
  }

  render() {
    let { name, description, isErrored } = this.state
    let resolutionCards;

    if (this.printCards() !== []) {
      let cards = this.printCards()
      resolutionCards = cards.map((resolution, index) => {
        return <div key={index}>
          <div data-name={resolution.name}>
            <h1>{resolution.name}</h1>
            <button onClick={this.handleDelete}>X</button>
          </div>
          <h2>{resolution.description}</h2>
          <h4>{resolution.status}</h4>
        </div>
      });
    } else {
      resolutionCards = <div></div>
    }

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
        { resolutionCards }
      </div>
    );
  }
}

export default App;
