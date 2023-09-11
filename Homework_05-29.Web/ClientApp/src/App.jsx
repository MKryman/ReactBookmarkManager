import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthorizeUserComponent } from './AuthorizeUserContext';
import Layout from './Components/Layout';
import Private from './Components/Private';
import Home from './Pages/home';
import Login from './Pages/login';
import Logout from './Pages/logout';
import Signup from './Pages/signup';
import MyBookmarks from './Pages/MyBookmarks';
import AddBookmark from './Pages/AddBookmark';

const App = () => {
    return (
        <AuthorizeUserComponent>
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/signup' element={<Signup />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/mybookmarks' element={
                        <Private>
                            <MyBookmarks />
                        </Private>
                    } />
                    <Route exact path='/addbookmark' element={
                        <Private>
                            <AddBookmark />
                        </Private>
                    } />
                    <Route exact path='/logout' element={
                        <Private>
                            <Logout />
                        </Private>
                    } />
                </Routes>
            </Layout>
        </AuthorizeUserComponent>
    )
}

export default App;