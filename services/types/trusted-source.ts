import { CommonColumn } from "./common";

export interface ITrustedSource extends CommonColumn {
  id: string;
  company_name: string;
  company_description: string;
  company_email: string;
}

export interface IAddPayload {
  id: string;
  company_name: string;
  company_description: string;
  company_email: string;
}