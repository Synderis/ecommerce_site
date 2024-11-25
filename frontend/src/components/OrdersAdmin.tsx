import React, { useState, useEffect } from 'react';
import { Order } from '../utils/types';
import { AllOrders, UpdateShippingStatus } from '../services/AdminServices';
import { OrderItems } from '../services/OrderServices';
import { Button } from '@material-tailwind/react';

const OrdersTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [orderItems, setOrderItems] = useState<Order['order_items'] | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await AllOrders();
        const data = await response;
        setOrders(data);
      } catch (error: Error | any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCartClick = async ( order_id: number ) => {
    const response = await OrderItems( order_id );
    console.log(response);
    setOrderItems(response);
    setShowModal(true);
  };

  const handleOrderClick = async (order_id: number) => {
    await UpdateShippingStatus(order_id);
    const response = await AllOrders();
    const data = await response;
    setOrders(data);
    // setShowModal(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="relative flex flex-col lg:p-4 dark:bg-gray-800 lg:dark:bg-gradient-to-b lg:dark:from-orange-300/30 lg:dark:to-blue-gray-900 w-full h-full overflow-hidden text-gray-700 bg-white lg:shadow-md rounded-lg bg-clip-border">
      <table className="w-full text-left table-auto min-w-max pl-7 ml-3">
      <thead>
        <tr>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">ID</th>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">User ID</th>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Order Timestamp</th>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Item Total</th>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Tax Total</th>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Shipping Total</th>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Order Total</th>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Status</th>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Shipped</th>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white"></th>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white"></th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{order.id}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{order.user_id}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{new Date(order.order_timestamp).toLocaleString()}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{(order.item_total / 100).toFixed(2)}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{(order.tax_total / 100).toFixed(2)}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{(order.shipping_total / 100).toFixed(2)}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{(order.order_total / 100).toFixed(2)}</td>
            {/* <td>{order.payment_type}</td> */}
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{order.completed ? 'Completed' : 'Pending'}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{order.shipped ? 'Shipped' : 'Not Shipped'}</td>
            <Button
              className="bg-orange-300 dark:bg-orange-800/30 text-blue-gray-900 dark:text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 w-20"
              onClick={() => handleCartClick(order.id)}
              >
              Items
            </Button>
            <Button
              className="bg-orange-300 dark:bg-orange-800/30 text-blue-gray-900 dark:text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 w-20"
              onClick={() => handleOrderClick(order.id)}
              >
              Update Status
            </Button>
          </tr>
        ))}
      </tbody>
    </table>
    {showModal && orderItems && (
      <div
      className="fixed inset-0 lg:w-full w-2/3 flex items-center justify-center z-50"
      onClick={() => setShowModal(false)}
      >
          <div className="dark:bg-gray-700 p-8 lg:ml-0 ml-32 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
          <table className="w-full">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th className="py-2 px-2 lg:px-4">Image</th>
                  <th className="py-2 px-2 lg:px-4">Product</th>
                  <th className="py-2 px-2 lg:px-4">Quantity</th>
                  <th className="py-2 px-2 lg:px-4">Subtotal</th>
              </tr>
              </thead>
              <tbody>
              {orderItems.map((item) => (
                  <tr key={item.id} className="bg-white dark:bg-gray-800 dark:border-gray-700">
                  <td className="py-2 px-2 lg:px-4"><img src={`http://localhost:8000/assets/${item.product.thumbnail}`} alt="product" className="w-16 h-16 object-cover rounded" /></td>
                  <td className="py-2 px-2 lg:px-4">{item.product.title}</td>
                  <td className="py-2 px-2 lg:px-4">{item.quantity}</td>
                  <td className="py-2 px-2 lg:px-4">${(item.subtotal / 100).toFixed(2)}</td>
                  </tr>
              ))}
              </tbody>
          </table>
          <button onClick={() => { setShowModal(false) }}>Close</button>
          </div>
      </div>
    )}
    </div>
  );
};

export default OrdersTable;