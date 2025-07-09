import {PersonVM} from "@/lib/api/models/person/person-vm";

/**
 * Company Input Model.
 */
export class CompanyIM {
    /**
     * Current status of the company (e.g., active, inactive).
     */
    public status: string = "";

    /**
     * Unique Identification Code (UIC) of the company, analogous to Bulgarian EIK. This is required.
     */
    public uic: string = "";

    /**
     * Official name of the company in Bulgarian.
     */
    public name: string = "";

    /**
     * Transliterated (English) version of the company name.
     */
    public transliteration: string = "";

    /**
     * Legal form of the company (e.g., LLC, JSC).
     */
    public legalForm: string = "";

    /**
     * Headquarters address of the company.
     */
    public headquarters: string = "";

    /**
     * VAT registration status or number of the company, if available.
     */
    public vatRegistration: string = "";

    /**
     * Date when the company was officially registered.
     */
    public registrationDate?: Date;

    /**
     * Scope of activity or business purpose of the company.
     */
    public scopeOfActivity: string = "";

    /**
     * Amount of the company's registered capital.
     */
    public capital: string = "";

    /**
     * List of persons (e.g., managers, owners, representatives) associated with the company.
     */
    public persons: PersonVM[] = [];
}