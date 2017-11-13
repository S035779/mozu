import React from 'react';
import CompletedAction from '../../actions/CompletedAction';
import Sparkline from '../../components/Sparkline/Sparkline';
import std from '../../../utils/stdutils';
import { log } from '../../../utils/webutils';

const pspid = `CompletedTableView`;

export default class CompletedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state=Object.assign({}, props.watch);
  }

  componentDidMount() {
    CompletedAction.fetchWatchIds();
    CompletedAction.incrementCloseWatch(0);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.watch);
  }

  handleChangeImage(index) {
    log.info(`${pspid}>`, 'handleChangeImage');
    const newState = {};
    if(this.state.hasOwnProperty(index) && this.state[index]) {
      CompletedAction.deleteWatch(index, this.state).then(() => {
        newState[index] = false;
        this.setState(newState);
      });
    } else {
      CompletedAction.createWatch(index, this.state).then(() => {
        newState[index] = true;
        this.setState(newState);
      })
    }
  }

  renderStatus(status) {
    let styles;
    switch(status) {
      case 0:
        styles = { fontWeight:'bold', color: 'blue' };
        return <div style={styles}>Now available.</div>;
      case 1:
        styles = { fontWeight:'bold', color: 'orange' };
        return <div style={styles}>New added.</div>;
      case 2:
        styles = { fontWeight:'bold', color: 'red' };
        return <div style={styles}>Removed.</div>;
    }
  };

  renderExtension() {
    return <div>( Auto Extension )</div>;
  }

  renderBids(bids) {
    if(!bids) return null;
    const points = Array.isArray(bids)
      ? bids.map(obj => parseInt(obj.Price, 10))
      : [ parseInt(bids.Price, 10) ];
    return <Sparkline points={points} />
  }
  
  renderItem(obj) {
    const item = obj.Item.ResultSet.Result;
    const bids = obj.Bids.ResultSet.Result;
    const Img = item.Img.Image1 ? item.Img.Image1 : '';
    const Aid = item.AuctionID;
    const Sid = item.Seller.Id;
    const Stm = std.getLocalTimeStamp(item.StartTime);
    const Etm = std.getLocalTimeStamp(item.EndTime);
    const Url = item.AuctionItemUrl;
    const Ttl = item.Title;
    const Bid = item.Bids;
    const Prc = parseInt(item.Price, 10).toLocaleString();
    const Cdn = item.ItemStatus.Condition;
    const Cgp = item.CategoryPath;
    const Stt = item.Status;
    const Cht = this.renderBids(bids);
    const stt = this.renderStatus(0);
    const Ext = item.IsAutomaticExtension === 'true'
      ? this.renderExtension() : '';
    const Upd = std.getLocalTimeStamp(Date.now());
    const selected = this.state.hasOwnProperty(Aid)
      && this.state[Aid] ? 'watch' : '';

    return <tr key={Aid}>
      <td className={selected}
        onClick={this.handleChangeImage.bind(this, Aid)}>
        <img src={Img} width='128' height='128' /></td>
      <td><span>
        <a href={Url} target='_blank'>{Ttl}</a><br />
        </span>
        <span>
        Bid period : {Stm} ~ {Etm}<br />
        Condition : {Cdn}<br />
        Seller : {Sid}<br />
        AuctionID : {Aid}<br />
        Category : {Cgp}
      </span></td>
      <td>{Cht}</td>
      <td><span>{Prc} yen</span><br /><span>( {Bid} bids )</span>
      </td>
      <td><span>{Stt}</span><br /><span>{Ext}</span></td>
      <td><span>{stt}</span><br /><span>{Upd}</span></td>
    </tr>;
  }

  render() {
    const items = this.props.items
      ? this.props.items.map(item => this.renderItem(item))
      : null;
    return <div id="items" className="pane">
      <table className="table-striped">
      <thead><tr>
      <th>Image</th>
      <th>Detail</th>
      <th>Chart</th>
      <th>Bids</th>
      <th>Status</th>
      <th>Update</th>
      </tr></thead>
      <tbody>{items}</tbody>
      </table>
    </div>;
  }
};

