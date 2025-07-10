import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Transfer = ({ receiverId, senderId, senderName, receiverName }) => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState(0);

    const transfer = async () => {
        try {
            await axios.post(
                'http://localhost:3000/api/v1/account/transfer',
                {
                    fromAccount: senderId,
                    toAccount: receiverId,
                    amount: parseFloat(amount)
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            navigate('/');
        } catch (err) {
            // Replace with react-toastify if available, or use alert as fallback
            alert(err.response?.data?.message || 'Transfer failed');
        }
    };

    return (
        <div>
            <input
                type='number'
                onChange={(e) => setAmount(e.target.value)}
                placeholder='Enter amount'
            />
            <div style={{ marginBottom: 8 }}>
                <strong>Sender:</strong> {senderName} (ID: {senderId})
            </div>
            <button onClick={transfer}>
                Transfer Money to User: {receiverName}
            </button>
        </div>
    );
};

export default Transfer;