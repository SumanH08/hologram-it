import React from "react";
import Reflux from "reflux";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
// import { SortableContainer } from "react-anything-sortable";

class Settings extends Reflux.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  handleChange = (i, e) => {
    if (!e.target.value) {
    } else if (isNaN(parseInt(e.target.value, 10))) {
      this.props.handleChange(0, i);
    } else {
      this.props.handleChange(parseInt(e.target.value, 10), i);
    }
  };

  handlePlus = i => {
    this.props.handlePlus(i);
  };

  handleMinus = i => {
    this.props.handleMinus(i);
  };

  render() {
    let settings = this.props.layers.map((item, i) => {
      return (
        <div className="settings-tab" key={i}>
          <div className="settings-elements">
            <i className="fas fa-ellipsis-v" />
            <div className="settings-elements">
              <img className="img-settings" alt="layers" src={item.img} />
            </div>
          </div>
          <div className="settings-elements">
            <div style={{ color: "#ccc", paddingBottom: "4px" }}>
              Layer {i + 1}
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <button
                  style={{ borderRight: "none" }}
                  type="button"
                  className="btn layer-btns"
                  onClick={this.handleMinus.bind(this, i)}
                >
                  -
                </button>
              </div>
              <input
                style={{
                  width: "20%",
                  borderTop: "1px solid #ccc",
                  borderBottom: "1px solid #ccc",
                  borderLeft: "none",
                  borderRight: "none",
                  textAlign: "center"
                }}
                type="number"
                pattern="[0-9]*"
                value={item.val}
                onChange={this.handleChange.bind(this, i)}
              />
              <div className="input-group-append">
                <button
                  style={{ borderLeft: "none" }}
                  type="button"
                  className="btn layer-btns"
                  onClick={this.handlePlus.bind(this, i)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="settings">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              How it works
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Settings
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent
          className="settings-content"
          activeTab={this.state.activeTab}
        >
          <TabPane tabId="1">
            <div className="app-desc">
              Hobbes ol buddy, <br />I wonder, is it better to do the right
              thing and fail or is it better to do the wrong thing and succeed?<br />{" "}
              Nothing is permanent. Everything changes. That’s the one thing we
              know for sure in this world. <br />Sometimes I think the surest
              sign that intelligent life exists elsewhere in the universe is
              that none of it has tried to contact us.
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div>{settings}</div>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

// <ButtonGroup>
//   <Button
//     outline
//     color="secondary"
//     onClick={this.handleMinus.bind(this, i)}
//   >
//     -
//   </Button>
//   <input
//     style={{ width: "20%" }}
//     type="number"
//     pattern="[0-9]*"
//     value={item.val}
//     onChange={this.handleChange.bind(this, i)}
//   />
//   <Button
//     outline
//     color="secondary"
//     onClick={this.handlePlus.bind(this, i)}
//   >
//     +
//   </Button>
// </ButtonGroup>

// <div
//   className="btn-group layer-btns"
//   role="group"
//   aria-label="Basic example"
// >
//   <button
//     type="button"
//     class="btn"
//     onClick={this.handleMinus.bind(this, i)}
//   >
//     -
//   </button>
//   <input
//     style={{ width: "20%" }}
//     type="number"
//     pattern="[0-9]*"
//     value={item.val}
//     onChange={this.handleChange.bind(this, i)}
//   />
//   <button
//     type="button"
//     class="btn"
//     onClick={this.handlePlus.bind(this, i)}
//   >
//     +
//   </button>
// </div>

export default Settings;
