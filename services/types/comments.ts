import { CommonColumn } from "./common";
import { IEvent } from "./event";
import { UserType } from "./users";

export interface IComment extends CommonColumn {
  id: string;
  message: string;
  educationEvent: IEvent;
  user: UserType;
}
