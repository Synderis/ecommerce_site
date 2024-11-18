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