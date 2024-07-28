import api from "./api";
import { CommonApiResponse } from "./types/common";
import { CommunityTypes } from "./types/community";

export class CommunityServices {
  async getCommunities(token: string | null) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const { data: response } = await api.get<
      CommonApiResponse<CommunityTypes[]>
    >("community", { headers });
    return response;
  }

  async createOrUpdate(token: string | null, payload: FormData) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    const { data: response } = await api.post<CommonApiResponse<CommunityTypes[]>>(
      "community/createOrUpdate",
      payload,
      { headers }
    );
    return response;
  }

  async getDataById(token: string | null, id: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const { data: resBody } = await api.get<CommonApiResponse<CommunityTypes>>(
      `/community/${id}`,
      { headers }
    );
    return resBody;
  }

  async deleteData(token: string | null, id: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const { data: resBody } = await api.delete<CommonApiResponse<CommunityTypes>>(
      `/community/${id}`,
      { headers }
    );
    return resBody;
  }
}
