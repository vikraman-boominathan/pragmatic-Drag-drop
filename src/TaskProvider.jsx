import { createContext, useState, useContext, useEffect } from "react";
import { getApi } from "./api";

const TaskContext = createContext();
export const useData = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getApi(); // Fetch the data
        console.log("Fetched Data:", apiData); // Log the fetched data for debugging
        setData(apiData); // Set the fetched data to state
      } catch (err) {
        console.log("Error fetching data:", err); // Log any error that occurs
      }
    };
  
    fetchData(); // Call the async function to fetch data
  }, []); // This will run once when the component mounts
    

  return (
    <div>
      <TaskContext.Provider value={{data}}>{children}</TaskContext.Provider>
    </div>
  );
};
