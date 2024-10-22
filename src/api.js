import axios  from "axios";

export async function getApi() {
const url = 'http://localhost:2000/tasks'

try{

  const res = await axios.get(url)
  const data = await res.data;
  return data
  
 


}catch(err){
  console.log(err)
}


}