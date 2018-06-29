import React from "react";
const SpecialityDocDetails = props => {
  return (
    <div className="DoctorList">
      {props.list.map((eachDoc, index) => {
        return (
          <div key={index}>
            <h2>
              {eachDoc.profile.first_name} {eachDoc.profile.last_name}
            </h2>
            {eachDoc.profile.bio}
            <img alt="" src={eachDoc.profile.image_url} />
            
          </div>
        );
      })}
    </div>
  );
};
export default SpecialityDocDetails;
