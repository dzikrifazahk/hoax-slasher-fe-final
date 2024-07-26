export interface UserType {
  id: string;
  name: string;
  email: string;
  password: string;
  needChangePassword: boolean;
  role: string;
  token: string;
  status: string;
  file_path: string;
  file_name: string;
  created_at: Date;
  updated_at: Date;
}
