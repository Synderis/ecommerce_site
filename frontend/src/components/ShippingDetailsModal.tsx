import Modal from 'react-modal';

export const ShippingModal = ({ isOpen, onRequestClose, address }: { isOpen: boolean, onRequestClose: () => void, address: { full_name: string, street_address: string, city: string, state: string, zip: string } }) => {
    return (
        <div onClick={(e) => onRequestClose()}>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                className="fixed inset-0 lg:w-full w-full lg:px-0 flex items-center justify-center z-50"
                overlayClassName="overlay"
            >
                <div className="dark:bg-gray-700 lg:p-8 lg:ml-0 mx-3 px-2 py-3 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header border-b border-gray-200">
                        <h2 className="text-lg font-bold">Shipping Details</h2>
                        <button className="modal-close" onClick={onRequestClose}>
                            Close
                        </button>
                    </div>
                    <div className="modal-body px-0 lg:p-4">
                        <div className="shipping-details">
                            <p>Full Name: {address.full_name}</p>
                            <p>Address: {address.street_address}</p>
                            <p>City: {address.city}</p>
                            <p>State: {address.state}</p>
                            <p>Zip Code: {address.zip}</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};