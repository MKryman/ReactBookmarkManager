import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthorizeUser } from "../AuthorizeUserContext";
import BookmarkRow from "../Components/BookmarkRow";

const MyBookmarks = () => {

    const [myBookmarks, setMyBookmarks] = useState([]);
    const { user } = AuthorizeUser();
    const nav = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const { data } = await axios.get('/api/bookmark/getmybookmarks');
        setMyBookmarks(data);
    };


    const deleteLink = async b => {
        await axios.post('/api/bookmark/delete', b);
        loadData();
    }


    return (
        <div className="container" style={{ marginTop: 80 }}>
            <main role="main" className="pb-3">
                <div style={{ marginTop: 20 }}>
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Welcome back {user.name}</h1>
                            <Link to='/addbookmark' className="btn btn-primary" style={{ marginBottom: 10 }}>Add Bookmark</Link>
                        </div>
                    </div>
                    <table className="table table-hover table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>URL</th>
                                <th>Edit/Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myBookmarks.map(b =>
                                <BookmarkRow bookmark={b}
                                    // editTitle={editTitle}
                                    loadData={loadData}
                                    deleteLink={() => deleteLink(b)}
                                />
                            )}
                        </tbody>
                    </table>
                </div>
            </main >
        </div >
    )
}

export default MyBookmarks;