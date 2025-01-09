import Cookies from "js-cookie";
import { BASE_API_URL, BASE_API_URL_DEV, CSRF_TOKEN_KEY } from "src/constants";

type RequestParams<Payload> = {
  data?: Payload;
  method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
  url: string;
};

export class BaseApi {
  public static baseUrl: string =
    process.env.NODE_ENV !== "production" ? BASE_API_URL_DEV : BASE_API_URL;

  public static getURI(url: string): string {
    return `${this.baseUrl}${url}`;
  }

  private static get csrfToken(): string {
    return Cookies.get(CSRF_TOKEN_KEY) || "";
  }

  static headers = {
    Authorization: `Bearer ${this.csrfToken}`,
  };

  static get<T>(url: string) {
    return this.request<T>({
      method: "GET",
      url,
    });
  }

  static post<R, Payload>(url: string, data?: Payload) {
    return this.request<R, Payload>({
      method: "POST",
      url,
      data,
    });
  }

  static delete(url: string) {
    return this.request({
      method: "DELETE",
      url,
    });
  }

  static put<Payload>(url: string, data: Payload) {
    return this.request({
      method: "PUT",
      url,
      data,
    });
  }

  static patch<Payload>(url: string, data: Payload) {
    return this.request({
      method: "PATCH",
      url,
      data,
    });
  }

  static async request<R, Payload = undefined>({
    method,
    url,
    data,
  }: RequestParams<Payload>): Promise<{
    data: R;
  }> {
    try {
      const body = data ? JSON.stringify(data) : undefined;
      const finalUrl = this.getURI(url);

      const response = await fetch(finalUrl, {
        method: method.toUpperCase(),
        body,
        headers: {
          ...this.headers,
          "Content-Type": "application/json",
        },
      });

      return response.json();
    } catch {
      throw new Error("Something went wrong");
    }
  }
}
