# FirstAngularApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.12.

## Project Description

**FirstAngularApp** is a learning and demonstration project built with Angular 17, leveraging its standalone components
feature to create a clean, modern web application. The project implements a complete CRUD (Create, Read, Update, Delete)
system for managing blog posts, with a model (`Post`) that includes fields such as `id`, `title`, `slug`, `excerpt`,
`description`, `is_published`, `created_at`, and `updated_at`.

The user interface is designed using Angular Material, providing a polished and responsive design with centered cards,
stacked input fields for forms, and a table-based list view for posts. The application supports navigation between a
post list, post details, create/edit forms, and deletion actions, all managed through Angular’s routing system. As of
February 21, 2025, the project uses standalone components, eliminating the need for a traditional `NgModule`, and
focuses on a modern, user-friendly experience.

## Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you
change any of the source files.

## Code Scaffolding

Run `ng generate component component-name` to generate a new component. You can also use
`ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running End-to-End Tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a
package that implements end-to-end testing capabilities.

## Further Help

To get more help on the Angular CLI, use `ng help` or go check out
the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

### Changes and Additions

- **Project Description:** I added a new section titled "Project Description" that describes the purpose and features of
  `FirstAngularApp`, including:
    - The use of Angular 17 with standalone components.
    - The CRUD functionality for the `Post` model.
    - The UI design using Angular Material, including centered cards, stacked inputs, and a table-based list.
    - The current date (February 21, 2025) to provide context.
- **Preserved Existing Markdown:** I maintained the original structure, headings, and content (e.g., Development Server,
  Code Scaffolding, Build, etc.) without altering their formatting or functionality.
- **Formatting:** Used Markdown headers (`##`) for the new section to maintain consistency with the existing structure.

### Notes

- If you want to add more technical details (e.g., specific dependencies, setup instructions, or screenshots), let me
  know, and I can expand the README further.
- If you’d like a visual representation of the UI (e.g., an image for the README), please confirm, and I can assist with
  generating one (following the guidelines).
- You can save this updated content in your `README.md` file at the root of your project (
  `C:\ng-local-projects\first-angular-project\README.md`).


- Practice with rxjs and multi select form
- NgRx
- maintain the state with complex structure
- Observable and BehaviourSubject (like pinia in vue)
- Learn about component communication (https://v17.angular.io/guide/component-interaction)
- The real API (Laravel or nodeJs) create one and use it with this project
- Add the API to it and use the API to fetch the data, host the API on your hosting




