import api from "./api";
import { CommonApiResponse } from "./types/common";
import { ITrustedSource } from "./types/trusted-source";

export class TrustedSourceServices {
  async getDatas(token: string | null) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const { data: response } = await api.get<
      CommonApiResponse<ITrustedSource[]>
    >("trusted-source", { headers });
    return response;
  }
}
