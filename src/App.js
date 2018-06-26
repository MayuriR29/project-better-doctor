import React, { Component } from "react";
import "./App.css";
import DoctorsList from "./DoctorsList";
import Title from "./Title";
import SearchDoctor from "./SearchDoctor";
import ListSpecializations from "./ListSpecializations";
import SearchSpeciality from "./SearchSpeciality";
import NavBar from "./NavBar";

class App extends Component {
  constructor() {
    super();
    this.state = {
      doctors: [],
      docInfo: null,
      searchParm1: "" /*input field value for any search */,
      searchParm2: "",
      displayedDoctors: [] /*For selected doctor */,
      componentToDisplay: null,
      specializations: [],
      displaySpecializations: [] /*For selected specializations */
    };
  }
  async componentDidMount() {
    const response = await fetch(
      "https://api.betterdoctor.com/2016-03-01/doctors?location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=af3d0bd374eed3c44178f50e9c32b68c"
    );
    const doctors = await response.json();
    const response1 = await fetch(
      "https://api.betterdoctor.com/2016-03-01/specialties?user_key=af3d0bd374eed3c44178f50e9c32b68c"
    );
    const specializations = await response1.json();
    this.setState({
      doctors: doctors.data,
      displayedDoctors: [],
      specializations: specializations.data,
      displaySpecializations: []
    });
  }
  handleDoctorSearch = () => {
    const nameSearch = this.state.searchParm1;
    /*filter list of doctors by searchParm1*/
    const filterByName = nameSearch => {
      return this.state.doctors.filter(
        obj => obj.profile.first_name === nameSearch
      );
    };
    const result = filterByName(nameSearch);
    // setState on displayedDoctors
    this.setState({
      displayedDoctors: result
    });
  };
  handleInputChange = event => {
    /*function onchange of value for doctor search */
    const valueOfInput = event.target.value;
    this.setState({
      searchParm1: valueOfInput
    });
  };
  loadComponent = componentName => {
    /*setstate of  componentToDisplay to render*/
    this.setState({
      componentToDisplay: componentName
    });
  };
  handleSpecialityChange = event => {
    /*function onchange of value for speciality search */
    const valueOfInput = event.target.value;
    this.setState({
      searchParm2: valueOfInput
    });
  };
  handleSpecialitySearch = () => {
    const valueSpeciality = this.state.searchParm2;
    this.setState({
      searchParm2: valueSpeciality
    });
    /*filter list of speciality by searchParm2*/
    const searchResult = specialitySearch => {
      return this.state.specializations.filter(obj =>
        obj.name.includes(valueSpeciality)
      );
    };
    const result = searchResult(valueSpeciality);
    this.setState({
      displaySpecializations: result
    });
  };
  render() {
    return (
      <div>
        <Title />
        <NavBar loadComponent={(this.loadComponent)} />
        {this.state.componentToDisplay === "listDoctors" && (
          <DoctorsList list={this.state.doctors} />
        )}
        {this.state.componentToDisplay === "searchDoctors" && (
          <div>
            <SearchDoctor
              inputValue={this.state.searchParm1}
              inputChange={this.handleInputChange}
              clickSearch={this.handleDoctorSearch}
            />
            <DoctorsList list={this.state.displayedDoctors} />
          </div>
        )}
        {this.state.componentToDisplay === "searchSpecific" && (
          <div>
            <SearchSpeciality
              inputValue={this.state.searchParm2}
              inputChange={this.handleSpecialityChange}
              clickSearch={this.handleSpecialitySearch}
            />
            <ListSpecializations listSpec={this.state.displaySpecializations} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
