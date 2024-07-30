import NoteCard from "../components/NoteCard";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import Controls from "../components/Controls";

const NotesPage = () => {
  const { notes } = useContext(NoteContext);
  return (
    <div>
      {notes.length > 0 &&
        notes.map((note) => <NoteCard key={note.$id} note={note} />)}
      <Controls />
    </div>
  );
};

export default NotesPage;
