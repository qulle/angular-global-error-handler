# Angular Global Error Handler

## About
Sometimes we have errors, some of them escape without being caught. Use a global error service to handle all uncaught errors in one single place.

## Usage
The service is registered as a provider in the AppModule.
```typescript
import { ErrorHandler } from '@angular/core';
import { GlobalErrorService } from './shared/services/global-error/global-error.service';

@NgModule({
    providers: [
        {
            provide: ErrorHandler,
            useClass: GlobalErrorService,
        }
    ]
})
export class AppModule {}
```

## About The Service
The service will catch all ancaught errors and serialize them to JSON. By default native JS errors cannot be serialized without returning an empty object `{}`. 

The native JS errors all inherits from the base Error object.
- RangeError
- ReferenceError
- SyntaxError
- TypeError
- URIError
- EvalError
- InternalError

The same goes for the Response object that is returned from Fetch. So if throwing an error from a failed fetch request this to can be serialized.
```typescript
if(!response.ok) {
    throw new Error('Failed to fetch endpoint', {
        cause: response
    });
}
```

The serialization uses the replace function inside JSON.stringify. This will recursively go over all key, value pairs inside the object.
```typescript
export class GlobalErrorService implements ErrorHandler {
    private jsonReplacer(key: string, value: any): any {
        if(value instanceof Error) {
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
                cause: value.cause
            };
        }
        
        if(value instanceof Response) {
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
                url: value.url
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
```

## Author
[Qulle](https://github.com/qulle/)