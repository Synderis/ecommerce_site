import Modal from 'react-modal';
import { s3_bucket_url } from "../utils/utils";

export const ProductImagesModal = ({ isOpen, onRequestClose, product }: { isOpen: boolean, onRequestClose: () => void, product: { title: string, thumbnail: string, images: string[] } }) => {
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
                        <h2 className="text-lg font-bold">{product.title}</h2>
                        <button className="modal-close" onClick={onRequestClose}>
                            Close
                        </button>
                    </div>
                    <div className="modal-body px-0 lg:p-4">
                        <div className="product-images">
                            <img src={`${s3_bucket_url}/${product.thumbnail}`} alt={product.title} className="w-32 h-32" />
                        </div>
                        <div className="flex justify-center">
                            {product.images.map((image, index) => (
                                <img key={index} src={`${s3_bucket_url}/${image}`} alt={product.title} className="w-32 h-32" />
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};