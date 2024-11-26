/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/signIn` | `/(auth)/signUp` | `/(tabs)` | `/(tabs)/home` | `/(tabs)/profile` | `/_sitemap` | `/home` | `/profile` | `/signIn` | `/signUp`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
