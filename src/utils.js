export const setNewOffset = (card, mouseMoveDir = {x:0, y:0}) => {
   const offsetLeft = card.offsetLeft - mouseMoveDir.x
   const offsetTop = card.offsetTop - mouseMoveDir.y 

   return {
    x: offsetLeft < 0 ? 0 : offsetLeft,
    y: offsetTop < 0 ? 0 : offsetTop,
   }
};

// textAreaRef.current accesses the actual <textarea> DOM node.
// 1 It resets the height to "auto" to ensure that shrinking the content reduces the height.
// 2 It sets the height to the scrollHeight, which represents the total height required to display all the content.
export const autoGrow = (textAreaRef) => {
    const { current } = textAreaRef;
    current.style.height = "auto";
    current.style.height = current.scrollHeight + "px";
};


export const setZIndex = (selectedCard) => {
    selectedCard.style.zIndex = 999;

    Array.from(document.getElementsByClassName("card")).forEach((card) => {
        if (card !== selectedCard) {
            card.style.zIndex = selectedCard.style.zIndex - 1;
        }
    })
}

export const bodyParser = (value) => {
    try {
        JSON.parse(value);
        return JSON.parse(value);
    } catch (error) {
        return value;
    }
}