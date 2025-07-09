/**
 * Invoice Product View Model.
 */
export class InvoiceProductVM {
    /**
     * The product identification number (PIN) or code.
     */
    public productId: string = "";

    /**
     * The product name.
     */
    public productName: string = "";

    /**
     * The quantity of the product being invoiced.
     */
    public quantity: number = 0;

    /**
     * The price per product.
     */
    public pricePerProduct: number = 0;

    /**
     * The account identification number (PIN) or code.
     */
    public accountId: string = "";

    /**
     * The group name.
     */
    public group: string = "";

    /**
     * The subgroup name.
     */
    public subgroup: string = "";

    /**
     * The bill number of the account.
     */
    public billNumber: number = 0;
}