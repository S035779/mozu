import React from 'react';
import { Link } from 'react-router-dom';
import { log } from '../../../utils/webutils';

const pspid = `TabsView`;

export default class Tabs extends React.Component {
  render() {
    return <div className="tab-group">
      <div className="tab-item active">
      Search of items
      </div>
      <div className="tab-item">
      Available watch-items
      </div>
      <div className="tab-item">
      Completed watch-items
      </div>
    </div>;
  }
}

