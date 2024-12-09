import { Routes } from '@angular/router';
import { AddRaceComponent } from './components/add-race/add-race.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RaceComponent } from './components/race/race.component';
import { RunnerComponent } from './components/runner/runner.component';
import { localitiesResolver } from './resolvers/localities.resolver';
import { raceResolver } from './resolvers/race.resolver';
import { resultsByRaceResolver } from './resolvers/results-by-race.resolver';
import { resultsByRunnerResolver } from './resolvers/results-by-runner.resolver';
import { runnerResolver } from './resolvers/runner.resolver';

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "addrace", resolve: { localities: localitiesResolver }, component: AddRaceComponent },
  { path: "profile", component: ProfileComponent },
  { path: "runner/:id", resolve: { runner: runnerResolver, results: resultsByRunnerResolver }, component: RunnerComponent },
  { path: "race/:id", resolve: { race: raceResolver, results: resultsByRaceResolver }, component: RaceComponent },
  { path: "error", component: ErrorComponent },
  { path: "**", component: ErrorComponent },
];
