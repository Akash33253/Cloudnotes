import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

export default function Notes(props) {
  const context = useContext(NoteContext);
  const { notes, getAllNotes, editNote, getUserProfile ,userName} = context;
  const [note, setNote] = useState({ id : "", etitle: "", edescription: "", etag: "" })
  const navigate = useNavigate();
  useEffect( () => {
    if(localStorage.getItem('token')){
    getUserProfile();
    getAllNotes();
  }
  else{
    // redirect
    navigate('/login')
    props.showAlert("Login Your self First","warning");
  }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const handleClick = (e) => {
    console.log(note);
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
    props.showAlert("Note Updated Successfully !",'success')
    e.preventDefault();
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value})
  }
  const updateNote = (currentNote) => {
    ref.current.click();
    console.log(currentNote);
    setNote({id :currentNote._id,etitle : currentNote.title, edescription : currentNote.description, etag : currentNote.tag})
  }

  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Launch static backdrop modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref = {refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5||note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.length === 0 &&<h5>No notes to display</h5>}
        {notes.map((note) => {
          return <NoteItem note={note} updateNote={updateNote} key={note._id} showAlert={props.showAlert} />
        })}
      </div>
    </>

  )
}
