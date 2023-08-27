import React from 'react'
import Notes from './Notes';
import AddNote from './AddNote';

export default function Home(props) {
 
  return (
    <div>
      <AddNote showAlert = {props.showAlert}/>
      <Notes showAlert = {props.showAlert}/>  
    </div>
  )
}
