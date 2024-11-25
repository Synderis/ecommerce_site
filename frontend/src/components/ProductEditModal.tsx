import Modal from 'react-modal';
import { useState } from 'react';
import { UpdateProduct, UploadImage } from '../services/AdminServices';
import { Input, Textarea } from '@material-tailwind/react';
import { Product } from '../utils/types';

interface EditProductModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

export const ProductEditModal = ({ product, isOpen, onClose }: EditProductModalProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [editingProduct, setEditingProduct] = useState<Product | null>(product);
    const [editForm, setEditForm] = useState({
        title: product.title,
        description: product.description,
        discount_percentage: 0,
        rating: 0,
        created_at: product.created_at,
        brand: product.brand,
        category_id: product.category_id,
        price: product.price,
        stock: product.stock,
        is_published: product.is_published,
        thumbnail: product.thumbnail,
        images: product.images
    });

    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [imageFiles, setImageFiles] = useState<File[]>([]);

    const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setThumbnailFile(event.target.files[0]);
            setEditForm({ ...editForm, thumbnail: event.target.files[0].name });
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImageFiles(Array.from(event.target.files));
            setEditForm({ ...editForm, images: Array.from(event.target.files).map((file) => file.name) });
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked, value } = event.target;
        if (id === 'is_published') {
            setEditForm({ ...editForm, [id]: checked});
        } else if (id === 'price' || id === 'stock') {
            setEditForm({ ...editForm, [id]: Number(value) });
        } else {
            setEditForm({ ...editForm, [id]: value });
        }
    };

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setEditForm({ ...editForm, [name]: value });
    };

    const handleSaveEditProduct = async () => {
        const payload = {
            "title": editForm.title,
            "description": editForm.description,
            "price": editForm.price,
            "stock": editForm.stock,
            "discount_percentage": 0,
            "brand": product.brand,
            "rating": 0,
            "created_at": product.created_at,
            "category_id": product.category_id,
            "is_published": editForm.is_published,
            "thumbnail": editForm.thumbnail ?? product.thumbnail,
            "images": editForm.images ?? product.images
        }

        if (thumbnailFile) {
            // const formData = new FormData();
            await UploadImage(thumbnailFile);
        }

        if (imageFiles.length > 0) {
            
            // const formData = new FormData();
            for (const file of imageFiles) {
                console.log(file);
                await UploadImage(file);
            }
        }

        const updatedProduct = await UpdateProduct(product.id, payload);
        setEditingProduct(updatedProduct);
        onClose();
    };



    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onClose} 
            className="fixed inset-0 lg:w-full w-2/3 flex items-center justify-center z-50" 
            overlayClassName="overlay"
        >
            <div className="dark:bg-gray-700 p-8 lg:ml-0 ml-32 rounded-lg shadow-lg">
                <div className="modal-header border-b border-gray-200">
                    <h5 className="modal-title">Edit Product</h5>
                </div>
                <div className="modal-body p-4">
                    <form>
                        <div className="form-group mb-4 py-2">
                            <label className='mb-2'>Product Title</label>
                            <Input
                                onChange={handleChange}
                                id="title"
                                color="gray"
                                size="lg"
                                type="text"
                                name="title"
                                value={editForm.title}
                                placeholder="product name"
                                className="w-full placeholder:opacity-100 dark:text-gray-900 focus:border-t-primary border-t-blue-gray-200 dark:focus:border-orange-300"
                                labelProps={{
                                    className: "hidden",
                                }}
                            />
                        </div>
                        <div className="form-group mb-4 py-2">
                            <label className='mb-2'>Description</label>
                            <Textarea color="gray" size="lg" name="description" value={editForm.description} onChange={handleTextAreaChange} className='w-full placeholder:opacity-100 dark:text-gray-900 focus:border-t-primary border-t-blue-gray-200 dark:focus:border-orange-300'>
                            </Textarea>
                        </div>
                        <div className="form-group mb-4 py-2">
                            <label className='mb-2'>Price</label>
                            <Input
                                onChange={handleChange}
                                id="price"
                                color="gray"
                                size="lg"
                                type="number"
                                name="price"
                                value={(editForm.price / 100).toFixed(2)}
                                placeholder="product price"
                                className="w-full placeholder:opacity-100 dark:text-gray-900 focus:border-t-primary border-t-blue-gray-200 dark:focus:border-orange-300"
                                labelProps={{
                                    className: "hidden",
                                }}
                            />
                        </div>
                        <div className="form-group mb-6">
                            <label className='mb-2'>Stock</label>
                            <Input
                                onChange={handleChange}
                                id="stock"
                                color="gray"
                                size="lg"
                                type="number"
                                name="stock"
                                placeholder="1"
                                value={editForm.stock}
                                className="w-full placeholder:opacity-100 dark:text-gray-900 focus:border-t-primary border-t-blue-gray-200 dark:focus:border-orange-300"
                                labelProps={{
                                    className: "hidden",
                                }}
                            />
                        </div>
                        <div className="inline-flex items-center mt-2">
                            <label className="cursor-pointer mr-2 opacity-75 dark:text-white text-sm" htmlFor="is_published">
                                Publish: 
                            </label>
                            <label className="flex items-center cursor-pointer relative" htmlFor="is_published">
                                <input
                                    type="checkbox"
                                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                                    id="is_published"
                                    onChange={handleChange}
                                    checked={editForm.is_published}
                                />
                                <span className="absolute text-white opacity-0 pointer-events-none peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3.5 w-3.5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        stroke="currentColor"
                                        stroke-width="1"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </span>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Thumbnail:</label>
                            <input type="file" className='cursor-pointer' onChange={handleThumbnailChange} />
                        </div>
                        <div className="form-group">
                            <label>Images:</label>
                            <input type="file" className='cursor-pointer' multiple onChange={handleImageChange} />
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button
                        className="btn btn-primary px-4 py-2 mr-2"
                        onClick={() => handleSaveEditProduct()}
                    >
                        Save Changes
                    </button>
                    <button
                        className="btn btn-secondary px-4 py-2"
                        onClick={() => onClose()}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    )
}