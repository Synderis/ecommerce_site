import React, { useState, useEffect } from 'react';
import { Order, AddressDetails } from '../utils/types';
import { AllOrders, AllOrderItems, UpdateShippingStatus, GetShippingDetails } from '../services/AdminServices';
import { Button } from '@material-tailwind/react';
import { ShippingModal } from './ShippingDetailsModal';
import { s3_bucket_url } from "../utils/utils";

const OrdersTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [orderItems, setOrderItems] = useState<Order['order_items'] | null>(null);
  const [completedFilter, setCompletedFilter] = useState(true);
  const [shippedFilter, setShippedFilter] = useState(true);
  const [shippingModal, setShippingModal] = useState(false);
  const [address, setAddress] = useState<AddressDetails | null>(null);


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
    const response = await AllOrderItems( order_id );
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

  const handleShippingClick = async ( order_id: number ) => {
    const shipping_details = await GetShippingDetails( order_id );
    setAddress(shipping_details);
    setShippingModal(true)
  };

  const filteredOrders = orders.filter((order) => {
    if (completedFilter && !order.completed_at) return false;
    if (shippedFilter && order.shipped_at) return false;
    return true;
  });

  return (
    <div className="relative flex flex-col lg:p-4 dark:bg-gray-800 dark:bg-gradient-to-b dark:from-orange-300/30 dark:to-blue-gray-900 w-full h-full lg:overflow-hidden overflow-x-auto text-gray-700 bg-white lg:shadow-md rounded-lg bg-clip-border">
    <div className="flex justify-start mb-4">
      <button
        className={`px-4 py-2 ${completedFilter ? 'bg-blue-500 dark:bg-orange-800/30 text-white' : 'bg-gray-200 dark:bg-gray-800'} mr-2 rounded-md`}
        onClick={() => setCompletedFilter(!completedFilter)}
      >
        {completedFilter ? 'Show pending' : 'Hide pending'}
      </button>
      <button
        className={`px-4 py-2 ${shippedFilter ? 'bg-blue-500 dark:bg-orange-800/30 text-white' : 'bg-gray-200 dark:bg-gray-800'} mr-2 rounded-md`}
        onClick={() => setShippedFilter(!shippedFilter)}
      >
        {shippedFilter ? 'Show shipped' : 'Hide shipped'}
      </button>
    </div>
    <table className="w-full text-center table-auto min-w-max pl-7 ml-3">
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
        {filteredOrders.map((order) => (
          <tr key={order.id}>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{order.id}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{order.user_id}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{new Date(order.created_at).toLocaleString()}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{(order.item_total / 100).toFixed(2)}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{(order.tax_total / 100).toFixed(2)}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{(order.shipping_total / 100).toFixed(2)}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{(order.order_total / 100).toFixed(2)}</td>
            {/* <td>{order.payment_type}</td> */}
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{order.completed_at ? 'Completed' : 'Pending'}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{order.shipped_at ? 'Yes' : 'No'}</td>
            <Button
              className="bg-orange-300 ml-2 dark:bg-orange-800/30 text-blue-gray-900 dark:text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 w-20"
              onClick={() => handleCartClick(order.id)}
              >
              Items
            </Button>
            <Button
              className="bg-orange-300 ml-2 dark:bg-orange-800/30 text-blue-gray-900 dark:text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 w-20"
              onClick={() => handleOrderClick(order.id)}
              >
              Update Status
            </Button>
            <Button
              className="bg-orange-300 ml-2 dark:bg-orange-800/30 text-blue-gray-900 dark:text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 w-20"
              onClick={() => handleShippingClick(order.id)}
              >
              Shipping Details
            </Button>
          </tr>
        ))}
      </tbody>
    </table>
    {showModal && orderItems && (
      <div
      className="p-10 fixed inset-0 w-full flex items-center justify-center z-50 overflow-x-auto"
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
                  <td className="py-2 px-2 lg:px-4"><img src={`${s3_bucket_url}/${item.product.thumbnail}`} alt="product" className="w-16 h-16 object-cover rounded" /></td>
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
    {shippingModal && address && (
      <ShippingModal isOpen={shippingModal} onRequestClose={() => setShippingModal(false)} address={address} />
    )}
    </div>
  );
};

export default OrdersTable;