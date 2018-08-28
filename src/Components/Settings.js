import React from "react";
import Reflux from "reflux";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { LayerSettings } from "./LayerSettings.js";
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
            <div>
              <LayerSettings {...this.props} />
            </div>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default Settings;
