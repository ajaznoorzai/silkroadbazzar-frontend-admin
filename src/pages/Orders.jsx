import React from 'react'; // Import React
import { useEffect } from 'react'; // Import useEffect hook from React
import { useState } from 'react'; // Import useState hook from React
import axios from 'axios'; // Import axios for making HTTP requests
import { backendUrl, currency } from '../App'; // Import backendUrl and currency from App component
import { toast } from 'react-toastify'; // Import toast for displaying notifications
import { assets } from '../assets/assets'; // Import assets

const Orders = ({ token }) => {
	const [orders, setOrders] = useState([]); // State to store orders

	const fetchAllOrders = async () => {
		if (!token) {
			return null; // Return if token is not available
		}

		try {
			const response = await axios.post(
				backendUrl + '/api/order/list',
				{},
				{ headers: { token } }
			); // Fetch all orders
			if (response.data.success) {
				setOrders(response.data.orders); // Set orders if request is successful
			} else {
				toast.error(response.data.message); // Show error message if request fails
			}
		} catch (error) {
			toast.error(error.message); // Show error message
		}
	};

	const statusHandler = async (event, orderId) => {
		try {
			const response = await axios.post(
				backendUrl + '/api/order/status',
				{ orderId, status: event.target.value },
				{ headers: { token } }
			); // Update order status
			if (response.data.success) {
				await fetchAllOrders(); // Fetch all orders again if status update is successful
			}
		} catch (error) {
			console.log(error);
			toast.error(response.data.message); // Show error message
		}
	};

	useEffect(() => {
		fetchAllOrders(); // Fetch all orders on component mount
	}, [token]);

	return (
		<div>
			<h3>Order Page</h3>
			<div>
				{orders.map((order, index) => (
					<div
						className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
						key={index}
					>
						<img className="w-12" src={assets.parcel_icon} alt="" />

						<div>
							<div>
								{order.items.map((item, index) => {
									if (index === order.items.length - 1) {
										return (
											<p className="py-0.5" key={index}>
												{' '}
												{item.name} x {item.quantity} <span>{item.size}</span>{' '}
											</p>
										);
									} else {
										return (
											<p className="py-0.5" key={index}>
												{' '}
												{item.name} x {item.quantity} <span>{item.size}</span>,{' '}
											</p>
										);
									}
								})}
							</div>
							<p className="mt-3 md-2 font-medium">
								{order.address.firstName + ' ' + order.address.lastName}
							</p>
							<div>
								<p>{order.address.street + ','}</p>
								<p>
									{order.address.city +
										', ' +
										order.address.state +
										', ' +
										order.address.country +
										', ' +
										order.address.zipcode}
								</p>
							</div>
							<p>{order.address.phone}</p>
						</div>
						<div>
							<p className="text-sm sm:text-[15px]">
								Item : {order.items.length}
							</p>
							<p className="mt-3">Method : {order.paymentMethod}</p>
							<p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
							<p>Date : {new Date(order.date).toLocaleDateString()}</p>
						</div>
						<p className="text-sm sm:text-[15px]">
							{currency} {order.amount}
						</p>
						<select
							onChange={(event) => statusHandler(event, order._id)}
							value={order.status}
							className="p-2 font-semibold"
						>
							<option value="Order Placed">Order Placed</option>
							<option value="Packing">Packing</option>
							<option value="Shipped">Shipped</option>
							<option value="Out for Delivery">Out for Delivery</option>
							<option value="Delivered">Delivered</option>
						</select>
					</div>
				))}
			</div>
		</div>
	);
};

export default Orders; // Export Orders component as default
