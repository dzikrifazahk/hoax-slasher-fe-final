import { CommonColumn } from "./common";
import { debunkingType } from "./debunking";

export interface NewsType extends CommonColumn {
  id: string;
  title: string;
  description: string;
  author: string;
  source: string;
  publish_date: Date;
  news_keywords: string;
  ambigous_keywords: string;
  is_training: boolean;
  training_date: Date;
  label: string;
  location: string;
  validated_date: Date;
  url: string;
  url_request_id: string;
  is_debunking: boolean;
  views_total: number;
  file_name: string;
  file_path: string;
  news_category_id: string;
  response: string;
  newsCategory: string;
  debunking: debunkingType[];
}

