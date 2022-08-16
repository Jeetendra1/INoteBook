import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const notesInitial = [
    {
      _id: "62ea9aabbf6fd94e41749dfc",
      user: "62e3d5906c63e17bb551ef54",
      title: "first notes",
      description: "first notes creating",
      tag: "personal",
      date: "2022-08-03T15:56:27.721Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);

    //Get all notes

    const getNotes = async () => {

      const url = `${host}/api/notes/fetchallnotes`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json();
      setNotes(json);
    };

  //Add a note

  const addNote = async (title, description, tag) => {
    const note = {
      title: title,
      description: description,
      tag: tag,
    };
    // setNotes(notes.concat(note));

    const url = `${host}/api/notes/addnote`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify(note),
    });
  };

  //Delete a note

  const deleteNote = async (id) => {
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
    const url = `${host}/api/notes/deletenote/${id}`;
    await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/updatenote/${id}`;
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}),
    });

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++){
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
