import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from "@okta/okta-angular";
import { ProtectedService } from './protected.service';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-protected',
    templateUrl: './protected.component.html',
    styleUrls: ['./protected.component.css']
})

export class ProtectedComponent implements OnInit {

    public decoded_idtoken: any;
    public decoded_accesstoken: any;
    public idtoken: String;
    public accesstoken: String;
    public response = false;
    public responseData: any;
    public displayURL: any;

    // private decoded_idtoken;

    constructor(private okta: OktaAuthService, private protectedService: ProtectedService) { }

    async ngOnInit(): Promise<void> {

        this.idtoken = await this.okta.getIdToken();
        this.accesstoken = await this.okta.getAccessToken();

        this.decoded_idtoken = JSON.parse(atob(await this.idtoken.split('.')[1]));
        this.decoded_accesstoken = JSON.parse(atob(await this.accesstoken.split('.')[1]));
        this.displayURL = environment.baseURL;
    }

    send(idToken, accessToken){

        var username = this.decoded_idtoken.name;
        this.response = true;
        const body = {
                username: username
            };
        var header = {
            headers: {'Authorization' : 'Bearer ' + accessToken}
        };

        this.protectedService.callAPI(body,
           header).subscribe(
                res => {
                    this.responseData =  res;
                },
                err => {
                    this.responseData =  err;
                }
            );
    }

    clear(){
        this.responseData = {};
        this.response = false;
    }


}
