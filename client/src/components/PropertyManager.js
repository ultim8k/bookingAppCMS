import React, { Component } from 'react';
import PropertyItem from '../components/PropertyItem';
import axios from '../modules/axios';

class ApiPropertyManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'Stephen',
      properties: []
    };
    this.deleteProperty = this.deleteProperty.bind(this);
    this.getProperties = this.getProperties.bind(this);
  }

  deleteProperty(property) {
    axios
      .delete('/properties/' + property.id)
      .then(() => {
        const properties = this.state.properties;
        const index = properties.indexOf(property);
        properties.splice(index, 1);
        this.setState({ properties });
        alert(`"${property.title}" has been successfully deleted`);
      })
      .catch(function(error) {
        console.log('delete error: ', error);
      });
  }

  getProperties() {
    axios
      .get('/properties/search')
      .then(response => {
        const properties = response.data;
        this.setState({ properties });
        return properties;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getProperties();
  }

  render() {
    let properties = this.state.properties;
    return (
      <div className="container">
        <h2 className="center-align">Properties</h2>
        {properties.map(property => {
          return (
            <PropertyItem
              property={property}
              key={property.id}
              deleteProperty={this.deleteProperty}
            />
          );
        })}
      </div>
    );
  }
}

export default ApiPropertyManager;
