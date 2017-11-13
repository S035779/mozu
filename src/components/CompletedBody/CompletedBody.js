import React from 'react';
import CompletedSidebar from '../../components/CompletedSidebar/CompletedSidebar';
import CompletedTable from '../../components/CompletedTable/CompletedTable';
import { log } from '../../../utils/webutils';

const pspid = `CompletedBodyView`;

export default class CompletedBody extends React.Component {
  render() {
    return <div className="pane-group">
      <CompletedSidebar
        page={this.props.page}
        items={this.props.items} />
      <CompletedTable
        items={this.props.items}
        watch={this.props.watch} />
    </div>;
  }
};
