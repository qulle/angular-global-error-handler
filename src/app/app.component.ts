import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'angular-global-error-handler';

    onCaughtError(): void {
        try {
            throw new Error('Custom Error', {
                cause: {
                    name: 'MyCustomError',
                    description: 'This is a Error to test with',
                },
            });
        } catch (error: any) {
            console.dir(error);
        }
    }

    onUnCaughtError(): void {
        throw new Error('Custom Error', {
            cause: {
                name: 'MyCustomError',
                description: 'This is a Error to test with',
            },
        });
    }
}
