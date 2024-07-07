import React, { useEffect, useId, useState } from 'react'; // Correct import for useState
import axios from "axios";
import toast  from 'react-hot-toast';
import { Link } from 'react-router-dom';
import "./user.css";

const User = () => {
    const [users, setUsers] = useState([]); // Correct state setter function

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/getall");
                if (Array.isArray(response.data)) {
                    setUsers(response.data); // Ensure data is an array before setting state
                } else {
                    console.error('API response is not an array');
                }
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };
        fetchData();
    }, []);
    const deleteUser=async(userId)=>{
        await axios.delete(`http://localhost:3000/api/delete/${userId}`)
        .then((response)=>{

            setUsers((prevUser)=> prevUser.filter((user)=>user._id !== useId))
            toast.success(response.data.msg,{position:'top-right'})

        })
        .catch((error)=>{
            console.log(error);

        })

    }


    return (
        <div className='userTable'>
            <Link to={"/add"} className='addButton'>Add User</Link>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>S No.</th>
                        <th>User name</th>
                        <th>User email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.fname} {user.lname}</td>
                            <td>{user.email}</td>
                            <td className='actionButtons'>
                                <button onClick={()=>deleteUser(user._id)}><i className="fa-solid fa-trash-can"></i></button>
                                <Link to={`/edit/${user._id}`}><i className="fa-solid fa-file-pen"></i></Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default User;
