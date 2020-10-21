import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Component({
    templateUrl: './okta-callback.component.html'
})
export class OktaCallbackComponent implements OnInit {

    public username = '';

    constructor(private okta: OktaAuthService, private http: HttpClient, public router: Router) { }

    async ngOnInit(): Promise<void> {

        await this.okta.handleAuthentication();

        
        const idtoken = await this.okta.getIdToken();
        const accesstoken = await this.okta.getAccessToken();

        const decoded_idtoken = JSON.parse(atob(await idtoken.split('.')[1]));
        // this.decoded_accesstoken = JSON.parse(atob(await this.accesstoken.split('.')[1]));

        this.username = decoded_idtoken.name;

        if (environment.oidc.verifyUrl) {
          const headers = { 'Authorization': 'Bearer ' + accesstoken };
          this.http.get<any>(environment.oidc.verifyUrl, { headers })
            .subscribe((response) => {
                console.log('Access token valid"')
              },
              async (error) => {
                console.error('Access token invalid"');
                await this.okta.logout();
                this.router.navigateByUrl('/');
              });
        }
    }

}
