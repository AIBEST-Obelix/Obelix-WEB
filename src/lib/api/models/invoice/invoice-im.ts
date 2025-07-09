import { InvoiceProductIM } from "./invoice-product-im";

/**
 * Invoice Input Model.
 */
export class InvoiceIM {
    /**
     * The number of the document.
     */
    public documentNumber: string = "";

    /**
     * Unique Identification Code (UIC) of the receiver company.
     */
    public uicReceiver: string = "";

    /**
     * Unique Identification Code (UIC) of the sender company.
     */
    public uicSender: string = "";

    /**
     * The vat of the receiver company.
     */
    public vatReceiver: string = "";

    /**
     * The vat of the sender company.
     */
    public vatSender: string = "";

    /**
     * The payment method used for the invoice (e.g., bank transfer, cash).
     */
    public paymentMethod: string = "";

    /**
     * Taxable amount of the invoice.
     */
    public taxableAmount: number = 0;

    /**
     * Vat amount of the invoice.
     */
    public vatAmount: number = 0;

    /**
     * Net amount of the invoice after tax.
     */
    public netAmount: number = 0;

    /**
     * The company id.
     */
    public companyId: string = "";

    /**
     * List of products or services included in the invoice.
     */
    public products: InvoiceProductIM[] = [];
}