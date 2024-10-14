import React from "react";
import { dummyData as notes } from "../assets/dummyData";
import NoteCard from "../components/NoteCard";

const NotesPage = () => {
  return (
    <div>
      {notes.map((note) => (
        <NoteCard key={note.$id} note={note} />
      ))}
    </div>
  );
};

export default NotesPage;
