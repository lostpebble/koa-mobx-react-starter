import React from 'react';
import { observer } from 'mobx-react';
import { imageRequire } from '../../utils/universalRequire';

import { CTabs } from '../../crossover/constants/UIConstants';
import { GithubIcon } from './svg/svgIcons';

// for the server return a reference to the
// path for this image. Otherwise, deal with
// it as a normal webpack import
const logo = imageRequire('logo.png');

const tabText = {};
tabText[CTabs.USER] = "User Profile";
tabText[CTabs.COUNTER] = "Pointless Counter";

@observer(['UIStore'])
export default class TabbedLayout extends React.Component {

	_onClickTab(value) {
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
				<a target="_blank" href="https://github.com/lostpebble/koa-mobx-react-starter" className="blurb"><GithubIcon/>koa-mobx-react-starter</a>
				<div className="tabs">{tabs}</div>
				<div className="content">
					{this.props.children}
				</div>
			</div>
		);
	}
}

TabbedLayout.wrappedComponent.propTypes = {
	tabs: React.PropTypes.array.isRequired,
	UIStore: React.PropTypes.object.isRequired,
};
