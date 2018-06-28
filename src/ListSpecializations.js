import { Menu, Dropdown, Icon } from "antd";
import React from "react";

const ListSpecializations = props => {
  const menu = (
    <Menu>
      {props.listSpec.map((specialties, index) => {
        return (
          <Menu.Item key={index}>
            <a>{specialties.name}</a>
          </Menu.Item>
        );
      })}
    </Menu>
  );
  return (
    <div>
      <input
        type="text"
        placeholder="Enter desired speciality"
        value={props.inputValue}
        onChange={props.inputChange}
      />
      <button onClick={props.clickSpecificDocSearch}>Find Doctor</button>
      <Dropdown overlay={menu} trigger={["click"]}>
        <a className="ant-dropdown-link" href="">
          Click me <Icon type="down" />
        </a>
      </Dropdown>
    </div>
  );
};
export default ListSpecializations;
