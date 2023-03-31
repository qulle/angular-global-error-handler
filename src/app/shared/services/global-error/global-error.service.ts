import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class GlobalErrorService implements ErrorHandler {
    private jsonReplacer(key: string, value: any): any {
        if (value instanceof Error) {
            // Explicit Typing
            value = <Error>value;

            // Known properties from Error object
            // Native JS errors that inherits from Error
            return {
                name: value.name,
                message: value.message,
                fileName: value.fileName,
                lineNumber: value.lineNumber,
                columnNumber: value.columnNumber,
                stack: value.stack.split('\n').filter((element: any) => element),
                cause: value.cause,
            };
        }

        if (value instanceof Response) {
            // Explicit Typing
            value = <Response>value;

            // Known properties from Response object
            // Might bee a bad Fetch call that was thrown as an Error, contained inside cause property
            return {
                ok: value.ok,
                redirect: value.redirect,
                status: value.status,
                statusText: value.statusText,
                type: value.type,
                url: value.url,
            };
        }

        // Normal anonymous object or number/literal
        return value;
    }

    handleError(error: any): void {
        const serialized = JSON.stringify(error, this.jsonReplacer, 4);
        console.log(serialized);
    }
}
