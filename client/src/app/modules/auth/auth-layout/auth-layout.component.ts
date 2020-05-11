import {Component, OnInit} from '@angular/core';
import {Actions, ofActionDispatched, Store} from '@ngxs/store';
import {Logout} from '../../../core/state/auth.actions';
import {Router} from '@angular/router';
import {AuthState} from '../../../core/state/auth.state';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  constructor(
    private actions: Actions,
    private store: Store,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.store.selectOnce(AuthState.isAuthenticated)
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        if (res) {
          this.router.navigate(['/todo/all']);
        }
      });
  }

}
