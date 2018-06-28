import React from "react";
import { AutoComplete } from "antd";
const SearchSpeciality = props => {
  const dataSource = props.list.map((val, i) => {
    return {
        value: val.uid,
        text: val.name,
    };
  });

  return (
    <div>
      {/* <input
        type="text"
        placeholder="Speciality Name"
        value={props.inputValue}
        onChange={props.inputChange}
      /> */}
      <AutoComplete
        dataSource={dataSource}
        style={{ width: 200 }}
        // onChange={props.inputChange}
        onSearch={props.clickSpecialitySearch}
        onSelect={props.findDoc}
        placeholder="Speciality Name"
        filterOption={true}
      />
      <button onClick={props.clickSpecialitySearch}> 
        Search Specialiality
      </button>
    </div>
  );
};
export default SearchSpeciality;
