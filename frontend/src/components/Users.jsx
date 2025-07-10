import axios from 'axios';
import { SearchIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Balance from './Balance';

const Users = () => {
    const [searchterm, setsearchterm] = useState("");
    const [loading, setloading] = useState(false);
    const [fecthedUsers, setfecthedUsers] = useState([]);
    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchusers = async () => {
            try {
                setloading(true);
                const res = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${searchterm}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const response = res.data.users || [];
                setfecthedUsers(response);
            } catch (error) {
                // toast.error(error.message);
                console.log(error)
            } finally {
                setloading(false);
            }
        };
        fetchusers();
    }, [searchterm]);

    return (
        <div className='user-container'>
            <Balance />
            <input
                className='search-input'
                type="text"
                onChange={e => setsearchterm(e.target.value)}
                placeholder="Search Users To Pay"
            />
            <div className='users-list' style={{width: '100%', maxWidth: 420, marginTop: 24}}>
                {fecthedUsers.map((user) => (
                    <div key={user._id} className='user-card' style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 12,
                        padding: '16px 20px',
                        marginBottom: 12,
                        color: '#f1f1f1',
                        fontSize: 18,
                        fontWeight: 500,
                        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.15)'
                    }}>
                        <span style={{fontWeight: 600}}>{user.firstName} {user.lastName}</span>
                        <span style={{color: '#a0a0a0', marginLeft: 8}}>@{user.username}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Users;