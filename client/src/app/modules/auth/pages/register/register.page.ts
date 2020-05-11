import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Register} from '../../../../core/state/auth.actions';
import {Store} from '@ngxs/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  registerForm: FormGroup;
  submitted = false;

  get f() { return this.registerForm.controls; }

  constructor(
    private _fb: FormBuilder,
    private _store: Store
  ) {
    this.registerForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      password: [null, Validators.required],
      repeatedPassword: [null, [Validators.required, this._passwordMatcher.bind(this)]],
    });
  }

  private _passwordMatcher(control: FormControl): { [s: string]: boolean } {
    if (
      this.registerForm &&
      (control.value !== this.registerForm.controls.password.value)
    ) {
      return { passwordNotMatch: true };
    }
    return null;
  }

  onSubmit() {
    this.submitted = true
    if (this.registerForm.dirty && this.registerForm.valid) {
      this._store.dispatch(new Register(this.registerForm.value));
    }
  }
}
