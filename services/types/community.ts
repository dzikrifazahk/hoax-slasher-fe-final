import { CommonColumn } from "./common";

export interface CommunityTypes extends CommonColumn {
  id: string;
  name: string;
  description: string;
  status: "ACTIVE";
  address: string;
  leader: {
    id: null;
    name: null;
  };
  file_name: null;
  file_path: null;
}
