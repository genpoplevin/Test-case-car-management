import React, { useEffect, useState } from 'react';
import './Profile.css';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [form, setForm] = useState({
        id: null,
        make: '',
        model: '',
        year: '',
        color: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            fetch(
                'http://localhost:8000/api/profile/',
                {headers: { Authorization: `Bearer ${token}` },}
            )
                .then(response => response.json())
                .then(data => setProfile(data))
                .catch(error => setError(error.message));

            fetch('http://localhost:8000/api/cars/',
                {headers: { Authorization: `Bearer ${token}` },}
            )
                .then(response => response.json())
                .then(data => setCars(data))
                .catch(error => setError(error.message))
                .finally(() => setLoading(false));
        } else {
            setError('No token found. Please log in.');
            setLoading(false);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const method = form.id ? 'PUT' : 'POST';
        const url = form.id
            ? `http://localhost:8000/api/cars/${form.id}/`
            : 'http://localhost:8000/api/cars/';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                make: form.make,
                model: form.model,
                year: form.year,
                color: form.color,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (form.id) {
                    setCars(cars.map(car => (car.id === data.id ? data : car)));
                } else {
                    setCars([...cars, data]);
                }
                setForm({ id: null, make: '', model: '', year: '', color: '' });
            })
            .catch(error => setError(error.message));
    };

    const handleEdit = (car) => {
        setForm(car);
    };

    const handleDelete = (id) => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:8000/api/cars/${id}/`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => setCars(cars.filter(car => car.id !== id)))
            .catch(error => setError(error.message));
    };

    if (loading) return <div>Loading profile...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div className="profile-container">
            <h1>Driver Profile</h1>
            {profile && (
                <div className="profile-details">
                    <p><strong>Username:</strong> {profile[0].username}</p>
                    <p><strong>Email:</strong> {profile[0].email}</p>
                </div>
            )}

            <h2>Your Cars</h2>
            <form onSubmit={handleSubmit} className="car-form">
                <input
                    type="text"
                    name="make"
                    placeholder="Make"
                    value={form.make}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="model"
                    placeholder="Model"
                    value={form.model}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="year"
                    placeholder="Year"
                    value={form.year}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="color"
                    placeholder="Color"
                    value={form.color}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">
                    {form.id ? 'Update Car' : 'Add Car'}
                </button>
            </form>

            <div className="cars-container">
                {cars.length > 0 ? (
                    cars.map(car => (
                        <div className="car-card" key={car.id}>
                            <h3>{car.make} {car.model}</h3>
                            <p><strong>Year:</strong> {car.year}</p>
                            <p><strong>Color:</strong> {car.color}</p>
                            <button onClick={() => handleEdit(car)}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(car.id)}>
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No cars found.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
