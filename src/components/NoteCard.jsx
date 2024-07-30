import PlusIcon from "../icons/PlusIcon";
import MinusIcon from "../icons/MinusIcon";
import { useRef, useEffect, useState, useContext } from "react";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils";
import { db } from "../appwrite/databases";
import Spinner from "../icons/Spinner";
import DeleteButton from "./DeleteButton";
import { NoteContext } from "../context/NoteContext";

/* eslint-disable react/prop-types */
const NoteCard = ({ note }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const title = note.title;
  const body = bodyParser(note.body);
  const [position, setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);

  const { setSelectedNote } = useContext(NoteContext);

  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef(null);
  const titleKeyUpTimer = useRef(null);

  const textAreaRef = useRef();
  const titleTextAreaRef = useRef();

  let mouseStartPos = { x: 0, y: 0 };
  const cardRef = useRef(null);

  const mouseDown = (e) => {
    // prevent from event bubbling for delete button
    if (e.target.tagName === "svg") {
      return;
    }
    // console.log("mouse down event");
    setZIndex(cardRef.current);
    setSelectedNote(note);
    mouseStartPos = { x: e.clientX, y: e.clientY };
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  const mouseUp = (e) => {
    if (e.target.tagName === "svg") {
      return;
    }
    // console.log("mouse up event");
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    const newPosition = setNewOffset(cardRef.current);
    saveData("position", newPosition);
  };

  const mouseMove = (e) => {
    const mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    mouseStartPos = { x: e.clientX, y: e.clientY };

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition);
  };

  const saveData = async (key, value) => {
    let payload =
      key === "title" ? { [key]: value } : { [key]: JSON.stringify(value) };

    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {
      console.error(error);
    }
    setSaving(false);
  };

  const handleKeyUp = () => {
    setSaving(true);

    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = setTimeout(() => {
      saveData("body", textAreaRef.current.value);
    }, 2000);
  };

  const handleTitleKeyUp = () => {
    setSaving(true);

    if (titleKeyUpTimer.current) {
      clearTimeout(titleKeyUpTimer.current);
    }

    titleKeyUpTimer.current = setTimeout(() => {
      saveData("title", titleTextAreaRef.current.value);
    }, 2000);
  };

  useEffect(() => {
    autoGrow(textAreaRef);
    setZIndex(cardRef.current);
  }, []);

  return (
    <div
      className="card"
      ref={cardRef}
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className="card-header"
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        style={{
          backgroundColor: colors.colorHeader,
          borderRadius: isMinimized ? "5px 5px 5px 5px" : "5px 5px 0 0",
        }}
      >
        <div className="card-header__left">
          {/* <span>{title}</span> */}
          <textarea
            defaultValue={title || "New Note"}
            spellCheck={false}
            ref={titleTextAreaRef}
            onKeyUp={handleTitleKeyUp}
            onFocus={() => {
              setZIndex(cardRef.current);
              setSelectedNote(note);
            }}
            style={{ color: colors.colorText }}
          ></textarea>
        </div>

        <div className="card-header__right">
          {saving && (
            <div className="card-saving">
              <Spinner color={colors.colorText} />
              <span style={{ color: colors.colorText }}>Saving</span>
            </div>
          )}
          <DeleteButton noteId={note.$id} color={colors.colorText} />
          <span onClick={() => setIsMinimized(!isMinimized)}>
            {isMinimized ? (
              <PlusIcon size="30" color={colors.colorText} />
            ) : (
              <MinusIcon size="30" color={colors.colorText} />
            )}
          </span>
        </div>
      </div>

      <div
        className="card-body"
        style={{ display: isMinimized ? "none" : "block" }}
      >
        <textarea
          ref={textAreaRef}
          onKeyUp={handleKeyUp}
          defaultValue={body}
          style={{ color: colors.colorText }}
          onInput={() => autoGrow(textAreaRef)}
          onFocus={() => {
            setZIndex(cardRef.current);
            setSelectedNote(note);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
