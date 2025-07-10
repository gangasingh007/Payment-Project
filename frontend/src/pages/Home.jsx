import React from 'react'
// import Navbar from '../components/Navbar'
import Users from '../components/Users'
import axios from 'axios';

const Home = () => {
  const [loading, setloading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
     const fetchUsers = async()=>{
        setloading(true);
        try {
            const res = await axios.get(`http://loaclhost:3000/api/v1/user/bulk?filter=${searchTerm}`,{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            const response = res.data.users;
            setUsers(response);
        } catch (error) {
            console.log(error)
        }finally{
            setloading(false)
        }
     }
    }, [searchTerm])
  return (
    <div className="home-container">
       <div className="search-input">
          <input 
          type="text"
          onChange={e=>setSearchTerm(e.target.value)}
          />
       </div>
       <Users />
    </div>
  )
}

export default Home