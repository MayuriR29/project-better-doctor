import React from "react";
const NavBar = props => (
  <div>
    <ul id="nav">
      <li>
        <a onClick={() => props.loadComponent("searchDoctors")}>
          Retrieve a specific doctor description
        </a>
      </li>
      <li>
        <a onClick={() => props.loadComponent("searchSpecific")}>
          Find Specialist Doctor
        </a>
      </li>
    </ul>
  </div>
);
export default NavBar;
