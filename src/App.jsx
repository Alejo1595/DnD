import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./App.css";

const initialData = [
  { id: "0", name: "item-1", dropId: "A-drop" },
  { id: "1", name: "item-2", dropId: "A-drop" },
  { id: "2", name: "item-3", dropId: "A-drop" },
];

function App() {
  const [items, setItems] = useState(initialData);

  const returnItemsForSlock = (dropId, esInicial, itemID) => {
    return items
      .filter((item) =>
        esInicial
          ? `${item.dropId}-${item.id}` === dropId && item.id === itemID
          : `${item.dropId}-${item.id}` === dropId
      )
      .map((currenItem) => (
        <Draggable
          key={currenItem.id}
          draggableId={`${currenItem.dropId}-${currenItem.id}`}
          index={Number(currenItem.id)}
        >
          {(draggableProvided) => (
            <div
              {...draggableProvided.draggableProps}
              {...draggableProvided.dragHandleProps}
              className="drag-item"
              ref={draggableProvided.innerRef}
            >
              {currenItem.name}
            </div>
          )}
        </Draggable>
      ));
  };

  const onDragEnd = (result) => {
    console.log(result);
    const { draggableId, source } = result;
    setItems((prev) =>
      prev.map((item) => {
        if (`${item.dropId}-${item.id}` === draggableId) {
          console.log("Item encontrado", item.name);
          return {
            ...item,
            dropId: "B-drop",
          };
        }
        return item;
      })
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <div className="container">
          <div className="item-container">
            {items.map((item, index) => (
              <Droppable key={index} droppableId={`A-drop-${item.id}`}>
                {(droppableProvided) => (
                  <div
                    {...droppableProvided.droppableProps}
                    className="drop-item"
                    ref={droppableProvided.innerRef}
                  >
                    {returnItemsForSlock(`A-drop-${item.id}`)}
                    {droppableProvided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>

          <div className="item-container">
            {items.map((item, index) => (
              <Droppable key={index} droppableId={`B-drop-${item.id}`}>
                {(droppableProvided) => (
                  <div
                    {...droppableProvided.droppableProps}
                    className="drop-item"
                    ref={droppableProvided.innerRef}
                  >
                    {returnItemsForSlock(`B-drop-${item.id}`)}
                    {droppableProvided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
