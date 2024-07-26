import { CommonColumn } from "./common";

export interface IUrlRequest extends CommonColumn {
  id: string;
  url: string;
  status: boolean;
  is_scrapping: boolean;
  user_id: string;
}
