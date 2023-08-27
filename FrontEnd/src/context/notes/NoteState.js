import { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
    let host = "http://localhost:5000"
    const notesInitial = []

    //get all notes
    const getAllNotes = async ()=>{
        console.log("getting all notes");
        const response = await fetch(`${host}/notes/fetchAllNotes`, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
                "auth-token" : localStorage.getItem('token')
            }
        });
        const json =await response.json();
        // console.log(json);
        setNotes(json)
    }

    // add a  note 
    const addNote = async (title,description,tag) => {
        console.log('Adding a new note');
        const response = await fetch(`${host}/notes/addNote`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "auth-token" : localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}),
        });
        const json = await response.json();
        // const note = {
        //     "_id": "64cce4d404f84fbd7133968110",
        //     "user": "64cce40104f84fbd71339673",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "2023-08-04T11:45:24.154Z",
        //     "__v": 0 
        // }
        setNotes(notes.concat(json.note));
    }

    // delete a note

    const deleteNote =async (id) => {
        console.log("deleting a node wiht id  : ", id);
        const response = await fetch(`${host}/notes/deleteNote/${id}`, {
            method: "DELETE", 
            headers: {
                "Content-Type": "application/json",
                "auth-token" : localStorage.getItem('token')
            },
        });
        let newNote = notes.filter((note)=>{return note._id!==id});
        setNotes(newNote);
        // const json =await response.json();
    }

    // edit a note
    const editNote = async (id, title, description, tag) => {
        console.log("element sent",{title,description,tag});
        const response = await fetch(`${host}/notes/updateNote/${id}`, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
                "auth-token" : localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}),
        });
        const json = await response.json();
        console.log(json);
        const newNotes = JSON.parse(JSON.stringify(notes));

        for (let index = 0; index < newNotes.length; index++) {
            if(newNotes[index]._id===id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    const getUserProfile = async (  )=>{
        const response = await fetch(`http://localhost:5000/auth/getUser`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')
        }
    });
    const json =await response.json();
    setUserName(json.user.name);
    console.log(json.user.name)
    }
    const [userName,setUserName] = useState("");
    const [notes, setNotes] = useState(notesInitial);
    return (
        <NoteContext.Provider value={{ userName, notes,getUserProfile, addNote, deleteNote, editNote,getAllNotes }}>
            {props.children}
        </NoteContext.Provider>

    )
}
export default NoteState;