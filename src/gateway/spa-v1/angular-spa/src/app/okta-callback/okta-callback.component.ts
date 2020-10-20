import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './okta-callback.component.html'
})
export class OktaCallbackComponent implements OnInit {

    public username = '';

    constructor(private okta: OktaAuthService, private http: HttpClient) { }

    async ngOnInit(): Promise<void> {

        await this.okta.handleAuthentication();

        
        const idtoken = await this.okta.getIdToken();
        // const accesstoken = await this.okta.getAccessToken();

        const decoded_idtoken = JSON.parse(atob(await idtoken.split('.')[1]));
        // this.decoded_accesstoken = JSON.parse(atob(await this.accesstoken.split('.')[1]));

        this.username = decoded_idtoken.name;
    }

}
