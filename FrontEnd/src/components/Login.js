import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

export default function Login(props) {
    const [credentials, setCredentials] = useState({email : "", password :""});
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        const json = await response.json();
        if(json.success===true){
            // redirect save the token
            localStorage.setItem('token',json.authToken)
            console.log(localStorage.getItem('token'))
            navigate('/');
            props.showAlert("User Loggedin Successfully !",'success')
        }
        else{
            props.showAlert("Invalid Credentials !",'danger')
        }
        console.log(json);
    }
    return (
        <div className='container my-5'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name='email' className="form-control" id="email" onChange={onChange} value={credentials.email} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" onChange={onChange} value={credentials.password} id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
