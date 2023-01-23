import { FlashMessagesService } from 'angular2-flash-messages';
import { Component } from '@angular/core';
import { ValidateService } from './../../services/validate.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name!: String;
  username!: String;
  email!: String;
  password!: String;
  data!: object;
  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show("Please Fill in All The Fields !", { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show("Please Use a Valide Email !", { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    if (!this.validateService.validatePasswordLength(user.password)) {
      this.flashMessage.show("Password Too Short ! (At Least 8 Characters)", { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    //this.validateService.validatePasswordStrength(user.password);

    //Register User
    this.authService.registerUser(user).subscribe(data => {
      this.data = data;
      console.log(data);
      if (data.success) {
        this.flashMessage.show("Your Are Now Registered And Can Login !", { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['/login']);
      }
    });

  }

}
