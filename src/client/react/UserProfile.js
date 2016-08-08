import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';

import { getRandomUser } from '../../crossover/api/userApi';

// import CounterStore from '../../crossover/mobx/stores/CounterStore';

@observer(["UserStore"])
export default class UserProfile extends Component {

	_onClickGetRandomUser() {
		// this.props.UserStore.setUser({});

		getRandomUser().then((resp) => {
			this.props.UserStore.setUser(resp);
		});
	}

	render() {
		// const { userProfile } = this.props.UserStore;

		const userProfile = this.props.UserStore.userProfile;

		return (
			<div className="content-block">
				<div className="user-profile">
					<h2 className="user-name">{userProfile.name.first} {userProfile.name.last}</h2>
					<img src={userProfile.picture.large} alt="User profile" />
				</div>
				<div className="extra-info">User information retreived from API (randomuser.me) and rendered on the server (try view source)</div>
				<button onClick={this._onClickGetRandomUser.bind(this)}>Get Another Random User</button>
			</div>
		);
	}
}

UserProfile.wrappedComponent.propTypes = {
	UserStore: PropTypes.object.isRequired,
};
