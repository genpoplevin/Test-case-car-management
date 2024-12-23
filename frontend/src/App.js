import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CarList from './components/CarList';
import Header from './components/Header';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cars" element={<CarList />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
