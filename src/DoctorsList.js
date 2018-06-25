import React from "react";
const DoctorsList = props => {
  console.log("in DoctorsList", props.list);
  return (
    <div>
        <ul>
        {props.list.map((eachDoc, index) => {
        return <li key={index}>{eachDoc.profile.slug}</li> 
      })}
        </ul>
       
        
    </div>
  );
};
export default DoctorsList;
