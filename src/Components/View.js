import React from "react";
import Reflux from "reflux";

class View extends Reflux.Component {
  render() {
    console.log("Inside view", this.props.alpha);

    let stackImages = this.props.layers.map((item, i) => {
      let unit;
      if (this.props.isRotating) {
        unit = item.val;
      } else {
        unit = 1;
      }
      return (
        <img
          style={{
            zIndex: -1 * i,
            top: `${item.val * this.props.beta}px`,
            left: `${item.val * this.props.alpha}px`,
            bottom: `${item.val * this.props.beta}px`,
            right: `${item.val * this.props.gamma}px`
          }}
          key={i}
          id={`img-${i}`}
          className="img-stack"
          src={item.img}
          alt="psd-layers"
        />
      );
    });
    return <div>{stackImages}</div>;
  }
}

export default View;
