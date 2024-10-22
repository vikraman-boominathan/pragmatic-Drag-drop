import { useData } from "./TaskProvider";
import { useEffect, useRef, useState } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";

export default function DragAndDrop() {
  const { data, setStatus } = useData();
  const refs = useRef([]);
  const [dragIndex, setDragIndex] = useState(null);

  useEffect(() => {
    refs.current = refs.current.slice(0, data.length);
    refs.current.forEach((ref, index) => {
      if (ref) {
        return combine(
          draggable({
            element: ref,
            getInitialData() {
              return {
                id: data[index].id,
                taskName: data[index].taskName,
                index: index,
                status: data[index].taskStatus
              };
            },
            onDragStart() {
              setDragIndex(index);
            },
            onDrop() {
              setDragIndex(null);
            },
          }),
          dropTargetForElements({
            element: ref,
            getData() {
              return {
                id: data[index].id,
                taskName: data[index].taskName,
                index: index,
                status: data[index].taskStatus
              };
            },

            onDrop({ source, self }) {
              const initStatus = source.data.status
              const dropStatus = self.data.status
              const initId = source.data.id

              if(initStatus !== dropStatus){
                setStatus( initId, dropStatus)
              }
            },
          })
        );
      }
    });
  }, [data, setStatus]);

  return (
    <div className="grid grid-cols-3">
      <div className="h-screen  w-2/3">
        <div className="bg-orange-300 h-fit rounded-lg m-4 flex flex-col">
          <div className="p-4">Pending</div>
          <div className="bg-orange-400 m-4 h-fit">
            <ul>
              {data &&
                Array.isArray(data) &&
                data.map(
                  (x, index) =>
                    x.taskStatus == "pending" && (
                      <li
                        className={`bg-slate-300 rounded-md m-3 p-2 flex flex-col ${
                          dragIndex === index ? "opacity-50" : ""
                        }`}
                        key={x.id}
                        ref={(e) => (refs.current[index] = e)}
                      >
                        <span>{x.id}.{x.taskName}</span>
                      </li>
                    )
                )}
            </ul>
          </div>
        </div>
      </div>
      <div className="h-screen  w-2/3">
        <div className="bg-orange-300 h-fit rounded-lg m-4 flex flex-col">
          <div className="p-4">WIP</div>
          <div className="bg-orange-400 m-4 h-fit">
            <ul>
              {data &&
                Array.isArray(data) &&
                data.map(
                  (x, index) =>
                    x.taskStatus == "wip" && (
                      <li
                        className={`bg-slate-300 rounded-md m-3 p-2 flex flex-col  ${
                          dragIndex === index ? "opacity-50" : ""
                        }`}
                        key={x.id}
                        ref={(e) => (refs.current[index] = e)}
                      >
                        <span>{x.id}.{x.taskName}</span>
                      </li>
                    )
                )}
            </ul>
          </div>
        </div>
      </div>
      <div className="h-screen  w-2/3">
        <div className="bg-orange-300 h-fit rounded-lg m-4 flex flex-col">
          <div className="p-4">Complete</div>
          <div className="bg-orange-400 m-4 h-fit">
            <ul>
              {data &&
                Array.isArray(data) &&
                data.map(
                  (x, index) =>
                    x.taskStatus == "completed" && (
                      <li
                        className={`bg-slate-300 rounded-md m-3 p-2 flex flex-col  ${
                          dragIndex === index ? "opacity-50" : ""
                        }`}
                        key={x.id}
                        ref={(e) => (refs.current[index] = e)}
                      >
                        <span>{x.id}.{x.taskName}</span>
                      </li>
                    )
                )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
