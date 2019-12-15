import React from 'react';

class InputBox extends React.Component {

  state = {
    value: 1
  }

  handleInputChange = (e) => {
    if (!isNaN(e.target.value) || e.target.value !== '') {
      this.setState({
        value: e.target.value
      }, () => {
        this.props.multiply(this.state.value);
      });
    } else {
      return null;
    }
  }

  checkValue = () => {
    if (isNaN(this.state.value) || this.state.value <= 0) {
      this.resetValueAndMultiply();
    } else {
      this.props.multiply(this.state.value);
    }
  }

  resetValueAndMultiply = () => {
    this.setState({value: 1}, () => {this.props.multiply(this.state.value)});
  }

  render() {
    return(
      <div className="product-info">
        <input
          onBlur={this.checkValue}
          maxLength={2} 
          type="text" 
          onChange={(e) => this.handleInputChange(e)}
          value={this.state.value}>
        </input>
      </div>
    );
  }
}

export default InputBox;