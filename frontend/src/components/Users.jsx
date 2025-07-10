import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Transfer from './Transfer';
import { useNavigate } from 'react-router-dom';

const Users = ({ user }) => {
    const navigate = useNavigate();
    const [sender, setSender] = useState({
        fullname: '',
        firstName: '',
        lastName: '',
        _id: '',
        id: ''
    });

    useEffect(() => {
        const fetchMe = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                navigate('/login'); // Uncommented this line
                return;
            }

            try {
                // Use correct endpoint (adjust if necessary)
                const res = await axios.get('http://localhost:3000/api/v1/user/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSender(res.data.user);
            } catch (error) {
                console.error('Error fetching user:', error.response?.data || error.message);
                if (error.response?.status === 401) {
                    localStorage.removeItem('token'); // Clear invalid token
                    navigate('/login'); // Redirect to login
                }
            }
        };
        fetchMe();
    }, [navigate]);

    const fullname = `${user.firstName} ${user.lastName}`;
    const receiverId = user._id;

    return (
        <div className='user-container'>
            <ul>
                <li>
                    <div className='user'>
                        <div className='name'>{fullname}</div>
                        <Transfer
                            receiverId={receiverId}
                            receiverName={fullname}
                            senderId={sender._id}
                            senderName={`${sender.firstName} ${sender.lastName}`}
                        />
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Users;