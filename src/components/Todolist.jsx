export const TodoList=({List,handleToggle})=>{
    return (<div>
        
        {List.map((e)=>(
            <p key={e.id}>
                {e.title}-{e.status ? "Done" : "Not Done"}
                <button onClick={()=>{
                    handleToggle(e.id,e.title);
                }}>Change</button>
            </p>
        ))}
        
           </div>
    )
}