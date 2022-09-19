import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useHistory } from "react-router";


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

  export const EditDropdown = ({handleEdit, handleDelete}) => {
    return (
        <Dropdown>
          <Dropdown.Toggle as={Edit}>
            Custom toggle
          </Dropdown.Toggle>
      
          <Dropdown.Menu popperConfig={{ strategy: "fixed" }}>
            <Dropdown.Item onClick={handleEdit} aria-label="edit">Edit</Dropdown.Item>
            <Dropdown.Item onClick={handleDelete} aria-label="delete">Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
  };
  
  export function AccountEditDropdown({ id }) {
    const history = useHistory();
    return (
      <Dropdown>
        <Dropdown.Toggle as={Edit} />
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => history.push(`/accounts/${id}/edit`)}
            aria-label="edit-profile-info">
            Edit My Profile Info
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => history.push(`/accounts/${id}/edit/username`)}
            aria-label="username-edit">
            Edit My Username
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => history.push(`/accounts/${id}/edit/password`)}
            aria-label="update-password">
            Change My Password
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }