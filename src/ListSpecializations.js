import React from 'react';
const ListSpecializations=(props)=>{
    return(
        <div>
        <ul>
           {
            props.listSpec.map((specialties,index)=>{
                return <li key={index}> {specialties.name}</li>
            })
           } 
        </ul>
        </div>
    )
}
export default ListSpecializations;