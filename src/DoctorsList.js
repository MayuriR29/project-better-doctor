import React from "react";
const DoctorsList = props => {
  console.log("in DoctorsList", props.list);
  return (
    <div>
      {props.list.map((eachDoc, index) => {
        return <h1 key={index}>{eachDoc.profile.slug}</h1>;
      })}
    </div>
  );
};
export default DoctorsList;
