import "./App.css";
import DragAndDrop from "./DragAndDrop";
import { TaskProvider } from "./TaskProvider";

function App() {
  return (
    <>
      <TaskProvider>
        <DragAndDrop />
      </TaskProvider>
    </>
  );
}

export default App;
