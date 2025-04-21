import { useEffect } from 'react'; // Import useEffect hook from React
import { useState } from 'react'; // Import useState hook from React
import { backendUrl, currency } from '../App'; // Import backendUrl and currency from App component
import { toast } from 'react-toastify'; // Import toast for displaying notifications
import axios from 'axios'; // Import axios for making HTTP requests

const List = ({ token }) => {
	const [list, setList] = useState([]); // State to store list of products

	const fetchList = async () => {
		try {
			const response = await axios.get(backendUrl + '/api/product/list'); // Fetch list of products
			if (response.data.products) {
				setList(response.data.products); // Set list if request is successful
			} else {
				toast.error(response.data.message); // Show error message if request fails
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message); // Show error message
		}
	};

	const removeProduct = async (id) => {
		try {
			const response = await axios.post(
				backendUrl + '/api/product/remove',
				{ id },
				{ headers: { token } }
			); // Remove product by ID
			if (response.data.success) {
				toast.success(response.data.message); // Show success message
				await fetchList(); // Fetch list again after removal
			} else {
				toast.error(response.data.message); // Show error message if removal fails
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message); // Show error message
		}
	};

	useEffect(() => {
		fetchList(); // Fetch list on component mount
	}, []);

	return (
		<>
			<p className="mb-2">All Products List</p>
			<div className="flex flex-col gap-2">
				{/* ----- list table title ------- */}
				<div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
					<b>image</b>
					<b>Name</b>
					<b>Category</b>
					<b>Price</b>
					<b className="text-center">Action</b>
				</div>
				{/* -------------product list------------ */}
				{list.map((item, index) => (
					<div
						className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
						key={index}
					>
						<img className="w-12" src={item.image[0]} alt="" />
						<p>{item.name}</p>
						<p>{item.category}</p>
						<p>
							{currency}
							{item.price}
						</p>
						<p
							onClick={() => removeProduct(item._id)}
							className="text-right md:text-center cursor-pointer text-lg"
						>
							X
						</p>
					</div>
				))}
			</div>
		</>
	);
};

export default List; // Export List component as default
