"use client";
import React, { useEffect, useState } from 'react';

const AllUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h1>All Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default AllUsers;
