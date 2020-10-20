
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {
    OKTA_CONFIG,
    OktaAuthGuard,
    OktaAuthModule
} from '@okta/okta-angular';

import { environment } from './../environments/environment';

import { AppComponent } from './app.component';
import { ProtectedComponent } from './protected/protected.component';
import { LoginComponent } from './login/login.component';
import { OktaCallbackComponent } from './okta-callback/okta-callback.component';

if (!environment.local && '${apigee.client.app.name}'.length > 0) {
    environment.oidc.scopes.push('${apigee.client.app.name}');
}

export function onAuthRequired({ oktaAuth, router }) {
    // Redirect the user to your custom login page
    router.navigate(['/login']);
}

const appRoutes: Routes = [
    {
        path: 'callback',
        component: OktaCallbackComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'protected',
        component: ProtectedComponent,
        canActivate: [OktaAuthGuard],
        data: {
            onAuthRequired
        }
    }
]

@NgModule({
    declarations: [
        AppComponent,
        OktaCallbackComponent,
        ProtectedComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        OktaAuthModule,
        RouterModule.forRoot(appRoutes),
    ],
    providers: [
        { provide: OKTA_CONFIG, useValue: environment.oidc },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
