import React from 'react';
import AppAction from '../../actions/AppAction';
import { log } from '../../../utils/webutils';

const pspid = `TabsView`;

export default class Tabs extends React.Component {
  componentDidMount() {
    AppAction.selectedContent(0, this.props.children[0].props.label);
  }

  handleClickTab(index, title, event) {
    event.preventDefault();
    AppAction.selectedContent(index, title);
  }

  renderTitles(child, index) {
    const selected = this.props.selected == index ? 'active' : '';
    const classNames = ['tab-item'];
    classNames.push(selected);
    return <div key={index}
      className={classNames.join(' ')}
      onClick={this.handleClickTab.bind(this, index, child.props.label)}
    >{child.props.label}</div>;
  }

  render() {
    const titles = this.props.children.map(this.renderTitles.bind(this));
    return <div className="tab-group">{titles}</div>;
  }
}

