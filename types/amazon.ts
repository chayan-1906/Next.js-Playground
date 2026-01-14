export interface Product {
    _id: string;
    data: {
        asin: string;
        image: string;
        title: string;
        price: string;
        category: string;
    };
}
