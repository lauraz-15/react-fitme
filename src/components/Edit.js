import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const Edit = React.forwardRef(({ onClick }, ref) => (
    <i
      className="fa-solid fa-pen-to-square"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}>
    
    </i>
  ));

  export const EditDropdown = () => {
    return (
        <Dropdown>
          <Dropdown.Toggle as={Edit} id="dropdown-custom-components">
            Custom toggle
          </Dropdown.Toggle>
      
          <Dropdown.Menu>
            <Dropdown.Item eventKey="1">Red</Dropdown.Item>
            <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
            <Dropdown.Item eventKey="3" active>
              Orange
            </Dropdown.Item>
            <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
  };
  