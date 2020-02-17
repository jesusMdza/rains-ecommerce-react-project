import React from 'react';

import Description from './Description';

class DescriptionContainer extends React.Component {

  state = {
    description: ""
  }

  componentDidMount() {
    this.getDescription();
  }

  getDescription = () => {
    const data = this.props.data;
    data.forEach(object => 
      {
        if (this.props.idParam === object.product.id) {
            this.setState({
              description: object.product.description
          });
        }
      }
    );
  }

  render() {
    return(
      <Description 
        description={this.state.description}
      />
    );
  }
};

export default DescriptionContainer;