import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Tools
import * as jwt_decode from 'jwt-decode';

const poolData = {
    UserPoolId: 'us-east-1_nVg0EhICY',
    ClientId: '5717qsomki27700l43stqhr3ou',
};

@Injectable()
export class AccountService {
    userPool: any;
    user: any;
    constructor(http: HttpClient) {
        this.userPool = new CognitoUserPool(poolData);
        this.user = null;
    }

    getSession() {
        return new Promise((resolve, reject) => {
            console.log('AccountService.getSession');

            this.userPool.getCurrentUser().getSession((err, session) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log('getSession: ' + session.idToken.jwtToken);
                resolve(session);
            });
        });
    }

    login(username, password) {
        return new Promise((resolve, reject) => {
            console.log('AccountService.login');

            const authenticationData = {
                Username : username,
                Password : password,
            };
            const authenticationDetails  = new AuthenticationDetails(authenticationData);
            const userData = {
                Username: username,
                Pool: this.userPool
            };
            const cognitoUser = new CognitoUser(userData);

            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (res) => {
                    console.log(res.getIdToken().getJwtToken());
                    this.user = cognitoUser;
                    resolve(res);
                },
                onFailure: (err) => {
                    // if (err.code === AWS_USER_NOT_FOUND) {
                    //   reject({[F_USERNAME]: ERR_USER_NOT_FOUND});
                    // } else if (err.code === AWS_USER_NOT_CONFIRMED) {
                    //   reject({[F_PIN]: ERR_USER_NOT_CONFIRMED});
                    // } else if (err.code === AWS_NOT_AUTHORIZED_EXCEPTION) {
                    //   reject({[F_PASSWORD]: ERR_NOT_AUTHORIZED});
                    // } else {
                    //   alert(err.code + ": " + err.message);
                    console.log(err);
                    reject(err);
                }
            });
        });
    }

    signUp(username, password, name) {
        console.log('AccountService.signUp');

        return new Promise((resolve, reject) => {
            const userPool = new CognitoUserPool(poolData);
            const attributeList = [];
            const attributeEmail = new CognitoUserAttribute({
                Name : 'username',
                Value : username
            });
            attributeList.push(attributeEmail);
            const attributeName = new CognitoUserAttribute({
                Name : 'name',
                Value : name
            });
            attributeList.push(attributeName);
            userPool.signUp(username, password, attributeList, null, (err, res) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                this.user = res.user;
                console.log('user name is ' + this.user.getUsername());
                resolve(res);
            });
        });
    }

    signOut() {
        return new Promise((resolve, reject) => {
            console.log('AccountService.signOut');

            const cognitoUser = this.userPool.getCurrentUser();

            // this.session.confirmed = false;
            // this.session.registered = false;
            this.user = null;

            if (cognitoUser != null) {
                cognitoUser.signOut();
            }
            // Reset other services
            resolve();
        });
    }

    getUserName() {
        return new Promise((resolve, reject) => {
            this.userPool.getCurrentUser().getSession((err, session) => {
                if (err) {
                    reject(err);
                    return;
                }
                // console.log('getSession: ' + JSON.stringify(session));

                let decoded = jwt_decode(session.idToken.jwtToken);
                // console.log('Decoded: ' + decoded);
                resolve(decoded.name);
            });
        });
    }

    getIdToken() {
        return new Promise((resolve, reject) => {
            console.log('AccountService.getIdToken');

            this.userPool.getCurrentUser().getSession((err, session) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log('IdToken: ' + session.idToken.jwtToken);
                resolve(session.idToken.jwtToken);
            });
        });
    }

    resendComfirmaion(username) {
        console.log('AccountService.resendComfirmaion');

        const userData = {
            Username : username,
            Pool : this.userPool
        };
        const cognitoUser = new CognitoUser(userData);

        cognitoUser.resendConfirmationCode(function(err, result) {
            if (err) {
                console.log(err);
                alert(err);
                return;
            }
            console.log('call result: ' + result);
        });
    }

}
