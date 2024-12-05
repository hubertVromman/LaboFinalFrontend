import { Routes } from '@angular/router';
import { AddRaceComponent } from './components/add-race/add-race.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RunnerComponent } from './components/runner/runner.component';
import { localitiesResolver } from './resolvers/localities.resolver';
import { runnerResolver } from './resolvers/runner.resolver';

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "addrace", resolve: { localities: localitiesResolver }, component: AddRaceComponent },
  { path: "profile", component: ProfileComponent },
  { path: "runner/:id", resolve: { runner: runnerResolver }, component: RunnerComponent },
  { path: "error", component: ErrorComponent },
  { path: "**", component: ErrorComponent },
];
