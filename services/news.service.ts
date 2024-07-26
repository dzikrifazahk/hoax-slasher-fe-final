import api from "./api";
import { CommonApiResponse } from "./types/common";
import { NewsType } from "./types/news";

export class NewsServices {
  async getNews() {
    const {data:resBody} = await api.get<CommonApiResponse<NewsType[]>>("/news/getAll");
    return resBody;
  }
  
}
