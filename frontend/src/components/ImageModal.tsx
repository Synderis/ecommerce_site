import Modal from 'react-modal';

export const ProductImagesModal = ({ isOpen, onRequestClose, product }: { isOpen: boolean, onRequestClose: () => void, product: { title: string, thumbnail: string, images: string[] } }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="fixed inset-0 lg:w-full w-2/3 flex items-center justify-center z-50"
            overlayClassName="overlay"
        >
            <div className="dark:bg-gray-700 p-8 lg:ml-0 ml-32 rounded-lg shadow-lg">
                <div className="modal-header border-b border-gray-200">
                    <h2 className="text-lg font-bold">{product.title}</h2>
                    <button className="modal-close" onClick={onRequestClose}>
                        Close
                    </button>
                </div>
                <div className="modal-body p-4">
                    <div className="product-images">
                        <img src={`http://localhost:8000/assets/${product.thumbnail}`} alt={product.title} className="w-32 h-32" />
                        {product.images.map((image, index) => (
                            <img src={`http://localhost:8000/assets/${image}`} alt={product.title} key={index} className="w-48 h-48" />
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
};