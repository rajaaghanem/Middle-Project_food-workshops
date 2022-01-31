import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = { spans: 0, didLoad: false };
    this.imageRef = React.createRef();
  }

  componentDidMount() {
    this.imageRef.current.addEventListener("load", this.setSpans);
  }

  setSpans = () => {
    const height = this.imageRef.current.clientHeight;
    const spans = Math.ceil(height / 10);
    this.setState({ didLoad: true });
    this.setState({ spans });
  };

  render() {
    return (
      <div
        key={uuidv4()}
        style={{
          gridRowEnd: `span ${this.state.spans} ${
            this.state.didLoad ? "" : { visibility: "hidden" }
          }`,
        }}
      >
        <img ref={this.imageRef} src={this.props.img} alt="food" />
      </div>
    );
  }
}
