import React, { Component } from 'react';

import CognitoUserStore from '../modules/CognitoUserStore';
import UserEditor from '../components/UserEditor';

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {}
    };
    this.getUserEmail = this.getUserEmail.bind(this);
  }

  componentWillMount() {
    this.getUserEmail();
  }

  async getUserEmail() {
    const url = this.props.location.pathname;
    const email = url.slice(url.indexOf('edit/') + 5);
    let user;
    await CognitoUserStore.searchByEmail(email)
      .then(r => {
        console.log(r);
        user = r;
      })
      .catch(err => console.log(err));
    this.setState({ user });
    return user;
  }

  render() {
    const { user } = this.state;
    const editor = user ? (
      <div>
        <h5 className="center-align">
          {user.Attributes['given_name']} {user.Attributes['family_name']}
        </h5>
        <UserEditor user={user} />
      </div>
    ) : (
      'no user'
    );
    return (
      <div className="container">
        <h3 className="center-align">Edit User</h3>
        {editor}
      </div>
    );
  }
}

export default UserDetails;
