import api from "./api";
import { CommonApiResponse } from "./types/common";
import { IAddPayload, ITrustedSource } from "./types/trusted-source";

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

  async createOrUpdate(payload: IAddPayload) {
    const headers = {
      "Content-Type": "application/json",
    };

    const { data: response } = await api.post<
      CommonApiResponse<ITrustedSource[]>
    >("trusted-source/createOrUpdate", payload, { headers });
    return response;
  }

  async getDataById(id: string) {
    const headers = {
      "Content-Type": "application/json",
    };

    const { data: resBody } = await api.get<CommonApiResponse<ITrustedSource>>(
      `/trusted-source/${id}`,
      { headers }
    );
    return resBody;
  }

  async deleteData(id: string) {
    const headers = {
      "Content-Type": "application/json",
    };
    const { data: resBody } = await api.delete<
      CommonApiResponse<ITrustedSource>
    >(`/trusted-source/${id}`, { headers });
    return resBody;
  }
}
