import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [
        '../../../assets/css/style.css',
        '../../../assets/css/bootstrap.css'
    ]
})

export class LoginComponent implements OnInit {
    username: String = '';
    password: String = '';
    info: String = '';
    constructor(
        private accountService: AccountService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.accountService.getSession()
            .then(res => {
                console.log('Already logged in');
                this.router.navigateByUrl('home');
            })
            .catch(err => {
                console.log('Not logged in');
            });

    }

    goToSignup() {
        this.router.navigateByUrl('signup');
    }

    goToHome() {
        this.router.navigateByUrl('home');
    }

    clickLogin() {
        this.info = '';
        if (this.username === '' || this.password === '') {
            this.info = 'Username or password cannot be empty!';
            return;
        }
        console.log('username: ' + this.username);
        console.log('password: ' + this.password);
        console.log('Ready to Login');
        this.accountService.login(this.username, this.password)
            .then(res => {
                console.log('Login Successfully');
                this.router.navigateByUrl('home');
            })
            .catch(err => {
                if (err.message === 'User is not confirmed.') {
                    this.accountService.resendComfirmaion(this.username)
                    this.info = 'User is not confirmed. A new confirm username sent.';
                    return;
                }
                console.log(err);
                this.info = err.message;
            });
    }

}
