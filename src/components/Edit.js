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
          <Dropdown.Toggle as={Edit}>
            Custom toggle
          </Dropdown.Toggle>
      
          <Dropdown.Menu>
            <Dropdown.Item onClick={()=> {}} aria-label="edit">Edit</Dropdown.Item>
            <Dropdown.Item onClick={()=> {}} aria-label="delete">Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
  };
  