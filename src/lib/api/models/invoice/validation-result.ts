/**
 * Validation result model.
 */
export class ValidationResult {
    /**
     * Is Invoice Valid.
     */
    public isInvoiceSane: boolean = true;

    /**
     * Invalid Fields.
     */
    public failedFields: string[] = [];
}