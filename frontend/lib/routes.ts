"use client"

export const ROUTES = {
  // Static routes
  HOME: "/home",
  SIGN_IN: "/",

  // Dynamic route generators
  COURSE: (id: string) => `/courses/${id}`,
} as const


export type RouteParams = {
  course: { id: string }
}

export function getHomeRoute(): string {
  return ROUTES.HOME
}

export function getSignInRoute(): string {
  return ROUTES.SIGN_IN
}

export function getCourseRoute(id: string): string {
  return ROUTES.COURSE(id)
}

