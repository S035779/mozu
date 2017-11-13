import React from 'react';
import AvailableSidebar from '../../components/AvailableSidebar/AvailableSidebar';
import AvailableTable from '../../components/AvailableTable/AvailableTable';
import { log } from '../../../utils/webutils';

const pspid = `AvailableBodyView`;

export default class AvailableBody extends React.Component {
  render() {
    return <div className="pane-group">
      <AvailableSidebar
        page={this.props.page}
        items={this.props.items} />
      <AvailableTable
        items={this.props.items}
        watch={this.props.watch} />
    </div>;
  }
};
