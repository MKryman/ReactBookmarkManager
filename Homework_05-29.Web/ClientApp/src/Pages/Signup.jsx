import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const textChange = e => {
        const copy = { ...formData };
        copy[e.target.name] = e.target.value;
        setFormData(copy);
    }

    const submitForm = async e => {
        e.preventDefault();
        await axios.post('/api/account/signup', formData);
        navigate('/login');
    }

    return (
        <div className="container" style={{ marginTop: 80 }}>
            <main role="main" className="pb-3">
                <div className="row" style={{ minHeight: '80vh', display: 'flex', alignItems: "center" }}>
                    <div className="col-md-6 offset-md-3 p-4 rounded shadow">
                        <h3>Sign up for a new account</h3>
                        <form onSubmit={submitForm}>
                            <input type="text" onChange={textChange} name="name" placeholder="Name" className="form-control" value={formData.name} />
                            <br />
                            <input type="text" onChange={textChange} name="email" placeholder="Email" className="form-control" value={formData.email} />
                            <br />
                            <input type="text" onChange={textChange} name="password" placeholder="Password" className="form-control" value={formData.password} />
                            <br />
                            <button className="btn btn-primary" type="submit">Sign Up</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Signup;