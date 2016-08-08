import React from 'react';
import { observer } from 'mobx-react';

import { CTabs } from '../../crossover/constants/UIConstants';

import { imageRequire } from '../../utils/universalRequire';
const logo = imageRequire('logo.png');

const tabText = {};
tabText[CTabs.USER] = "User Profile";
tabText[CTabs.COUNTER] = "Pointless Counter";

@observer(['UIStore'])
export default class Layout extends React.Component {

	_onClickTab(value) {
		console.log("Clicking tab");

		this.props.UIStore.setTab(value);
	}

	render() {
		const tabs = this.props.tabs.map((value, index) =>
				<div
					onClick={this._onClickTab.bind(this, value)}
					className={`tab tab-${index}${value === this.props.UIStore.currentTab ? " selected" : ""}`}
					key={index}
				>
					{tabText[value]}
				</div>
		);

		return (
			<div className="layout">
				<img src={logo} alt="Isn't it dainty?" />
				<div className="tabs">{tabs}</div>
				<div className="content">
					{this.props.children}
				</div>
			</div>
		);
	}
}

Layout.wrappedComponent.propTypes = {
	tabs: React.PropTypes.array.isRequired,
	UIStore: React.PropTypes.object.isRequired,
};
