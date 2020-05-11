import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodosPage} from './pages/todos/todos.page';


const routes: Routes = [
  {
    path: ':owner',
    component: TodosPage
  },
  {
    path: '**',
    redirectTo: 'all'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule {
}
