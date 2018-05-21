import React from 'react'
import { hot } from 'react-hot-loader'

import logoImg from '../logo.png'


class Inputs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      photo: ''
    };

    this.submitMainInput = this.submitMainInput.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
  }

  submitForm(data) {
    var url = '/newProfile';
    // var data = {
    //   name: 'Yosh',
    //   description: 'Software Engineer',
    //   photo: 'demo'
    // };
    console.log('trying to run submitForm with: data: ', data)
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }


  submitMainInput(e) {
    e.preventDefault();
    console.log('submitting input with: ', this.state)
    this.submitForm(this.state)
  }
  
  handleNameChange(e) {
    e.preventDefault();
    this.setState({
      name: e.target.value
    })
  }
  handleDescriptionChange(e) {
    e.preventDefault();
    this.setState({
      description: e.target.value
    })
  }
  handlePhotoChange(e) {
    e.preventDefault();
    this.setState({
      photo: e.target.value
    })
  }

  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>WELCOME to The World's Easiest SITE</h1>
        <form onSubmit = {this.submitMainInput}>
          <label>
            Name:
            <input value={this.state.name} type="text" name="name" onChange={this.handleNameChange}/>
          </label>
          <label>
            Description:
            <input value={this.state.description} type="text" name="description" onChange={this.handleDescriptionChange}/>
          </label>
          <label>
            Photo:
            <input value={this.state.photo} type="text" name="photo" onChange={this.handlePhotoChange}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
        {/* <img src={logoImg} alt="" /> */}
      </div>
    )
  }
 
}

export default hot(module)(Inputs)
