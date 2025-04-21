import axios from 'axios'; // Import axios for making HTTP requests
import { useState } from 'react'; // Import useState hook from React
import { backendUrl } from '../App'; // Import backendUrl from App component
import { toast } from 'react-toastify'; // Import toast for displaying notifications

const Login = ({ setToken }) => {
	const [email, setEmail] = useState(''); // State to store email input
	const [password, setPassword] = useState(''); // State to store password input

	const onSubmitHandler = async (e) => {
		try {
			e.preventDefault(); // Prevent default form submission behavior
			const response = await axios.post(
				backendUrl + '/api/user/admin', // API endpoint for admin login
				{ email, password }, // Request payload containing email and password
				{
					headers: {
						'Content-Type': 'application/json', // Set content type to JSON
						'Access-Control-Allow-Origin': '*', // Allow cross-origin requests
					},
					withCredentials: true, // Include credentials in the request
				}
			);
			if (response.data.success) {
				setToken(response.data.token); // Set token if login is successful
			} else {
				toast.error(response.data.message); // Show error message if login fails
			}
		} catch (error) {
			console.log(error); // Log error to console
			toast.error(error.message); // Show error message
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center w-full">
			<div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
				<h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
				<form onSubmit={onSubmitHandler}>
					<div className="mb-3 min-w-72 ">
						<p className="text-sm font-medium text-gray-700 mb-2">
							Email Address
						</p>
						<input
							onChange={(e) => setEmail(e.target.value)} // Update email state on input change
							value={email} // Set input value to email state
							className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
							type="email"
							placeholder="your@gmail.com"
							required // Make input required
						/>
					</div>
					<div className="mb-3 min-w-72">
						<p className="text-sm font-medium text-gray-700 mb-2">Password</p>
						<input
							onChange={(e) => setPassword(e.target.value)} // Update password state on input change
							value={password} // Set input value to password state
							className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
							type="password"
							placeholder="Enter your Password"
							required // Make input required
						/>
					</div>
					<button
						className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
						type="submit"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login; // Export Login component as default
