import React from "react";
import Reflux from "reflux";
import {
  TabContent,
  Table,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  ButtonGroup
} from "reactstrap";
import classnames from "classnames";

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
        <div key={i} className="each-layer">
          <Table borderless>
            <tbody>
              <tr>
                <td>
                  <i class="fas fa-ellipsis-v" />
                </td>
                <td>
                  <img className="img-settings" alt="layers" src={item.img} />
                </td>
                <td>
                  <ButtonGroup>
                    <Button
                      outline
                      color="secondary"
                      onClick={this.handleMinus.bind(this, i)}
                    >
                      -
                    </Button>
                    <input
                      style={{ width: "20%" }}
                      type="number"
                      pattern="[0-9]*"
                      value={item.val}
                      onChange={this.handleChange.bind(this, i)}
                    />
                    <Button
                      outline
                      color="secondary"
                      onClick={this.handlePlus.bind(this, i)}
                    >
                      +
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            </tbody>
          </Table>
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
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <div className="app-desc">
              I wondered, is it better to do the right thing and fail or is it
              better to do the wrong thing and succeed? Nothing is permanent.
              Everything changes. That’s the one thing we know for sure in this
              world. Sometimes I think the surest sign that intelligent life
              exists elsewhere in the universe is that none of it has tried to
              contact us.
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

export default Settings;
