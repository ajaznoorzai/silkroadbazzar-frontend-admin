// Define the Navbar component which takes setToken as a prop
const Navbar = ({ setToken }) => {
	// Return the JSX for the Navbar component
	return (
		// Create a div with flexbox styling, padding, and justify content between
		<div className="flex items-center py-2 px-[4%] justify-between">
			{/* Display the title of the dashboard */}
			<p className="font-display text-2xl text-primary">
				FreshDel Admin Dashboard
			</p>
			{/* Create a logout button that clears the token when clicked */}
			<button
				onClick={() => setToken('')} // Clear the token by calling setToken with an empty string
				className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
			>
				Logout
			</button>{' '}
			{/* End of the logout button */}
		</div>
	);
};

// Export the Navbar component as the default export
export default Navbar;
