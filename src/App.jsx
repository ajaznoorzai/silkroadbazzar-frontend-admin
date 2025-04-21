import React from 'react'; // Import React
import Navbar from './components/Navbar'; // Import Navbar component
import Sidebar from './components/Sidebar'; // Import Sidebar component
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route for routing
import Add from './pages/Add'; // Import Add page component
import List from './pages/List'; // Import List page component
import Orders from './pages/Orders'; // Import Orders page component
import { useState } from 'react'; // Import useState hook from React
import Login from './components/Login'; // Import Login component
import { ToastContainer } from 'react-toastify'; // Import ToastContainer for notifications
import { useEffect } from 'react'; // Import useEffect hook from React

export const backendUrl = import.meta.env.VITE_BACKEND_URL; // Get backend URL from environment variables
export const currency = '₹'; // Define currency symbol

const App = () => {
	const [token, setToken] = useState(
		localStorage.getItem('token') ? localStorage.getItem('token') : ''
	); // State to store token

	useEffect(() => {
		localStorage.setItem('token', token); // Save token to local storage whenever it changes
	}, [token]);

	return (
		<div className="bg-gray-50 min-h-screen">
			<ToastContainer /> {/* Container for displaying toast notifications */}
			{token === '' ? (
				<Login setToken={setToken} /> // Show Login component if token is empty
			) : (
				<>
					<Navbar setToken={setToken} /> {/* Show Navbar component */}
					<hr />
					<div className="flex w-full">
						<Sidebar /> {/* Show Sidebar component */}
						<div className="w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base">
							<Routes>
								<Route path="/add" element={<Add token={token} />} />{' '}
								{/* Route for Add page */}
								<Route path="/list" element={<List token={token} />} />{' '}
								{/* Route for List page */}
								<Route path="/orders" element={<Orders token={token} />} />{' '}
								{/* Route for Orders page */}
							</Routes>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default App; // Export App component as default
