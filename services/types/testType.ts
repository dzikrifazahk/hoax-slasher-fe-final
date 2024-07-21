export interface DataItem {
  id: string;
  name: string;
  data: Data | null;
}

export interface Data {
  color: string;
  capacity: string;
}
