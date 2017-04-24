import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import { PhoneIcon } from './svg/svgIcons';

@inject("UserStore") @observer
export default class UserProfile extends Component {

  constructor(props) {
    super(props);

    // This :: thing is the "bind operator" that is currently being proposed
    // for next javascript releases. It is essentially the same
    // as adding .bind(this) to the end of a function. We need to bind
    // our function to make sure that it runs in the context of the
    // UserStore
    this._getNewRandomUser = ::this.props.UserStore.getNewRandomUser;
  }

  render() {
    const { userProfile } = this.props.UserStore;

    return (
      <div className="content-block">
        <div className={`user-profile ${this.props.UserStore.loadingUser ? "loading" : ""}`}>
          <h2 className="user-name">{userProfile.name.first} {userProfile.name.last}</h2>
          <img key={userProfile.picture.large} src={userProfile.picture.large} alt="User profile" />
          <h3 className="user-phone"><PhoneIcon />{userProfile.phone}</h3>
          <h3 className="user-address">{`${userProfile.location.street}, ${userProfile.location.city}`}</h3>
        </div>
        <div className="extra-info">User information retrieved from API (randomuser.me) and rendered on the server (try
          view source)
        </div>
        <div className="extra-info">We can then continue to dynamically retrieve users (using exactly the same code
          behind the scenes) with the button below
        </div>
        <button onClick={this._getNewRandomUser}>Get Another Random User</button>
      </div>
    );
  }
}

UserProfile.wrappedComponent.propTypes = {
  UserStore: PropTypes.object.isRequired,
};
