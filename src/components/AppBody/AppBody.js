import React from 'react';
import AppSidebar from '../../components/AppSidebar/AppSidebar';
import AppForm from '../../components/AppForm/AppForm';
import { log } from '../../../utils/webutils';

const pspid = `AppBodyView`;

export default class AppBody extends React.Component {
  render() {
    return <div className="pane-group">
      <AppSidebar />
      <AppForm config={this.props.config}/>
    </div>;
  }
};
