import React from "react";
import Reflux from "reflux";

class View extends Reflux.Component {
  render() {
    const { layers, isRotating, alpha, beta } = this.props;
    let stackImages = layers.map((item, i) => {
      let unit;
      if (isRotating) {
        unit = item.val;
      } else {
        unit = 1;
      }
      return (
        <img
          style={{
            zIndex: -1 * i,
            top: `${Math.sin(alpha * unit * 10)}px`,
            left: `${Math.cos(beta * unit * 10)}px`
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
