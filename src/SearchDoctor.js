import React from "react";
const SearchDoctor = props => {
  return (
    <div>
      <input
        type="text"
        placeholder="Doctor name"
        value={props.inputValue}
        onChange={props.inputChange}
      />
      <button onClick={props.clickSearch}>Search Doctor</button>
    </div>
  );
};
export default SearchDoctor;
