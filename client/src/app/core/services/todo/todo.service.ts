import { Injectable } from '@angular/core';
import {HttpWrapper} from '../http-wrapper/http-wrapper';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITodo, ITodoCreate, ITodoRequest} from '../../interfaces/todo';
import {IUser} from '../../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService extends HttpWrapper {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getTodos(params: ITodoRequest): Observable<ITodo[]> {
    return super.post('todo/all', params);
  }

  createTodo(params: ITodoCreate): Observable<ITodo> {
    return super.post('todo', params);
  }

  updateTodo(id: string, params: ITodoCreate): Observable<ITodo> {
    return super.put(`todo/${id}`, params);
  }


  getUsers(): Observable<IUser[]> {
    return super.get('user');
  }
}
