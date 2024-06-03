import { InjectionToken } from "@angular/core";

const localStorageFactory = () => {
  try {
    // Attempt to access localStorage
    return localStorage;
  } catch (e) {
    // If localStorage is not available (e.g., in server-side rendering), provide a mock implementation
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {}
    };
  }
};

export const localStorageToken = new InjectionToken<any>('local storage', {
  providedIn: 'root',
  factory: localStorageFactory
});
