import React from 'react';
import { log } from '../../../utils/webutils';

const pspid = `ContensView`;

class Contents extends React.Component {
  render() {
    const selected = this.props.selected;
    //log.trace(`${pspid}>`, 'selected:', selected);
    const contents
      = React.Children.count(this.props.children) > 1
      ? this.props.children[selected]
      : this.props.children;
    return <div className="window-content">{contents}</div>;
  }
}
export default Contents;
