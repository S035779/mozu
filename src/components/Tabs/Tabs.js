import React from 'react';
import { log } from '../../../utils/webutils';

const pspid = `TabsView`;

export default class Tabs extends React.Component {
  componentDidMount() {
    const children = this.props.children;
    const title = React.Children.count(children) > 1
      ? children[0].props.label
      : children.props.label;
    this.props.onChangeTab(0, title);
  }

  handleChangeTab(index, title, event) {
    event.preventDefault();
    this.props.onChangeTab(index, title);
  }

  renderTitles(child, index) {
    const selected = this.props.selected == index
      ? 'active' : '';
    const classNames = ['tab-item'];
    classNames.push(selected);
    return <div key={index} className={classNames.join(' ')}
      onClick={
        this.handleChangeTab.bind(this, index, child.props.label)
      }>{child.props.label}</div>;
  }

  render() {
    const children = this.props.children;
    const titles = React.Children.count(children) > 1
      ? children.map(this.renderTitles.bind(this))
      : this.renderTitles(children, 0);
    return <div className="tab-group">{titles}</div>;
  }
}

