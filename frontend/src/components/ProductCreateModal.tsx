// frontend/src/components/ProductCreateModal.tsx
import Modal from 'react-modal';
import { Input, Textarea } from '@material-tailwind/react';
import { useState } from 'react';
import { CreateProduct, UploadImage } from '../services/AdminServices';
import { ProductCreate } from '../utils/types';

interface ProductCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ProductCreateModal = ({ isOpen, onClose }: ProductCreateModalProps) => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [creatingProduct, setCreatingProduct] = useState<ProductCreate | null>(null);
    const [createForm, setCreateForm] = useState({
        title: '',
        description: '',
        discount_percentage: 0,
        rating: 0,
        brand: '',
        category_id: 1,
        price: 0,
        stock: 1,
        is_published: false,
        thumbnail: '',
        images: [] as string[],
    });

    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [imageFiles, setImageFiles] = useState<File[]>([]);

    const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setThumbnailFile(event.target.files[0]);
            setCreateForm({ ...createForm, thumbnail: event.target.files[0].name });
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImageFiles(Array.from(event.target.files));
            setCreateForm({ ...createForm, images: Array.from(event.target.files).map((file) => file.name) });
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        if (id === 'is_published') {
            setCreateForm({ ...createForm, [id]: value === 'true' ? true : false });
            return;
        } else if (id === 'price' || id === 'stock') {
            setCreateForm({ ...createForm, [id]: Number(value) });
        } else {
            setCreateForm({ ...createForm, [id]: value });
        }
    };

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setCreateForm({ ...createForm, [name]: value });
    };

    const handleCreateProduct = async () => {
        const payload = {
            title: createForm.title,
            description: createForm.description,
            price: createForm.price,
            stock: createForm.stock,
            discount_percentage: 0,
            brand: createForm.brand,
            rating: 0,
            category_id: 1,
            is_published: createForm.is_published,
            thumbnail: createForm.thumbnail,
            images: createForm.images
        };

        if (thumbnailFile) {
            await UploadImage(thumbnailFile);
        }

        if (imageFiles.length > 0) {
            for (const file of imageFiles) {
                await UploadImage(file);
            }
        }

        const newProduct = await CreateProduct(payload);
        setCreatingProduct(newProduct);
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
                    <h2 className="text-lg font-bold">Create New Product</h2>
                </div>
                <div className="modal-body p-4">
                    <form>
                        <div className="form-group">
                            <label>Title</label>
                            <Input
                                onChange={handleChange}
                                id="title"
                                color="gray"
                                size="lg"
                                type="text"
                                name="title"
                                placeholder="product name"
                                className="w-full placeholder:opacity-100 dark:text-gray-900 focus:border-t-primary border-t-blue-gray-200 dark:focus:border-orange-300"
                                labelProps={{
                                    className: "hidden",
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <Textarea color="gray" size="lg" name="description" onChange={handleTextAreaChange} className='w-full dark:text-gray-900 placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 dark:focus:border-orange-300'>
                            </Textarea>
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <Input
                                onChange={handleChange}
                                id="price"
                                color="gray"
                                size="lg"
                                type="number"
                                name="price"
                                placeholder="product price"
                                className="w-full placeholder:opacity-100 dark:text-gray-900 focus:border-t-primary border-t-blue-gray-200 dark:focus:border-orange-300"
                                labelProps={{
                                    className: "hidden",
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label>Stock</label>
                            <Input
                                onChange={handleChange}
                                id="stock"
                                color="gray"
                                size="lg"
                                type="number"
                                name="stock"
                                placeholder="1"
                                className="w-full placeholder:opacity-100 dark:text-gray-900 focus:border-t-primary border-t-blue-gray-200 dark:focus:border-orange-300"
                                labelProps={{
                                    className: "hidden",
                                }}
                            />
                        </div>
                        {/* <div className="form-group">
                            <label>Brand</label>
                            <Input
                                onChange={handleChange}
                                id="brand"
                                color="gray"
                                size="lg"
                                type="text"
                                name="brand"
                                placeholder="product brand"
                                className="w-full placeholder:opacity-100 dark:text-gray-900 focus:border-t-primary border-t-blue-gray-200 dark:focus:border-orange-300"
                                labelProps={{
                                    className: "hidden",
                                }}
                            />
                        </div> */}
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
                            <input type="file" onChange={handleThumbnailChange} className="form-control" />
                        </div>
                        <div className="form-group">    
                            <label>Images:</label>
                            <input type="file" multiple onChange={handleImageChange} className="form-control" /> 
                        </div>   
                    </form>
                </div>
                <div className="modal-footer border-t border-gray-200">
                    <button className="modal-button px-4" onClick={handleCreateProduct}>
                        Create Product
                    </button>
                    <button className="modal-close px-4" onClick={onClose}>
                        Cancel
                    </button>   
                </div>
            </div>    
        </Modal>
    );
};

export default ProductCreateModal;