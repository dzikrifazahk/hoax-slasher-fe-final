import { NewsType } from "./news";
import { UserType } from "./users";

export interface debunkingType {
  reason: string;
  evidence_links: string;
  file_path: string;
  file_name: string;
  news: NewsType;
  user_id: UserType;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}