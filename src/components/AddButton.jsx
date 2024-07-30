import PlusIcon from "../icons/PlusIcon";
import colors from "../colors.json";
import { useContext, useRef } from "react";
import { db } from "../appwrite/databases";
import { NoteContext } from "../context/NoteContext";

const AddButton = () => {
  const startingPos = useRef(10);

  const { setNotes } = useContext(NoteContext);

  const addNote = async () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const payload = {
      position: JSON.stringify({
        x: startingPos.current,
        y: startingPos.current,
      }),
      colors: JSON.stringify(colors[randomIndex]),
    };

    const res = await db.notes.create(payload);

    setNotes((prev) => [...prev, res]);

    startingPos.current += 10;
  };

  return (
    <div id="add-btn" onClick={addNote}>
      <PlusIcon color="#fff" size="24" />
    </div>
  );
};

export default AddButton;
