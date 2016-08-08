import React from 'react';
import { observer } from 'mobx-react';

import { CTabs } from '../../crossover/constants/UIConstants';

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
			<div className="tabs-block">
				<div className=""></div>
				{tabs}
			</div>
		);
	}
}

Layout.wrappedComponent.propTypes = {
	tabs: React.PropTypes.array.isRequired,
	UIStore: React.PropTypes.object.isRequired,
};
