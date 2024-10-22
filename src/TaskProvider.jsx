import { createContext, useState, useContext, useEffect, useCallback } from "react";
import { getApi } from "./api";

const TaskContext = createContext();
export const useData = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const setStatus = useCallback((id, newStatus) => {
    setData((prev) => {
      return prev.map((t) =>{
        if(t.id == id){
          return{
            ...t,
            taskStatus: newStatus
          }
        }
        return t
      })
    })
  },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getApi(); 
        console.log("Fetched Data:", apiData);
        setData(apiData); 
      } catch (err) {
        console.log("Error fetching data:", err); 
      }
    };
  
    fetchData(); 
  }, []); 


  return (
    <div>
      <TaskContext.Provider value={{data , setStatus}}>{children}</TaskContext.Provider>
    </div>
  );
};
