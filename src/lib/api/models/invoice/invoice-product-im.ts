import { ProductAccountIM } from "./product-account-im";

/**
 * Invoice Product Input Model.
 */
export class InvoiceProductIM {
    /**
     * The product identification number (PIN) or code.
     */
    public productId: string = "";

    /**
     * The product name.
     */
    public productName: string = "";

    /**
     * The price per product.
     */
    public pricePerProduct: number = 0;

    /**
     * The quantity of the product being invoiced.
     */
    public quantity: number = 0;

    /**
     * The account of the product.
     */
    public productAccountIM: ProductAccountIM = new ProductAccountIM();
}