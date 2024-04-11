import React, { Component } from "react";

export default class InfoCard extends Component {
  render() {
    return (
      <div
        className="card medium"
        style={{ marginLeft: "50px", marginRight: "50px" }}
      >
        <div className="card-image">
          <img src={this.props.imageUrl} />
          <span className="card-title white-text bold">{this.props.title}</span>
        </div>
        <div className="card-content">
          <p>{this.props.description}</p>
        </div>
        <div className="card-action">
          <a href="{props.linkUrl}">{this.props.linkText}</a>
        </div>
      </div>
    );
  }
}
