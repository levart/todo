import {IUser} from './user.model';

export interface ITodo {
  id: string;
  name: string;
  description: string;
  status: 'TODO' | 'DONE';
  createdAt: Date;
  createdBy: IUser;
  assigned: IUser;
  dueDate: Date;
}


export interface ITodoRequest {
  createdByMe?: boolean;
  myTodo?: boolean;
  status?: 'TODO' | 'DONE';
}


export interface ITodoCreate {
  assignUserId?: string;
  name?: string;
  description?: string;
  dueDate?: Date;
  status?: 'TODO' | 'DONE';
}
