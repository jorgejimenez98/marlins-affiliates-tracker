import type { JSX, LazyExoticComponent } from "react"

export interface AppRoute {
  path: string
  element: JSX.Element | LazyExoticComponent<() => JSX.Element>
}