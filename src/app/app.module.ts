import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalErrorService } from './shared/services/global-error/global-error.service';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [
        {
            provide: ErrorHandler,
            useClass: GlobalErrorService,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
