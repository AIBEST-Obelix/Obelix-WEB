export class RequestIm {
    /**
     * The ID of the user making the request.
     */
    userId: string = '';

    /**
     * The ID of the item being requested.
     */
    itemId: string = '';

    /**
     * The description of the request.
     */
    description: string = '';

    /**
     * The status of the request.
     */
    status: RequestStatus = RequestStatus.Pending;
}

export enum RequestStatus {
    Pending = 0,
    Approved = 1,
    Rejected = 2,
    Returned = 3
} 