import React from 'react';
import { log } from '../../../utils/webutils';

const pspid = `ContensView`;

class Contents extends React.Component {
  render() {
    const contnt = this.props.children[this.props.selected];
    return <div className="window-content">{contnt}</div>;
  }
}
export default Contents;
