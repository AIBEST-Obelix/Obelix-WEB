import clientHttpClient from "@/lib/services/client-http";
import { CompanyVM } from "@/lib/api/models/company/company-vm";
import { CompanySearchResultVM } from "@/lib/api/models/company/company-search-result-vm";

export class ScraperService {
  /** 
   * Scrapes a single company by its URL. 
   * @returns the full CompanyVM 
   */
  async ScrapeCompanyByUrlAsync(url: string): Promise<CompanyVM> {
    const normalized = url.startsWith("/") ? url : `/${url}`;
    const res = await clientHttpClient.get<CompanyVM>(
      `/api/company/scraper/scrape/url?url=${normalized}`
    );
    if (res.status !== 200) {
      throw new Error((res.data as any)?.error || `Unexpected status ${res.status}`);
    }
    return res.data;
  }

  /**
   * Searches for companies by a free-text query.
   * @returns a list of CompanySearchResultVM
   */
  async GetCompaniesByQueryAsync(query: string): Promise<CompanySearchResultVM[]> {
    const res = await clientHttpClient.get<CompanySearchResultVM[]>(
      `/api/company/scraper/query/${encodeURIComponent(query)}`
    );
    if (res.status !== 200) {
      throw new Error((res.data as any)?.error || `Unexpected status ${res.status}`);
    }
    return res.data;
  }
}

const scraperService = new ScraperService();
export default scraperService;
