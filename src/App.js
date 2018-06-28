import React, { Component } from "react";
import "./App.css";
import DoctorsList from "./DoctorsList";
import Title from "./Title";
import SearchDoctor from "./SearchDoctor";
import SearchSpeciality from "./SearchSpeciality";
import NavBar from "./NavBar";
import SpecialityDocDetails from "./SpecialityDocDetails";

class App extends Component {
  constructor() {
    super();
    this.state = {
      doctors: [],
      docInfo: null,
      formFields: {
        docSearchField: "" /*input field value for doctor search */,
        specialitySearchField: "" /*input field value for speciality search */,
        docSearchBySpecialityField: ""
      },
      displayedDoctors: [] /*For selected doctor */,
      componentToDisplay: "searchDoctors",
      specializations: [],
      displaySpecializations: [] /*For selected specializations */,
      displayDesiredDoc: []
    };
  }
  render() {
    return (
      <div className="appClass">
        <Title />
        <NavBar loadComponent={this.loadComponent} />
        {this.state.componentToDisplay === "searchDoctors" && (
          <div>
            <SearchDoctor
              inputValue={this.state.docSearchField}
              inputChange={event => this.handleChange(event, "docSearchField")}
              clickSearch={this.handleDoctorSearch}
            />
            <DoctorsList list={this.state.displayedDoctors} />
          </div>
        )}
        {this.state.componentToDisplay === "searchSpecific" && (
          <div>
            <SearchSpeciality
              inputValue={this.state.formFields.specialitySearchField}
              list={this.state.displaySpecializations}
              clickSpecialitySearch={this.handleSpecialitySearch}
              findDoc={this.handleSpecificDocSearch}
            />
            <SpecialityDocDetails list={this.state.displayDesiredDoc} />
          </div>
        )}
      </div>
    );
  }

  async componentDidMount() {
    const response = await fetch(
      "https://api.jumpstart.site/api.betterdoctor.com/2016-03-01/doctors?location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=100"
    );
    const doctors = await response.json();
    const response1 = await fetch(
      "https://api.jumpstart.site/api.betterdoctor.com/2016-03-01/specialties"
    );
    const specializations = await response1.json();
    this.setState({
      doctors: doctors.data,
      displayedDoctors: [],
      specializations: specializations.data,
      displaySpecializations: []
    });
  }
  handleChange = (event, parameter) => {
    const valueOfInput = event.target.value;
    const formFields = this.state.formFields;
    formFields[parameter] = valueOfInput;
    this.setState({
      formFields: formFields
    });
  };

  handleDoctorSearch = () => {
    const nameSearch = this.state.formFields.docSearchField.toLowerCase();
    /*filter list of doctors by docSearchField*/
    const filterByName = nameSearch => {
      return this.state.doctors.filter(
        eachDoc =>
          eachDoc.profile.first_name.toLowerCase() === nameSearch ||
          eachDoc.profile.last_name.toLowerCase() === nameSearch
      );
    };
    const result = filterByName(nameSearch);

    this.setState({
      displayedDoctors: result
    });
  };
  handleViewInfo = () => {
    this.setState({
      docInfo: this.state.displayedDoctors.profile.bio
    });
  };
  loadComponent = componentName => {
    /*setstate of  componentToDisplay to render*/
    this.setState({
      componentToDisplay: componentName
    });
  };
  handleSpecialitySearch = selectedSpeciality => {
    const valueSpeciality = selectedSpeciality.toLowerCase();
    const searchResult = specialitySearch => {
      /*filter list of speciality by specialitySearchField*/
      return this.state.specializations.filter(SpecialityObj =>
        SpecialityObj.name.toLowerCase().includes(valueSpeciality)
      );
    };
    const result = searchResult(valueSpeciality);
    this.setState({
      displaySpecializations: result,
      displayedDoctors: [],
      displayDesiredDoc: [],
      docInfo: null,
      formFields: { ...this.state.formFields, docSearchBySpecialityField: "" }
    });
  };
  handleSpecificDocSearch = value => {
    const desiredSpeciality = value.toLowerCase();
    const searchDesiredDoc = desiredSpeciality => {
      return this.state.doctors.filter(
        eachDocArr =>
          eachDocArr.specialties.filter((eachSpec, index, arr) => {
            return eachSpec.uid === desiredSpeciality;
          }).length > 0
      );
    };
    const desiredDoc = searchDesiredDoc(desiredSpeciality);
    this.setState({
      displayDesiredDoc: desiredDoc,
      displaySpecializations: []
    });
  };
}

export default App;
