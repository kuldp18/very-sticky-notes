import { createContext, useContext, useEffect, useState } from "react";
import Spinner from "../icons/Spinner";
import { db } from "../appwrite/databases";
import { useAuth } from "./AuthContext";

export const NoteContext = createContext();

// eslint-disable-next-line react/prop-types
const NoteProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const init = async () => {
      if (user) {
        const response = await db.notes.list(user.$id);
        setNotes(response.documents);
      }
      setLoading(false);
    };

    init();
  }, [user]);

  const contextData = {
    notes,
    setNotes,
    selectedNote,
    setSelectedNote,
  };

  return (
    <NoteContext.Provider value={contextData}>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Spinner size="100" />
        </div>
      ) : (
        children
      )}
    </NoteContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNote = () => {
  return useContext(NoteContext);
};

export default NoteProvider;
