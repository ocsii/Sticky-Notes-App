/* useRef is to reference single components without rerendering */
import { useRef, useEffect, useState } from "react";
import Trash from "../icons/Trash";
import { setNewOffset } from "../utils";

const NoteCard = ({ note }) => {
  const body = JSON.parse(note.body);
  const [position, setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);

  let mouseStartPos = { x: 0, y: 0 };
  const cardRef = useRef(null);

  // Create a reference to text area
  // When textarea is rendered, teatAreaRed will gold a reference to the DOM node
  // This avoids the entire thing from rerendering as reference does not change the state of
  // the component
  const textAreaRef = useRef(null);

  // Use effect allow to perform effects AFTER the component has rendered
  // It will run once after the initial render because of empty dependency []
  // it calls the autoGrow function when the component is first rendered
  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  // textAreaRef.current accesses the actual <textarea> DOM node.
  // 1 It resets the height to "auto" to ensure that shrinking the content reduces the height.
  // 2 It sets the height to the scrollHeight, which represents the total height required to display all the content.
  const autoGrow = (textarea) => {
    const { current } = textAreaRef;
    current.style.height = "auto";
    current.style.height = current.scrollHeight + "px";
  };

  // When you click on a note
  const mouseDown = (e) => {
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  // When you let go
  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  };

  // Calculate the new position based on the position when you clicked on the note
  const mouseMove = (e) => {
    const mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    // Constantly reset to recalculate
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);

    setPosition(newPosition);
  };

  return (
    <div
      ref={cardRef}
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        onMouseDown={mouseDown}
        className="card-header"
        style={{
          backgroundColor: colors.colorHeader,
        }}
      >
        <Trash />
      </div>

      <div className="card-body">
        <textarea
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => {
            // Triggered when use changes content in textarea
            autoGrow(textAreaRef);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
