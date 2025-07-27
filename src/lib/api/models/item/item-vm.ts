export class ItemVm {
    /**
     * The id of the item.
     */
    id: string = '';

    /**
     * The name of the item.
     */
    name: string = '';

    /**
     * The type of the item.
     */
    type: string = '';

    /**
     * The serial number of the item.
     */
    serialNumber: string = '';

    /**
     * The creation date of the item.
     */
    createdAt?: Date;

    /**
     * The last updated date of the item.
     */
    updatedAt?: Date;
}
