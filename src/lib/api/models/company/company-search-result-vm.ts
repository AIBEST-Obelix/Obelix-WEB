export class CompanySearchResultVM {
    /**
     * Company name in Bulgarian.
     */
    bulgarianName: string = '';

    /**
     * Company name in English.
     */
    englishName: string = '';

    /**
     * Unique Identification Code (UIC/EIK) of the company.
     */
    eik: string = '';

    /**
     * Indicates whether the company has VAT registration.
     */
    hasVat: boolean = false;

    /**
     * Indicates whether the company is active.
     */
    active: boolean = false;

    /**
     * The URL to scrape additional details for the company.
     */
    url: string = '';
}