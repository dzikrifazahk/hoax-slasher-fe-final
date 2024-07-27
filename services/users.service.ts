import api from "./api";
import { CommonApiResponse } from "./types/common";
import { IAddUserPayload, IResponseCreateData, UserType } from "./types/users";

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

  async createUser(token: string | null, payload: FormData) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    const { data: resBody } = await api.post<IResponseCreateData>(
      "/users/create-user",
      payload,
      { headers }
    );

    return resBody;
  }

  async editUser(token: string | null, id: string, payload: FormData) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    const { data: resBody } = await api.put<UserType>(
      `/users/${id}`,
      payload,
      { headers }
    );
    return resBody;
  }

  async getUserById(token: string | null, id: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const { data: resBody } = await api.get<CommonApiResponse<UserType>>(
      `/users/${id}`,
      { headers }
    );
    return resBody;
  }

  async deleteUser(token: string | null, id: string | undefined) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const { data: resBody } = await api.delete<CommonApiResponse<UserType>>(
      `/users/${id}`,
      { headers }
    );

    return resBody;
  }
}
