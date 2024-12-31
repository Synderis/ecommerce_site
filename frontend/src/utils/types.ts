export interface Cart {
    id: number;
    total_amount: number;
    cart_items: {
        id: number;
        quantity: number;
        subtotal: number;
        product: {
            id: number;
            title: string;
            description: string;
            price: number;
            thumbnail: string;
        };
    }[];
}

export interface UserData {
    id: number;
    username: string;
    email: string;
    full_name: string;
    is_active: boolean;
    created_at: string;
    role: string;
    logged_in: boolean;
}

export interface UserContextType {
    Fields: {
        user: UserData | null
        loading: boolean
        fetchUser: () => void
    }
}

export interface Order {
    id: number;
    user_id: number;
    item_total: number;
    tax_total: number;
    shipping_total: number;
    order_total: number;
    completed_at: string;
    created_at: string;
    shipped_at: string;
    order_items: {
        id: number;
        quantity: number;
        subtotal: number;
        product: {
            id: number;
            title: string;
            description: string;
            price: number;
            thumbnail: string;
        };
    }[];
}

export interface Product {
    id: number;
    title: string;
    description: string;
    brand: string;
    price: number;
    stock: number;
    thumbnail: string;
    images: string[];
    is_published: boolean;
    created_at: string;
    category_id: number;
}

export interface ProductCreate {
    id: number;
    title: string;
    description: string;
    brand: string;
    price: number;
    stock: number;
    thumbnail: string;
    images: string[];
    is_published: boolean;
    category_id: number;
}

export interface AddressDetails {
    id: number;
    user_id: number;
    order_id: number;
    full_name: string;
    street_address: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    address_type: string;
}