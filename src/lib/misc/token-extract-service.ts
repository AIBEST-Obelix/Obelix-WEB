import {jwtDecode} from "jwt-decode";

class TokenExtractService {
  public extractKeyValueFromToken(accessToken: string, key: string): string | null {
      const decoded = jwtDecode<CustomJwtToken>(accessToken);

      return decoded[key] as string | null;
  }
}

const tokenExtractService = new TokenExtractService();
export default tokenExtractService;