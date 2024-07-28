import api from "./api";
import { CommonApiResponse } from "./types/common";
import { NewsType } from "./types/news";

export class NewsServices {
  async getNews(isValidated?: string) {
    let url = "/news/getAll";
    if (isValidated) url = "/news/getAll?isValidated=isValidated";

    const { data: resBody } = await api.get<CommonApiResponse<NewsType[]>>(url);
    return resBody;
  }
}
