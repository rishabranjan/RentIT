import React from "react";

const ListGroup = props => {
  const { valueProperty, textProperty, onItemSelect, selectedItem } = props;

  return (
    <ul className="list-group">
      {props.items.map(item => (
        <li
          key={item[valueProperty]}
          className={
            item[textProperty] === selectedItem.name
              ? "list-group-item active clickable"
              : "list-group-item clickable"
          }
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
