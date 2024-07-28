import api from "./api";
import { CommonApiResponse } from "./types/common";
import { IAddEvent, IEvent } from "./types/event";

export class EventServices {
  async getEvents(token: string | null) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const { data: resBody } = await api.get<CommonApiResponse<IEvent[]>>(
      "/education-events/getAll",
      { headers }
    );
    return resBody;
  }

  async createOrUpdate(token: string | null, payload: FormData) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const { data: response } = await api.post<CommonApiResponse<IEvent[]>>(
      "education-events/createOrUpdate",
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

    const { data: resBody } = await api.get<CommonApiResponse<IEvent>>(
      `/education-events/${id}`,
      { headers }
    );
    return resBody;
  }

  async deleteData(token: string | null, id: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const { data: resBody } = await api.delete<CommonApiResponse<IEvent>>(
      `/education-events/${id}`,
      { headers }
    );
    return resBody;
  }
}
