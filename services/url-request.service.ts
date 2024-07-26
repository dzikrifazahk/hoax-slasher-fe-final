import api from "./api";
import { CommonApiResponse } from "./types/common";
import { IUrlRequest } from "./types/url-requests";

export class UrlRequestServices {
  async getDatas(token: string | null) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const { data: resBody } = await api.get<CommonApiResponse<IUrlRequest[]>>(
      "/url-req/getAll",
      { headers }
    );
    return resBody;
  }
}
