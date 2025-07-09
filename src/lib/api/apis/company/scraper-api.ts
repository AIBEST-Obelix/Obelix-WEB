import {AxiosResponse} from "axios";
import {CompanyVM} from "@/lib/api/models/company/company-vm";
import apiHttpClient from "@/lib/api/http";
import {CompanySearchResultVM} from "@/lib/api/models/company/company-search-result-vm";
import { WebApi } from "../web-api";

class ScraperApi extends WebApi {
    public async ScrapeCompanyByUrlAsync(url: string): Promise<AxiosResponse<CompanyVM>> {
        return await apiHttpClient.get(`/api/companies/scraper/url/${url}`, await this.generateHeader());
    }
    
    public async GetCompaniesByQueryAsync(query: string): Promise<AxiosResponse<Array<CompanySearchResultVM>>> {
        return await apiHttpClient.get<Array<CompanySearchResultVM>>(`/api/companies/scraper/query/${query}`, await this.generateHeader());
    }
}

const scraperApi = new ScraperApi();
export default scraperApi;