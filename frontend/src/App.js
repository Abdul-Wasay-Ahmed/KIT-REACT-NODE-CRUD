import React , {useState , useEffect} from 'react'





const App = () =>{

  const [users ,setUsers] = useState([])
  const [selectedUsers , setSelectedUsers] = useState('')
  const [newUserValue , setnewUserValue] = useState('')
  
 
  useEffect(()=>{
    fetchUsers();
  },[]);

  const fetchUsers = () =>{
    fetch('http://localhost:3090/people')
    .then((response) => response.json())
    .then((data)=> setUsers(data))
  }
  
const handleAddUser = ()=>{
fetch('http://localhost:3090/people' ,{
  method:'POST',
  headers:{
    'Content-Type':'application/json',
  },
  body:JSON.stringify({name:newUserValue})
}).then(()=>{
  fetchUsers()
  setnewUserValue('');
})


}


const handleDeleteUser = (id) =>{
fetch(`http://localhost:3090/people/${id}`, {
  method:'DELETE'
}) 
.then(()=>{
  fetchUsers();
})
}





  const handleUpdateUser = ()=>{

   console.log("selected user",selectedUsers) 
fetch(`http://localhost:3090/people/${selectedUsers._id}` , {
method:'PUT',
headers:{
  'Content-Type':'application/json',
},
body:JSON.stringify({name:selectedUsers.name})
})
.then(()=>{
  fetchUsers()
  setSelectedUsers(null)
})
  }


  return(
<div>
<h1>Users</h1>
<ul>


{users.map((user)=>(
  <li key={user._id}>
   {user.name}
   
<button onClick={()=> setSelectedUsers(user)}>Edit</button>
<button onClick={()=> handleDeleteUser(user._id)}  >Delete</button>
  </li>
))         }
</ul>

<input type='text' value={newUserValue} onChange={(e)=> setnewUserValue(e.target.value)} />
<button onClick={handleAddUser}>Add</button>
{selectedUsers &&(
<div>
  <h1>UPDATE USER</h1>
<input type="text" value={selectedUsers.name} onChange={(e)=>setSelectedUsers({...selectedUsers,name: e.target.value})} />
<button onClick={handleUpdateUser}>Update</button>
</div>
)}
</div>
  )


}
export default App