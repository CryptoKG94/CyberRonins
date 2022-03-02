import { InjectionToken} from '@angular/core';

export const LocalStorageProviderToken = new InjectionToken(
    'Local Storage Provider',
    {
        providedIn: 'root',
        factory: () => (window as any).localStorage
    }
);