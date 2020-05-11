import {Component, OnInit} from '@angular/core';
import {Logout} from '../../../../../core/state/auth.actions';
import {Actions, ofActionDispatched, Select, Store} from '@ngxs/store';
import {Router} from '@angular/router';
import {IUser} from '../../../../../core/interfaces/user.model';
import {Observable} from 'rxjs';
import {AuthState} from '../../../../../core/state/auth.state';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Select(AuthState.isAuthenticated) isAuthenticated$: Observable<boolean>;
  @Select(AuthState.getProfile) profile$: Observable<IUser>;

  constructor(
    private actions: Actions,
    private router: Router,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.actions.pipe(ofActionDispatched(Logout))
      .pipe(untilDestroyed(this))
      .subscribe(() => {
      this.router.navigate(['/auth']);
    });
  }

  logout() {
    this.store.dispatch(new Logout());
  }



}
