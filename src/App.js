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
      formFields: {
        docSearchField: "" /*input field value for doctor search */,
        specialitySearchField: "" /*input field value for speciality search */,
        docSearchBySpecialityField: ""
      },
      displayedDoctors: [] /*For selected doctor */,
      componentToDisplay: "searchDoctors",
      specializations: [],
      displaySpecializations: [] /*For selected specializations */
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
              inputChange={event =>
                this.handleChange(event, "specialitySearchField")
              }
              clickSearch={this.handleSpecialitySearch}
            />
            <ListSpecializations
              listSpec={this.state.displaySpecializations}
              listDoc={this.state.doctors}
              inputValue={this.state.formFields.docSearchBySpecialityField}
              inputChange={event =>
                this.handleChange(event, "docSearchBySpecialityField")
              }
              clickSearch={this.handleSpecificDocSearch}
            />
            <DoctorsList list={this.state.displayedDoctors} />
          </div>
        )}
      </div>
    );
  }

  async componentDidMount() {
    const response = await fetch(
      "https://api.betterdoctor.com/2016-03-01/doctors?location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=30&user_key=af3d0bd374eed3c44178f50e9c32b68c"
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
        obj =>
          obj.profile.first_name.toLowerCase() === nameSearch ||
          obj.profile.last_name.toLowerCase() === nameSearch
      );
    };
    const result = filterByName(nameSearch);

    this.setState({
      // setState on displayedDoctors
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
  handleSpecialitySearch = () => {
    const valueSpeciality = this.state.formFields.specialitySearchField.toLowerCase();
    const searchResult = specialitySearch => {
      /*filter list of speciality by specialitySearchField*/
      return this.state.specializations.filter(SpecialityObj =>
        SpecialityObj.name.toLowerCase().includes(valueSpeciality)
      );
    };
    const result = searchResult(valueSpeciality);
    this.setState({
      displaySpecializations: result,
      displayedDoctors: []
    });
  };
  handleSpecificDocSearch = () => {
    const desiredSpeciality = this.state.formFields.docSearchBySpecialityField.toLowerCase();
    console.log('in handleSpecificDocSearch',this.state.doctors)
    const searchDesiredDoc = desiredSpeciality => {
      return this.state.doctors.filter(
        docArr => docArr.specialties[0].name.toLowerCase() === desiredSpeciality
      );
    };
    const desiredDoc = searchDesiredDoc(desiredSpeciality);
    this.setState({
      displayedDoctors: desiredDoc,
      componentToDisplay:'searchSpecific',
      displaySpecializations:[]

    });
  };
}

export default App;
