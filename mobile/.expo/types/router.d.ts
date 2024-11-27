/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(auth)'}/signIn` | `/signIn`; params?: Router.UnknownInputParams; } | { pathname: `${'/(auth)'}/signUp` | `/signUp`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/addPost` | `/addPost`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/home` | `/home`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/profile` | `/profile`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(auth)'}/signIn` | `/signIn`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(auth)'}/signUp` | `/signUp`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/addPost` | `/addPost`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/home` | `/home`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/profile` | `/profile`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(auth)'}/signIn${`?${string}` | `#${string}` | ''}` | `/signIn${`?${string}` | `#${string}` | ''}` | `${'/(auth)'}/signUp${`?${string}` | `#${string}` | ''}` | `/signUp${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/addPost${`?${string}` | `#${string}` | ''}` | `/addPost${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/home${`?${string}` | `#${string}` | ''}` | `/home${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/profile${`?${string}` | `#${string}` | ''}` | `/profile${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(auth)'}/signIn` | `/signIn`; params?: Router.UnknownInputParams; } | { pathname: `${'/(auth)'}/signUp` | `/signUp`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/addPost` | `/addPost`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/home` | `/home`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/profile` | `/profile`; params?: Router.UnknownInputParams; };
    }
  }
}
