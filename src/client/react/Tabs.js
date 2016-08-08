import React from 'react';
import { observer } from 'mobx-react';

import { UILang } from '../../crossover/constants/LangConstants';

@observer(['UIStore'])
export default class Tabs extends React.Component {

	_onClickTab(value) {
		console.log("Clicking tab");

		this.props.UIStore.setTab(value);
	}

	render() {
		const tabs = this.props.tabs.map((value, index) => {
			return (
				<div onClick={this._onClickTab.bind(this, value)} className={`tab tab-${index} ${value === this.props.UIStore.currentTab && "selected"}`} key={index}>{UILang.en[value]}</div>
			);
		});

		return (
			<div className="tabs">
				{tabs}
			</div>
		);
	}
}

Tabs.wrappedComponent.propTypes = {
	tabs: React.PropTypes.array.isRequired,
	UIStore: React.PropTypes.object.isRequired,
};
