import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Login} from '../../../../core/state/auth.actions';
import {Store} from '@ngxs/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  loginForm: FormGroup;
  submitted = false;

  get f() { return this.loginForm.controls; }

  constructor(
    private _fb: FormBuilder,
    private _store: Store
  ) {
    this.loginForm = this._fb.group({
      email: [null,[Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true
    if (this.loginForm.dirty && this.loginForm.valid) {
      const email: string = this.loginForm.value.email;
      const password: string = this.loginForm.value.password;

      email.trim();
      password.trim();

      const payload = {
        email,
        password
      };
      this._store.dispatch(new Login(payload));
    }
  }
}
