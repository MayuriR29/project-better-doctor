import React, { Component } from "react";
import "./App.css";
import DoctorsList from "./DoctorsList";
import SearchDoctor from "./SearchDoctor";
class App extends Component {
  constructor() {
    super();
    this.state = {
      doctors: []
    };
  }
  async componentDidMount() {
    const response = await fetch(
      "https://api.betterdoctor.com/2016-03-01/doctors?location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=af3d0bd374eed3c44178f50e9c32b68c"
    );
    const doctors = await response.json();
    this.setState({
      doctors: doctors.data,
      docInfo:null
    });
    console.log("in componentDidMount", doctors.data);
  }
  render() {
    console.log("this.state.doctors in render", this.state.doctors);
    return (
      <div>
        <h1>Welcome To Better Doctor</h1>
        <DoctorsList list={this.state.doctors} />
        <SearchDoctor search={this.state.doctors} />
      </div>
    );
  }
}

export default App;
