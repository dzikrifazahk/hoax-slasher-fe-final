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
}
   