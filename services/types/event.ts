import { CommonColumn } from "./common";

export interface IEvent extends CommonColumn {
  id: string;
  title: string;
  description: string;
  event_date: Date;
  is_online: boolean;
  links: string;
  reminder_date: Date;
  file_path: string;
  file_name: string;
  comments: [];
}
