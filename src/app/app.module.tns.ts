import { NgModule, NO_ERRORS_SCHEMA, NgModuleFactoryLoader } from '@angular/core';
import { Http } from '@angular/http';
// nativescript
import { NSModuleFactoryLoader } from 'nativescript-angular/router';
import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
// vendor dependencies
// app
import { Config } from './common/index';
import { AppComponent } from './app.component';
import { SHARED_MODULES } from './app.common';

Config.PLATFORM_TARGET = Config.PLATFORMS.MOBILE_NATIVE;


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule,
        ...SHARED_MODULES
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        // Allows your {N} application to use lazy-loading
        { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader }
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
