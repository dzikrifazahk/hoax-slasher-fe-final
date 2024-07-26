import api from "./api";
import { CommonApiResponse } from "./types/common";
import { debunkingType } from "./types/debunking";

export class DebunkingServices {
  async getDebunkings(token: string | null) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const { data: resBody } = await api.get<CommonApiResponse<debunkingType[]>>(
      "debunking",
      {
        headers,
      }
    );

    return resBody;
  }
}
