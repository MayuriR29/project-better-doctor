import React from "react";

const DoctorsList = props => {
  console.log('length',props.list.length);
    return (    
      <div className='DoctorList'>
        {props.list.map((eachDoc, index) => {
          return (         
            <div key={index}>
              <h2>{eachDoc.profile.first_name}{" "}{eachDoc.profile.last_name}</h2>
              {eachDoc.profile.bio}    
              <img alt="" src={eachDoc.profile.image_url}/>        
            </div>         
          );
        })}
      </div>
    );
};
export default DoctorsList;
