import React from "react";

const DoctorsList = props => {
  console.log("in DoctorsList", props.list);
  return (
    <div className='DoctorList'>
      {props.list.map((eachDoc, index) => {
        return (         
          <p key={index}>
            {eachDoc.profile.slug}
            <br />
            {eachDoc.profile.bio}    
            <img alt="" src={eachDoc.profile.image_url}/>        
          </p>         
        );
      })}
    </div>
  );
};
export default DoctorsList;
