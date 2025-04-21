// Import NavLink from react-router-dom to create navigation links
import { NavLink } from 'react-router-dom';
// Import assets from the assets folder
import { assets } from '../assets/assets';

// Define the Sidebar component
const Sidebar = () => {
	// Return the JSX for the Sidebar component
	return (
		// Create a div with a fixed width, minimum height of the screen, and a right border
		<div className="w-[18%] min-h-screen border-r-2">
			{/* Create a flexbox container with column direction, gap between items, padding, and text size */}
			<div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
				{/* Create a navigation link to the "Add Items" page */}
				<NavLink
					className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
					to="/add"
				>
					{/* Display an icon for adding items */}
					<img className="w-5 h-5" src={assets.add_icon} alt="" />
					{/* Display the text "Add Items" which is hidden on small screens */}
					<p className="hidden md:block">Add Items</p>
				</NavLink>

				{/* Create a navigation link to the "Link Items" page */}
				<NavLink
					className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
					to="/list"
				>
					{/* Display an icon for linking items */}
					<img className="w-5 h-5" src={assets.order_icon} alt="" />
					{/* Display the text "Link Items" which is hidden on small screens */}
					<p className="hidden md:block">Link Items</p>
				</NavLink>

				{/* Create a navigation link to the "Orders" page */}
				<NavLink
					className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
					to="/orders"
				>
					{/* Display an icon for orders */}
					<img className="w-5 h-5" src={assets.order_icon} alt="" />
					{/* Display the text "Orders" which is hidden on small screens */}
					<p className="hidden md:block">Orders</p>
				</NavLink>
			</div>
		</div>
	);
};

// Export the Sidebar component as the default export
export default Sidebar;
