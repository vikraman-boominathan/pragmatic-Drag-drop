import { useData } from "./TaskProvider";
import { useEffect, useRef, useState } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

export default function DragAndDrop() {
  const { data } = useData();
  const refs = useRef([]);
  const [dragIndex, setDragIndex] = useState(null);

  useEffect(() => {
    refs.current = refs.current.slice(0, data.length);
    refs.current.forEach((ref, index) => {
      if (ref) {
        draggable({
          element: ref,
          onDragStart() {
            setDragIndex(index);
          },
          onDrop() {
            setDragIndex(null);
          },
        });
      }
    });
  }, [data]);

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
                        className={`bg-slate-300 rounded-md m-3 p-2 flex flex-col ${dragIndex ===index ? "opacity-50": ''}`}
                        key={x.id}
                        ref={(e) => (refs.current[index] = e)}
                      >
                        <span>{x.taskName}</span>
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
                        className={`bg-slate-300 rounded-md m-3 p-2 flex flex-col  ${dragIndex ===index ? "opacity-50": ''}`}
                        key={x.id}
                        ref={(e) => (refs.current[index] = e)}
                      >
                        <span>{x.taskName}</span>
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
                        className={`bg-slate-300 rounded-md m-3 p-2 flex flex-col  ${dragIndex ===index ? "opacity-50": ''}`}
                        key={x.id}
                        ref={(e) => (refs.current[index] = e)}
                      >
                        <span>{x.taskName}</span>
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
