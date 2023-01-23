import { Injectable } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor(private flashMessage: FlashMessagesService) { }

  validateRegister(user: any) {
    if ((user.name == "") || (user.name == undefined)) {
      return false;
    } else
      if ((user.email == "") || (user.email == undefined)) {
        return false;
      } else
        if ((user.username == "") || (user.username == undefined)) {
          return false;
        } else
          if ((user.password == "") || (user.password == undefined)) {
            return false;
          }
          else {
            return true;
          }
  }
  validateEmail(email: String) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }
  validatePasswordLength(password: String) {
    if ((password.length < 8)) {
      return false;
    }
    else {
      return true;
    }
  }
  validatePasswordStrength(password: String) {
    // Initialize variables
    var strength = 0;
    var tips = "";

    // Check password length
    if (password.length < 8) {
      tips += "Make the password longer. ";
    } else {
      strength += 1;
    }

    // Check for mixed case
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
      strength += 1;
    } else {
      tips += "Use both lowercase and uppercase letters. ";
    }

    // Check for numbers
    if (password.match(/\d/)) {
      strength += 1;
    } else {
      tips += "Include at least one number. ";
    }

    // Check for special characters
    if (password.match(/[^a-zA-Z\d]/)) {
      strength += 1;
    } else {
      tips += "Include at least one special character. ";
    }
    /*
        // Return results
        if (strength < 2) {
          this.flashMessage.show("Warning your password is easy to guess. " + tips, { cssClass: 'alert-danger', timeout: 5000 });
        } else if (strength === 2) {
          this.flashMessage.show("Medium difficulty password. " + tips, { cssClass: 'alert-warning', timeout: 5000 });
        } else if (strength === 3) {
          this.flashMessage.show("Difficult password. " + tips, { cssClass: 'alert-info', timeout: 5000 });
        } else {
          this.flashMessage.show("Extremely difficult. " + tips, { cssClass: 'alert-success', timeout: 5000 });
        }*/
  }
}
