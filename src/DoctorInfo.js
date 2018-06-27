import React from "react";
const DoctorInfo = props => {
  console.log("in DoctorInfo", props.eachDocInfo);
  return (
      <div>
          <p onClick={props.clickEachDoc}>{props.eachDocInfo.bio}</p>
      </div>
  );
};
export default DoctorInfo;
