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
    username: string;
    email: string;
    full_name: string;
}

export interface Order {
    id: number;
    item_total: number;
    tax_total: number;
    shipping_total: number;
    order_total: number;
    order_timestamp: string;
    completed: boolean;
    shipped: boolean;
}