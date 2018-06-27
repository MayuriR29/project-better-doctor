import React from "react";
const DoctorsList = props => {
  console.log("in DoctorsList", props.list);
  return (
    <div>
      {props.list.map((eachDoc, index) => {
        return (
          <p key={index}>
            {eachDoc.profile.slug}
            <br />
            {eachDoc.profile.bio}
          </p>
        );
        // <li key={index}>{eachDoc.profile.slug}</li>
      })}
    </div>
  );
};
export default DoctorsList;
