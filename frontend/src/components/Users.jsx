import axios from 'axios';
import { SearchIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Users = () => {
    const [searchterm, setsearchterm] = useState("");
    const [loading, setloading] = useState(false);
    const [fecthedUsers, setfecthedUsers] = useState([]);
    useEffect(() => {
        const fetchusers = async () => {
            try {
                setloading(true);
               const res = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${searchterm}`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

                const response = res.data.user;
                setfecthedUsers(response);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setloading(false);
            }
        };
        fetchusers();
    }, [searchterm]);

    return (
        <div className='user-container'>
            <input
                className='search-input'
                type="text"
                onChange={e => setsearchterm(e.target.value)}
                placeholder="Search Users To Pay"
            />
            {fecthedUsers.map((user) => (
                <div key={user._id}>
                    {user.firstName}
                </div>
            ))}
        </div>
    );
};

export default Users;