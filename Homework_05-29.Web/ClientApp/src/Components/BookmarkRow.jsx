import React, { useState } from "react";
import axios from 'axios';

const BookmarkRow = ({ deleteLink, loadData, bookmark}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(bookmark.title);

    const updateTitle = async b => {
        b.title = title;
        await axios.post('/api/bookmark/update', b);
        loadData();
    }


    return (
        <tr key={bookmark.id}>
            <td>{isEditing ? <input type="text" className="form-control" value={title} name="title" onChange={e => setTitle(e.target.value)} />
                : bookmark.title}</td>
            <td><a href={bookmark.link} target="_blank">{bookmark.link}</a></td>
            <td>
                {isEditing ? <>
                    <button className="btn btn-warning" style={{ marginRight: 2 }} onClick={() => {setIsEditing(false); updateTitle(bookmark);}}>Update</button>
                    <button className="btn btn-dark" onClick={() => setIsEditing(false)}>Cancel</button></>
                    : <button className="btn btn-success" style={{ marginRight: 2 }} onClick={() => setIsEditing(true)}>Edit</button>}
                <button className="btn btn-danger" style={{ marginLeft: 2 }} onClick={deleteLink}>Delete</button>
            </td>
        </tr>
    );
}


export default BookmarkRow;