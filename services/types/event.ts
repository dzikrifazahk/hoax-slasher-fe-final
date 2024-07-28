import { CommonColumn } from "./common";

export interface IEvent extends CommonColumn {
  id: string;
  title: string;
  description: string;
  event_date: string;
  is_online: boolean;
  links: string;
  reminder_date: string;
  file_path: string;
  file_name: string;
  comments: [];
}

export interface IAddEvent {
  id?: string;
  title: string;
  description: string;
  eventDate: Date;
  isOnline: boolean;
  links: string;
  reminderDate: Date;
}
