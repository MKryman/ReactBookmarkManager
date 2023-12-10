import React, {useState} from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { AuthorizeUser } from "../AuthorizeUserContext";

const AddBookmark = () => {
    const [formData, setFormData] = useState({title: '', link: ''});
    const {user} =AuthorizeUser();
    const navigate = useNavigate();

    const textChange = e => {
        const copy = {...formData};
        copy[e.target.name] = e.target.value;
        setFormData(copy);
    }

    const submitForm = async e => {
        e.preventDefault();
        await axios.post('/api/bookmark/addbookmark', formData);
        navigate('/mybookmarks');
    }
   
    return(
        <div className="container" style={{marginTop: 100}}>
            <main role="main" className="pb-3">
                <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                    <h3>Add Bookmark</h3>
                    <form onSubmit={submitForm}>
                        <input type="text" name="title" placeholder="Title" className="form-control" value={formData.title} onChange={textChange}/>
                        <br />
                        <input type="text" name="link" placeholder="URL" className="form-control" value={formData.link} onChange={textChange}/>
                        <br />
                        <button type="submit" className="btn btn-primary">Add</button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default AddBookmark;