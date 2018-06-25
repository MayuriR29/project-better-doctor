/*render() {
    console.log('this.state.doctors in render',this.state.doctors)
    return (
      <div>
        <h1>Welcome To Better Doctor</h1>
        {this.state.doctors.map((val,index)=>{
          return <h2 key={index}>{val.profile.slug}</h2>
        }
        )}
      </div>
    );
}
*/
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
