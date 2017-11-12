import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { 
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
} from '@angular/material';

import { Http, HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ServiceClient } from "./client/service-client";
import { ServiceContext } from "./client/service-context";


// vendor dependencies
// app
import { Config } from './common/index';
import { AppComponent } from './app.component';
import { SHARED_MODULES } from './app.common';

Config.PLATFORM_TARGET = Config.PLATFORMS.WEB;

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        NoopAnimationsModule,
        HttpClientModule,
        MatListModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        HttpModule,
        ...SHARED_MODULES
    ],
    providers: [Http, HttpModule, HttpClient, ServiceClient, ServiceContext],
    bootstrap: [AppComponent]
})
export class AppModule { }
