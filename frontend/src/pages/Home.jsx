import React, { useEffect, useState } from 'react';
import Users from '../components/Users';
import axios from 'axios';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.warn('No token found.');
                return;
            }

            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${searchTerm}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(res.data?.users || []);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [searchTerm]);

    return (
        <div className='home-container'>
            <div className='search-input'>
                <input
                    type='text'
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Search'
                />
            </div>

            {loading ? <p>Loading...</p> : null}

            {users.map((user) => (
                <Users user={user} key={user._id} />
            ))}
        </div>
    );
};

export default Home;