import { CommonColumn } from "./common";

export interface CommunityTypes extends CommonColumn {
  id: string;
  name: string;
  description: string;
  status: string;
  address: string;
  leader: {
    id: null;
    name: null;
  };
  file_name: null;
  file_path: null;
}

export interface IAddCommunity {
  id: string;
  name: string;
  description: string;
  address: string;
  leader: string;
  file: File;
}
