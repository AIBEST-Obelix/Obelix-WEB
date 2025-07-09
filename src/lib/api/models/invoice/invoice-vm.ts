import { InvoiceFileVM } from "./invoice-file-vm";
import { InvoiceProductVM } from "./invoice-product-vm";

/**
 * Invoice Input Model.
 */
export class InvoiceVM {
    /**
     * The unique identifier for the invoice.
     */
    public id: string = "";

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
     * The date when the invoice was issued.
     */
    public invoiceDate?: Date;

    /**
     * The date when the vat event.
     */
    public dateOfVatEvent?: Date;

    /**
     * Check whether the invoice is approved or not.
     */
    public isApproved?: boolean;
    
    /**
     * Indicates whether the invoice has been analyzed.
     */
    public isAnalyzed?: boolean;

    /**
     * List of products or services included in the invoice.
     */
    public products: InvoiceProductVM[] = [];

    /**
     * List of invoice files associated with the invoice.
     */
    public files: InvoiceFileVM[] = [];
}