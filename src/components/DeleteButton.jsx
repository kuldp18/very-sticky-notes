import TrashIcon from "../icons/TrashIcon";
import { db } from "../appwrite/databases";
import { NoteContext } from "../context/NoteContext";
import { useContext } from "react";

// eslint-disable-next-line react/prop-types
const DeleteButton = ({ noteId, color = "#000" }) => {
  const { setNotes } = useContext(NoteContext);

  const handleDelete = async () => {
    // console.log("delete button clicked");
    await db.notes.delete(noteId);
    setNotes((prevState) => prevState.filter((note) => note.$id !== noteId));
  };
  return (
    <>
      <span onClick={handleDelete}>
        <TrashIcon size="30" color={color} />
      </span>
    </>
  );
};

export default DeleteButton;
