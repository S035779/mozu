import React from 'react';
import NoteSidebar from '../../components/NoteSidebar/NoteSidebar';
import NoteTable from '../../components/NoteTable/NoteTable';
import { log } from '../../../utils/webutils';

const pspid = `NoteBodyView`;

export default class NoteBody extends React.Component {
  render() {
    return <div className="pane-group">
      <NoteSidebar
        page={this.props.page}
        items={this.props.items}
        categorys={this.props.categorys}
        options={this.props.options} />
      <NoteTable
        items={this.props.items}
        watch={this.props.watch}
        options={this.props.options} />
    </div>;
  }
};
