import { Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RunnerComponent } from './components/runner/runner.component';
import { runnerResolver } from './resolvers/runner.resolver';

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "profile", component: ProfileComponent },
  { path: "runner/:id", resolve: {runner: runnerResolver}, component: RunnerComponent },
  { path: "error", component: ErrorComponent },
  { path: "**", component: ErrorComponent },
];
