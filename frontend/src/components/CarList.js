import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CarList = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                'http://localhost:8000/api/cars/', 
                {headers: { Authorization: `Bearer ${token}` },}
            );
            setCars(response.data);
        };

        fetchCars();
    }, []);

    return (
        <ul>
            {cars.map((car) => (
                <li key={car.id}>
                    {car.make} {car.model} ({car.year}) 
                    владельца {car.owner.username}
                </li>
            ))}
        </ul>
    );
};

export default CarList;
