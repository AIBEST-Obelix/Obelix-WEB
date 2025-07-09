/**
 * Product Account Input Model.
 */
export class ProductAccountIM {
    /**
     * The acount identification number (PIN) or code.
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
     * The bill number.
     */
    public billNumber: number = 0;
}