import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export class LayerSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.getItems(10)
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.grid = 8;
  }

  // fake data generator
  getItems = count =>
    this.props.layers.map((item, k) => ({
      id: `item-${k}`,
      content: `${item.img}`,
      val: `${item.val}`
    }));

  // a little function to help us with reordering the result
  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  // const grid = 8;

  getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: this.grid * 2,
    margin: `0 0 ${this.grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "grey" : "white",

    // styles we need to apply on draggables
    ...draggableStyle
  });

  getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightgrey" : "grey",
    padding: this.grid,
    width: 250
  });

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = this.reorder(
      this.props.layers,
      result.source.index,
      result.destination.index
    );

    console.log(items);

    this.props.setLayers(items);

    this.setState({
      items
    });
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

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              // style={this.getListStyle(snapshot.isDraggingOver)}
            >
              {this.props.layers.map((item, index) => (
                <Draggable key={index} draggableId={item.img} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      // style={this.getItemStyle(
                      //   snapshot.isDragging,
                      //   provided.draggableProps.style
                      // )}
                    >
                      <div className="settings-elements">
                        <i className="fas fa-ellipsis-v" />
                      </div>
                      <div className="settings-elements">
                        <img
                          className="img-settings"
                          src={item.img}
                          alt="eachimg"
                        />
                      </div>
                      <div className="settings-elements">
                        <div style={{ color: "#ccc", paddingBottom: "4px" }}>
                          Layer {index + 1}
                        </div>
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <button
                              style={{ borderRight: "none" }}
                              type="button"
                              className="btn layer-btns"
                              onClick={this.handleMinus.bind(this, index)}
                            >
                              -
                            </button>
                          </div>
                          <input
                            className="number-input"
                            type="number"
                            pattern="[0-9]*"
                            value={item.val}
                            onChange={this.handleChange.bind(this, index)}
                          />
                          <div className="input-group-append">
                            <button
                              style={{ borderLeft: "none" }}
                              type="button"
                              className="btn layer-btns"
                              onClick={this.handlePlus.bind(this, index)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

// Put the thing into the DOM!
// ReactDOM.render(<Test />, document.getElementById("root"));
