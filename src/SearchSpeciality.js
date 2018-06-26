import React from 'react';
const SearchSpeciality=(props)=>{
    return (
        <div>
        <input type="text" 
        placeholder="Speciality Name"
        value={props.inputValue}
        onChange={props.inputChange}
        />
        <button onClick={props.clickSearch}>Search Specialiality</button>
        </div>
    )
}
export default SearchSpeciality;
