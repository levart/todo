import {Component, OnInit, TemplateRef} from '@angular/core';
import {TodoModalComponent} from '../../components/todo-modal/todo-modal.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {TodoService} from '../../../../core/services/todo/todo.service';
import {Observable} from 'rxjs';
import {ITodo, ITodoRequest} from '../../../../core/interfaces/todo';
import {ActivatedRoute} from '@angular/router';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss']
})
export class TodosPage implements OnInit {

  bsModalRef: BsModalRef;
  todos$: Observable<ITodo[]>;
  createdByMe = false;
  myTodo = true;
  deleteTodo;
  todoStatus: 'TODO' | 'DONE' | 'ALL' = 'ALL';

  constructor(
    private modalService: BsModalService,
    private todoService: TodoService,
    private router: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.router.params
      .pipe(untilDestroyed(this))
      .subscribe(params => {
        const owner = params.owner;
        if (owner === 'byme') {
          this.createdByMe = true;
        } else {
          this.createdByMe = false;
        }
        if (owner === 'my') {
          this.myTodo = true;
        } else {
          this.myTodo = false;
        }
        this.getTodos();
      });

  }

  getTodos() {
    const params: ITodoRequest = {
      createdByMe: this.createdByMe,
      myTodo: this.myTodo
    };
    if(this.todoStatus !== 'ALL') {
      params.status = this.todoStatus;
    }
    this.todos$ = this.todoService.getTodos(params);
  }


  openTodoModal(isEdit = false, todo = {}) {
    const initialState = {
      title: 'დავალების დამატება',
      isEdit,
      todo
    };
    this.bsModalRef = this.modalService.show(TodoModalComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'გაუქმება';
    this.modalService.onHide
      .pipe(untilDestroyed(this))
      .subscribe((reason: string) => {
        this.getTodos();
      });
  }

  openModal(template: TemplateRef<any>, todo: ITodo) {
    this.deleteTodo = todo;
    this.bsModalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    console.log(this.deleteTodo);
    this.todoService.updateTodo(this.deleteTodo.id, {status: 'DONE'})
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        if (res) {
          this.getTodos();
          this.bsModalRef.hide();
        }
      });

  }

  decline(): void {
    this.deleteTodo = null;
    this.bsModalRef.hide();
  }

  getByStatus(todos: ITodo[], status: string) {
    return todos.filter(f => f.status === status).length;
  }

  changeStatus(status: 'TODO' | 'DONE' | 'ALL') {
    this.todoStatus = status;
    this.getTodos();
  }
}
