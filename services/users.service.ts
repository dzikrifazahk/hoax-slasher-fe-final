import api from "./api";
import { CommonApiResponse } from "./types/common";
import { UserType } from "./types/users";

export class UsersServices {
  async getUsers(token: string | null) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const { data: resBody } = await api.get<CommonApiResponse<UserType[]>>(
      "/users",
      { headers }
    );
    return resBody;
  }
}
