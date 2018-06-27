import React from "react";
const ListSpecializations = props => {
  return (
    <div>
      <input
        type="text"
        placeholder="Enter desired speciality"
        value={props.inputValue}
        onChange={props.inputChange}
      />
      <button onClick={props.clickSearch}>Find Doctor</button>
      <ul>
        {props.listSpec.map((specialties, index) => {
          return <li key={index}> {specialties.name}</li>;
        })}
      </ul>
    </div>
  );
};
export default ListSpecializations;
