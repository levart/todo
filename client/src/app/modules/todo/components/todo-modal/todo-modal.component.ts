import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngxs/store';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import {TodoService} from '../../../../core/services/todo/todo.service';
import {Observable} from 'rxjs';
import {IUser} from '../../../../core/interfaces/user.model';
import {ITodo} from '../../../../core/interfaces/todo';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.scss']
})
export class TodoModalComponent implements OnInit {

  title: string;
  closeBtnName: string;
  isEdit = false;
  todo: ITodo;
  todoForm: FormGroup;
  submitted = false;
  minDate: Date;

  users$: Observable<IUser[]>;

  get f() {
    return this.todoForm.controls;
  }

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private _fb: FormBuilder,
    private _store: Store,
    private localeService: BsLocaleService,
    private todoService: TodoService
  ) {
    this.todoForm = this._fb.group({
      name: [null, Validators.required],
      assignUserId: [null, Validators.required],
      description: [null, Validators.required],
      dueDate: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.localeService.use('ka');
    this.minDate = new Date();
    if (this.isEdit) {
      this.todoForm.patchValue({
        name: this.todo.name,
        description: this.todo.description,
        assignUserId: this.todo.assigned.id,
        dueDate: new Date(this.todo.dueDate)
      });
    }
    this.getUsers();
  }

  getUsers() {
    this.users$ = this.todoService.getUsers();
  }


  onSubmit() {
    this.submitted = true;
    if (this.todoForm.dirty && this.todoForm.valid) {
      if (this.isEdit) {
        this.todoService.updateTodo(this.todo.id, this.todoForm.value)
          .pipe(untilDestroyed(this))
          .subscribe(res => {
            if (res) {
              this.modalService.setDismissReason(JSON.stringify(res));
              this.bsModalRef.hide();
            }
          });
      } else {
        this.todoService.createTodo(this.todoForm.value)
          .pipe(untilDestroyed(this))
          .subscribe(res => {
            if (res) {
              this.modalService.setDismissReason(JSON.stringify(res));
              this.bsModalRef.hide();
            }
          });
      }
    }
  }


}
