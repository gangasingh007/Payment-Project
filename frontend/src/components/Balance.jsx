import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Balance = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBalance = async () => {
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:3000/api/v1/account/balance", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
        setBalance(res.data.balance);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch balance.");
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [token]);

  if (loading) return <div>Loading balance...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>Your Account Balance: ₹{balance}</div>
  );
};

export default Balance;
