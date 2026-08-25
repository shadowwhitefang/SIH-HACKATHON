/**
 * Client-Side Router for CivicTrack
 * Supports hash-based routing (#/, #/login, #/dashboard) and path fallback
 */

export class Router {
  constructor(routes, rootElementId = "app") {
    this.routes = routes;
    this.rootElement = document.getElementById(rootElementId);
    this.currentRoute = null;

    window.addEventListener("hashchange", () => this.handleRoute());
    window.addEventListener("popstate", () => this.handleRoute());
  }

  getRoutePath() {
    const hash = window.location.hash.slice(1);
    if (!hash || hash === "") return "/";
    // Normalize hash (e.g. "#/login" -> "/login")
    return hash.startsWith("/") ? hash : `/${hash}`;
  }

  navigate(path) {
    window.location.hash = path.startsWith("/") ? path : `/${path}`;
  }

  handleRoute() {
    let path = this.getRoutePath();
    // Strip query params if any
    const cleanPath = path.split("?")[0];

    const handler = this.routes[cleanPath] || this.routes["/"] || (() => "<div>Page not found</div>");
    this.currentRoute = cleanPath;

    // Execute render
    handler(this.rootElement, cleanPath);
  }

  start() {
    this.handleRoute();
  }
}
