import React from 'react';
import './MainForm.css';
class MainForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    if (this.state.value === '') {
      event.preventDefault();
      return;
    }
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form className="main-form" onSubmit={this.handleSubmit}>
        {' '}
        <label className="form-label" for="cardform">
          Your Argument:
          <br />
          <textarea
            id="cardform"
            className="form-textarea"
            value={this.state.value}
            onChange={this.handleChange}
          />{' '}
        </label>
        <br />
        <input type="submit" className="form-btn" value="Place card" />
      </form>
    );
  }
}
export default MainForm;
