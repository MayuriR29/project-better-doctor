import React, { Component } from "react";
import "./App.css";
import DoctorsList from "./DoctorsList";
import Title from "./Title";
import SearchDoctor from "./SearchDoctor";
const NavBar = props => (
  <div>
    <a onClick={() => props.loadComponent("listDoctors")}>List Doctors</a>
    <a onClick={() => props.loadComponent("searchDoctors")}>Search Doctor</a>
  </div>
);
class App extends Component {
  constructor() {
    super();
    this.state = {
      doctors: [],
      docInfo: null,
      search_param: "",
      displayedDoctors: [],
      componentToDisplay: null
    };
  }
  async componentDidMount() {
    const response = await fetch(
      "https://api.betterdoctor.com/2016-03-01/doctors?location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=af3d0bd374eed3c44178f50e9c32b68c"
    );
    const doctors = await response.json();
    this.setState({
      doctors: doctors.data,
      displayedDoctors: []
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
      displayedDoctors: result
    });
  };
  handleInputChange = event => {
    const valueOfInput = event.target.value;
    this.setState({
      search_param: valueOfInput
    });
  };
  loadComponent = componentName => {
    this.setState({
      componentToDisplay: componentName
    });
  };
  render() {
    return (
      <div>
        <Title />
        <NavBar loadComponent={this.loadComponent} />

        {/* <input
          type="text"
          placeholder="Doctor name"
          value={this.state.search_param}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSearch}>Search Doctor</button> */}
        {this.state.componentToDisplay === "listDoctors" && (
          <DoctorsList list={this.state.doctors} />
        )}
        {this.state.componentToDisplay === "searchDoctors" && (
          <div>
            <SearchDoctor
            inputValue={this.state.search_param}
            inputChange={this.handleInputChange}
            clickSearch={this.handleSearch}
          />
          <DoctorsList list={this.state.displayedDoctors}/>
          </div>
          
        )}
      </div>
    );
  }
}

export default App;
