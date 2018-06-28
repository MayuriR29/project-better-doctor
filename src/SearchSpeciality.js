import React from "react";
import { AutoComplete } from "antd";
const SearchSpeciality = props => {
  const dataSource = props.list.map((val, i) => {
    return {
      value: val.uid,
      text: val.name
    };
  });
  return (
    <div className="SearchSpeciality">
      <h4>Enter required Speciality</h4>
      <AutoComplete
        dataSource={dataSource}
        style={{ width: 200 }}
        onSearch={props.clickSpecialitySearch}
        onSelect={props.findDoc}
        placeholder="Speciality Name"
        filterOption={true}
      />
    </div>
  );
};
export default SearchSpeciality;
