import React from 'react';
import NoteAction from '../../actions/NoteAction';
import Radio from '../../components/Radio/Radio';
import { log } from '../../../utils/webutils';
import std from '../../../utils/stdutils';

const pspid = `NoteSidebarView`;

export default class NoteSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.options);
  }

  componentDidMount() {
    NoteAction.fetchCategorys(this.state.category);
  }

  handleChangeHome(e) {
    log.info(`${pspid}> Request: handleChangeHome`);
    NoteAction.increment(this.props.options, 0);
  }

  handleIncrement(e) {
    log.info(`${pspid}> Request: handleIncrement`);
    NoteAction.increment(this.props.options, this.props.page);
  }

  handleDecrement(e) {
    log.info(`${pspid}> Request: handleDecrement`);
    NoteAction.decrement(this.props.options, this.props.page);
  }

  handleChangeSearch(e) {
    log.info(`${pspid}> Request: handleChangeSearch`);
    e.preventDefault();
    NoteAction.increment(this.state, 0);
    NoteAction.fetchCategorys(this.state.category);
  }

  handleChangeReset() {
    log.info(`${pspid}> Request: handleChangeReset`);
    this.setState({
      highestPrice: ''
      , lowestPrice: ''
      , bids: false
      , condition: 'all'
      , AuctionID: []
      , seller: []
      , category: []
    });
  }

  handleChangeText(name, e) {
    let newState = {};
    newState[name] = e.target.value;
    this.setState(newState);
  }

  handleChangeCheckbox(name, e) {
    let newState = {};
    newState[name] = e.target.checked;
    this.setState(newState);
  }

  handleChangeRadio(name, e) {
    let newState = {};
    newState[name] = e.target.value;
    this.setState(newState);
  }

  handleChangeSelect(name, e) {
    let newState = {};
    let options = e.target.options;
    let values = [];
    for( let i=0; i<options.length; i++) {
      if(options[i].selected) values.push(options[i].value);
    }
    newState[name] = values;
    this.setState(newState);
  }

  renderOption(objs, prop1, prop2) {
    if(!objs) return null;
    const len = arguments.length;
    const items = objs.map(obj => {
      if(!obj.Item.hasOwnProperty('ResultSet')) return null;
      return (len === 2)
        ? obj.Item.ResultSet.Result[prop1]
        : obj.Item.ResultSet.Result[prop1][prop2];
    })
    const opts = std.dst(items);
    return opts.map((opt, idx) => {
      return <option
        key={"choice-" + idx} value={opt} >{opt}</option>;
    })
  }

  renderCategory(array, prop) {
    return array.length ? array.map((opt,idx) => (<option
      key={"choice-" + idx} value={opt.id} >{opt.name}
    </option>)) : '';
  }

  render() {
    const page = this.props.page;
    const items = this.props.items ? this.props.items : null;
    const categorys = this.props.categorys ? this.props.categorys : null;
    const optSelrs = this.renderOption(items, 'Seller', 'Id');
    const optAuIDs = this.renderOption(items, 'AuctionID');
    const optCtgys = this.renderCategory(categorys, 'name');
    return <div className="pane pane-sm sidebar">
    <nav className="nav-group">
      <h5 className="nav-group-title">Functions</h5>
      <span className="nav-group-item"
        onClick={this.handleChangeHome.bind(this)}>
        <span className="icon icon-home"></span>
        Home ({page} page)
      </span>
      <span className="nav-group-item"
        onClick={this.handleIncrement.bind(this)}>
        <span className="icon icon-right-bold"></span>
        Next
      </span>
      <span className="nav-group-item"
        onClick={this.handleDecrement.bind(this)}>
        <span className="icon icon-left-bold"></span>
        Previous
      </span>
      <h5 className="nav-group-title">Title</h5>
      <span className="nav-group-item">
        <div className="form-group">
        <input type="text"
          className="form-control"
          placeholder="Search of items"
          value={this.state.searchString}
          onChange={
            this.handleChangeText.bind(this, 'searchString')} />
        </div>
      </span>
      <span className="nav-group-item">
        <div className="form-actions">
        <button className="btn btn-mini btn-default"
          onClick={this.handleChangeReset.bind(this)}>Reset
        </button>
        <button className="btn btn-mini btn-primary"
          onClick={this.handleChangeSearch.bind(this)}>Search
        </button>
        </div>
      </span>
      <h5 className="nav-group-title">Category</h5>
      <span className="nav-group-item">
        <select className="form-control"
          multiple={false}
          value={this.state.category}
          onChange={this.handleChangeSelect.bind(this, 'category')}
        >{optCtgys}</select>
      </span>
      <h5 className="nav-group-title">Seller</h5>
      <span className="nav-group-item">
        <select className="form-control"
          multiple={true}
          value={this.state.seller}
          onChange={this.handleChangeSelect.bind(this, 'seller')}
        >{optSelrs}</select>
      </span>
      <h5 className="nav-group-title">AuctionID</h5>
      <span className="nav-group-item">
        <select className="form-control"
          multiple={true}
          value={this.state.AuctionID}
          onChange={
            this.handleChangeSelect.bind(this, 'AuctionID')}
        >{optAuIDs}</select>
      </span>
      <h5 className="nav-group-title">Price</h5>
      <span className="nav-group-item">
        <div className="form-group">
        <input type="text"
          className="form-control"
          placeholder="Highest price" 
          value={this.state.highestPrice}
          onChange={
            this.handleChangeText.bind(this, 'highestPrice')} />
        </div>
      </span>
      <span className="nav-group-item">
        <div className="form-group">
        <input type="text"
          className="form-control"
          placeholder="Lowest price" 
          value={this.state.lowestPrice}
          onChange={
            this.handleChangeText.bind(this, 'lowestPrice')} />
        </div>
      </span>
      <h5 className="nav-group-title">Bids</h5>
      <span className="nav-group-item">
        <div className="checkbox">
        <label><input type="checkbox" 
          value="bids" 
          checked={this.state.bids}
          onChange={
            this.handleChangeCheckbox.bind(this, 'bids')} />
        bids only.</label>
        </div>
      </span>
      <h5 className="nav-group-title">Condition</h5>
      <span className="nav-group-item">
        <Radio name="condition"
          value={this.state.condition}
          onChange={
            this.handleChangeRadio.bind(this, 'condition')} >
          <option value="all">all</option>
          <option value="new">new</option>
          <option value="used">used</option>
          <option value="other">other</option>
        </Radio>
      </span>
    </nav>
    </div>;
  }
};
