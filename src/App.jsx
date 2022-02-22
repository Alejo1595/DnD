import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./App.css";

const initialData = {
  grupoA: {
    id: "grupoA",
    items: [
      { id: "0", name: "item-1", grupo: "grupoA" },
      { id: "1", name: "item-2", grupo: "grupoA" },
      { id: "2", name: "item-3", grupo: "grupoA" },
    ],
  },
  grupoB: {
    id: "grupoB",
    items: [
      { id: "", name: "", grupo: "" },
      { id: "", name: "", grupo: "" },
      { id: "", name: "", grupo: "" },
    ],
  },
};

const reorder = (list, startIndex, endIndex) => {
  let result = Array.from(list);
  const itemStart = result[startIndex];
  const itemEnd = result[endIndex];

  result[startIndex] = itemEnd;
  result[endIndex] = itemStart;

  return result;
};

function App() {
  const [grupos, setGrupos] = useState(initialData);

  const returnItemsForSlock = (
    nombreGrupo = "grupoA" | "grupoB",
    grupoItem,
    itemID
  ) => {
    return grupos[nombreGrupo].items
      .filter((item) => nombreGrupo === grupoItem && item.id === itemID)
      .map((currenItem) => (
        <Draggable
          key={`${currenItem.grupo}-${currenItem.id}`}
          draggableId={`${currenItem.grupo}-${currenItem.id}`}
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
    const { source, destination } = result;

    const [grupoSource, idSource] = source.droppableId.split("-");

    const [grupoDes, idDestination] = destination.droppableId.split("-");
    const nuevoEstado = { ...grupos };

    if (grupoSource !== grupoDes) {
      const copiaSource = nuevoEstado[grupoSource].items[idSource];
      const copiaDes = nuevoEstado[grupoDes].items[idDestination];

      copiaSource.grupo = "";
      nuevoEstado[grupoDes].items[idDestination] = {
        ...copiaSource,
        grupo: grupoDes,
      };

      if (copiaDes.grupo !== "") {
        copiaDes.grupo = grupoSource;
        nuevoEstado[grupoSource].items[copiaDes.id] = {
          ...copiaDes,
          grupo: grupoSource,
        };
      }
    } else {
      nuevoEstado[grupoSource].items = reorder(
        nuevoEstado[grupoSource].items,
        idSource,
        idDestination
      );
    }
    setGrupos(nuevoEstado);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <div className="container">
          <div className="item-container">
            {grupos.grupoA.items.map((item, index) => (
              <Droppable
                key={`${grupos.grupoA.id}-${index}`}
                droppableId={`${grupos.grupoA.id}-${index}`}
                direction="horizontal"
              >
                {(droppableProvided) => (
                  <div
                    {...droppableProvided.droppableProps}
                    className="drop-item"
                    ref={droppableProvided.innerRef}
                  >
                    {returnItemsForSlock("grupoA", item.grupo, item.id)}
                    {droppableProvided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>

          <div className="item-container">
            {grupos.grupoB.items.map((item, index) => (
              <Droppable
                key={`${grupos.grupoB.id}-${index}`}
                droppableId={`${grupos.grupoB.id}-${index}`}
                direction="horizontal"
              >
                {(droppableProvided) => (
                  <div
                    {...droppableProvided.droppableProps}
                    className="drop-item"
                    ref={droppableProvided.innerRef}
                  >
                    {returnItemsForSlock("grupoB", item.grupo, item.id)}
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
