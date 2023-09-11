import React, {useState, useEffect} from "react";
import axios from 'axios';

const Home = () => {

    const [topFive, setTopFive] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const {data} = await axios.get('/api/bookmark/loadhomepage');
        setTopFive(data);
    }

    return (
        <div className="container" style={{ marginTop: 100 }}>
            <main role="main" className="pb-3">
                <div>
                    <h1 style={{textAlign: 'center'}}>Welcome to the React Bookmark Application</h1>
                    <h3 style={{textAlign: 'center'}}>Top 5 most bookmarked links</h3>
                    <table className="table table-hover table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>URL</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topFive.map(r => 
                            { return (
                                    <tr key={r.id}>
                                        <td>{r.link}</td>
                                        <td>{r.count}</td>
                                    </tr>
                                )}
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}

export default Home;