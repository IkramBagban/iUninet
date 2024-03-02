import React, { useEffect, useState } from 'react';
// import 'tailwindcss/tailwind.css';

const UserDetail = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetch('https://randomuser.me/api/?page=1&results=1&seed=abc')
            .then(response => response.json())
            .then(data => {
                setUserData(data.results[0]);
            });
    }, []);

    if (!userData) {
        return <div className="flex justify-center items-center h-screen">
            <p>Loading...</p>
        </div>;
    }

    return (
        <div className="bg-gray-100 p-10 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="md:flex md:flex-shrink-0">
                        <img className="h-full w-full md:w-48 object-cover" src={userData.picture.large} alt="User" />
                    </div>
                    <div className="p-4">
                        <h2 className="text-xl font-semibold text-gray-800">{`${userData.name.title} ${userData.name.first} ${userData.name.last}`}</h2>
                        <p className="text-gray-600"><strong>Email:</strong> {userData.email}</p>
                        <p className="text-gray-600"><strong>Gender:</strong> {userData.gender}</p>
                        <p className="text-gray-600"><strong>Phone:</strong> {userData.phone}</p>
                        <p className="text-gray-600"><strong>Cell:</strong> {userData.cell}</p>
                        <p className="text-gray-600"><strong>Address:</strong> {`${userData.location.street.number} ${userData.location.street.name}, ${userData.location.city}, ${userData.location.state}, ${userData.location.country}, ${userData.location.postcode}`}</p>
                        <p className="text-gray-600"><strong>Date of Birth:</strong> {new Date(userData.dob.date).toLocaleDateString()}</p>
                        <p className="text-gray-600"><strong>Registered:</strong> {new Date(userData.registered.date).toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <div className="flex justify-between items-center p-4 border-b border-gray-700">
                        <h3 className="text-xl font-semibold text-white">{`${userData.name.title} ${userData.name.first} ${userData.name.last}`}</h3>
                        <img className="w-16 h-16 rounded-full border-4 border-gray-800" src={userData.picture.large} alt="User" />
                    </div>
                    <div className="p-4">
                        <p className="text-gray-400"><span className="text-white font-semibold">Email:</span> {userData.email}</p>
                        <p className="text-gray-400"><span className="text-white font-semibold">Gender:</span> {userData.gender}</p>
                        <p className="text-gray-400"><span className="text-white font-semibold">Phone:</span> {userData.phone}</p>
                        <p className="text-gray-400"><span className="text-white font-semibold">Cell:</span> {userData.cell}</p>
                        <p className="text-gray-400"><span className="text-white font-semibold">Address:</span> {`${userData.location.street.number} ${userData.location.street.name}, ${userData.location.city}, ${userData.location.state}, ${userData.location.country}, ${userData.location.postcode}`}</p>
                        <p className="text-gray-400"><span className="text-white font-semibold">DOB:</span> {new Date(userData.dob.date).toLocaleDateString()}</p>
                        <p className="text-gray-400"><span className="text-white font-semibold">Registered:</span> {new Date(userData.registered.date).toLocaleDateString()}</p>
                    </div>
                </div>



                <div className="bg-white rounded-lg shadow-md p-4 flex flex-col md:relative">
                    <div className="md:absolute md:align-center md:right-4 md:top-4 md:w-32 md:h-32">
                        <img className="rounded-lg md:w-full md:h-full" src={userData.picture.large} alt="User" />
                    </div>
                    <div className="md:pt-16">
                        <h2 className="text-xl font-semibold text-gray-800">{`${userData.name.title} ${userData.name.first} ${userData.name.last}`}</h2>
                        <p className="text-gray-600"><strong>Email:</strong> {userData.email}</p>
                        <p className="text-gray-600"><strong>Gender:</strong> {userData.gender}</p>
                        <p className="text-gray-600"><strong>Phone:</strong> {userData.phone}</p>
                        <p className="text-gray-600"><strong>Cell:</strong> {userData.cell}</p>
                        <p className="text-gray-600"><strong>Address:</strong> {`${userData.location.street.number} ${userData.location.street.name}, ${userData.location.city}, ${userData.location.state}, ${userData.location.country}, ${userData.location.postcode}`}</p>
                        <p className="text-gray-600"><strong>Date of Birth:</strong> {new Date(userData.dob.date).toLocaleDateString()}</p>
                        <p className="text-gray-600"><strong>Registered:</strong> {new Date(userData.registered.date).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;
