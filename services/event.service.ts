import api from "./api";
import { CommonApiResponse } from "./types/common";
import { IEvent } from "./types/event";

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
}
