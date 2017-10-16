import React from 'react';

export default class Radio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
  }

  handleChange(event) {
    if(this.props.onChange) {
      this.props.onChange(event);
    }
    this.setState({
      value: event.target.value
    });
  }

  render() {
    const value = this.props.value || this.state.value;
    let children = React.Children.map(this.props.children
    , function(child, i) {
      return <div className="radio">
        <label><input type="radio"
          name={this.props.name}
          value={child.props.value}
          checked={child.props.value === value}
          onChange={this.handleChange.bind(this)} />
        {child.props.children}</label>
      </div>;
    }.bind(this));
    return <span>{children}</span>;
  }
};
