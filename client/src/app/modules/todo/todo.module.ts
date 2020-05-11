import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TodoRoutingModule} from './todo-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {TodosPage} from './pages/todos/todos.page';
import {TodoModalComponent} from './components/todo-modal/todo-modal.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {FroalaEditorModule} from 'angular-froala-wysiwyg';


@NgModule({
  declarations: [TodosPage, TodoModalComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    SharedModule,
    ModalModule.forChild(),
    BsDatepickerModule,
    FroalaEditorModule
  ]
})
export class TodoModule {
}
