import React from 'react';
import NoteSidebar from '../../components/NoteSidebar/NoteSidebar';
import NoteTable from '../../components/NoteTable/NoteTable';
import { log } from '../../../utils/webutils';

const pspid = `NoteBodyView`;

export default class NoteBody extends React.Component {
  render() {
    return <div className="window-content">
      <div className="pane-group">
        <NoteSidebar
          items={this.props.items}
          options={this.props.options} />
        <NoteTable
          items={this.props.items}
          options={this.props.options} />
      </div>
    </div>;
  }
};
