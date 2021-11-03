import { useState,useEffect } from 'react';
import '../App.css'

export const Todo=()=>{
    const [data,setData]=useState([])
    const [text,setText]= useState("")
    const [page,setPage]= useState(1)
    const [total, setTotal] = useState(0);
    const [loading,setLoading]= useState(true)

    const handleaddtodo=()=>{
      fetch("http://localhost:3001/todos",{
          method:"POST",
          body:JSON.stringify({
              title:text,
              status:false,              
          }),
          headers:{
              "content-Type":"application/json"
           
          },
      }).then(gettodos).catch((err)=> console.log(err,'err'));
  };

    const getAllDataLength = () => {
      fetch(`http://localhost:3001/todos`)
      .then((d) => d.json())
      .then(res => setTotal(res.length))
      .catch((err)=> console.log(err,'err'))
    };
  


  const gettodos=()=>{
    fetch(`http://localhost:3001/todos?_page=${page}&_limit=3`)
    .then((d)=>d.json())
    .then(setData).then(()=>{
        setLoading(false)
    })
  }


//delete list
  const deleteMe = (id) => {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: "DELETE",
    }).then(res => {
      getAllDataLength();
      getTodo()}).catch((err)=> console.log(err,'delete ni hua'))
  };
  //update status
const toggleList = (id) => {
  fetch(`http://localhost:3001/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      status: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(gettodos).catch(err => console.log(err,'patch ni hua'));
};
  const getTodo = () =>
    fetch(`http://localhost:3001/todos?_page=${page}&_limit=4`)
      .then((d) => d.json())
      .then(res => {
        getAllDataLength();
        setData(res)
      })
      .catch((err)=> console.log(err,'err'))
 
  
  


useEffect(()=>{
  gettodos(page)
  getAllDataLength();
},[page]);


  return loading? (<h1>Loading...</h1>) : (
  <div className="App" onChange={(e)=>setText(e.target.value)}>
       <button onClick={handleaddtodo}>Add Todo</button>
      <input type="text"/>
 {data.map((e)=>(
   <div className="attributes">
   <div key={e.id}>
     {e.title}-
     </div>

     <div>{e.status ? "Completed" : "Not Completed"}</div>
     <button  onClick={()=> toggleList(e.id)}>Toggle</button>
     <button  onClick={()=> deleteMe(e.id)}>Delete</button>
   
   </div>
 ))}
 <button disabled={page===1} onClick={()=>{
   setPage(page-1)
   setLoading(true)
 }}>Previous</button>
 <button  onClick={()=>{
   setPage(page+1)
   setLoading(true)
 }}>Next</button>
 <h3 >Page:{page}</h3>
 
  </div> 
  );
}
   
  
     
