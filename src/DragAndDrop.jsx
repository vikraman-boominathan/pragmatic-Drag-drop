import { useData } from "./TaskProvider";
import { useEffect } from "react";

export default function DragAndDrop() {
  const { data } = useData();

  useEffect(() => {
    console.log("newdata", data);
  }, [data]);

  return (
    <div className="grid grid-cols-3">
      <div className="h-screen  w-2/3">
        <div className="bg-orange-300 h-fit rounded-lg m-4 flex flex-col">
          <div className="p-4">Pending</div>
          <div className="bg-orange-400 m-4 h-fit">
            <ul>
              {data.map(
                (x) =>
                  x.taskStatus == "pending" && (
                    <li
                      className="bg-slate-300 rounded-md m-3 p-2 flex flex-col "
                      key={x.id}
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
              {data.map(
                (x) =>
                  x.taskStatus == "wip" && (
                    <li
                      className="bg-slate-300 rounded-md m-3 p-2 flex flex-col "
                      key={x.id}
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
              {data.map(
                (x) =>
                  x.taskStatus == "completed" && (
                    <li
                      className="bg-slate-300 rounded-md m-3 p-2 flex flex-col "
                      key={x.id}
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
