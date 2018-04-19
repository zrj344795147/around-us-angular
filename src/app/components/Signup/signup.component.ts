import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
// import * as validator from 'validator';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: [
        '../../../assets/css/style.css',
        '../../../assets/css/bootstrap.css'
    ],
})

export class SignupComponent implements OnInit {
    username: String;
    password: String;
    passwordConfirm: String;
    nickname: String;
    info: String;
    constructor(
        private accountService: AccountService,
        private router: Router,
    ) {
        this.username = '';
        this.password = '';
        this.passwordConfirm = '';
        this.nickname = '';
        this.info = '';

    }

    ngOnInit() {
        this.accountService.getSession()
            .then(res => {
                console.log('Already logged in');
                console.log(res);
                this.router.navigateByUrl('home');
            })
            .catch(err => {
                console.log('Not logged in');
            });
    }

    goToLogin() {
        this.router.navigateByUrl('/login');
    }

    clickSignup() {
        this.info = '';
        console.log('Ready to signup');

        // Check empty
        if (this.username === '' || this.password === '' || this.passwordConfirm === '' || this.nickname === '' ) {
            this.info = 'Entry cannot be empty!';
            return;
        }
        // Check username
        // if (validator.(this.username)) {
        //     this.info = 'Username must be valid email address';
        //     return;
        // }
        // Check password
        if (this.password.length < 6) {
            this.info = 'Password too short!';
            return;
        }
        if (this.password !== this.passwordConfirm) {
            this.info = 'Password and passwordConfirm are different!';
            return;
        }

        this.accountService.signUp(this.username, this.password, this.nickname)
            .then(res => {
                console.log('Signup Successfully. Please Verificate ');
                this.router.navigateByUrl('login');
                alert('Confirmation email is sent. Please confirm');
            })
            .catch(err => {
                this.info = err.message;
                console.log(err);
            });
    }

}
