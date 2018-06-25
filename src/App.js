import React, { Component } from "react";
import "./App.css";
import DoctorsList from "./DoctorsList";
class App extends Component {
  constructor() {
    super();
    this.state = {
      doctors: [],
      displayedDoctors:[]
    };
  }
  async componentDidMount() {
    const response = await fetch(
      "https://api.betterdoctor.com/2016-03-01/doctors?location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=af3d0bd374eed3c44178f50e9c32b68c"
    );
    const doctors = await response.json();
    this.setState({
      doctors: doctors.data,
      docInfo: null, //for display of doctor info
      search_param: "",
      displayedDoctors: doctors.data
    });
  }
  handleSearch = () => {
    console.log("in handleSearch", this.state.search_param);
    const nameSearch = this.state.search_param;
    //  filter list of doctors by search_param
    const filterByName = nameSearch => {
      return this.state.doctors.filter(
        obj => obj.profile.first_name === nameSearch
      );
    };
    const result = filterByName(nameSearch);
    console.log(result);
    // setState on displayedDoctors
    this.setState({
      displayedDoctors:result
    })
  };
  handleInputChange = event => {
    const valueOfInput = event.target.value;
    this.setState({
      search_param: valueOfInput
    });
  };
  render() {
    return (
      <div>
        <h1>Welcome To Better Doctor</h1>
        
        <input
          type="text"
          placeholder="Doctor name"
          value={this.state.search_param}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSearch}>Search Doctor</button>
        <DoctorsList list={this.state.displayedDoctors} />
      </div>
    );
  }
}

export default App;
