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

export interface Order {
    id: number;
    user_id: number;
    cart_id: number;
    item_total: number;
    tax_total: number;
    shipping_total: number;
    order_total: number;
    order_timestamp: string;
    completed: boolean;
    shipped: boolean;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    thumbnail: string;
    images: string[];
    is_published: boolean;
    created_at: string;
    category_id: number;
}