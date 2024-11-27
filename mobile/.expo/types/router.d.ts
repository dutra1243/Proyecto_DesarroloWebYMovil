/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/signIn` | `/(auth)/signUp` | `/(tabs)` | `/(tabs)/home` | `/(tabs)/home/` | `/(tabs)/profile` | `/(tabs)/profile/` | `/(tabs)/profile/friends` | `/(tabs)/profile/profiles` | `/_sitemap` | `/home` | `/home/` | `/profile` | `/profile/` | `/profile/friends` | `/profile/profiles` | `/signIn` | `/signUp`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
