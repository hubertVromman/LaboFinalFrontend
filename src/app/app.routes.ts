import { Routes } from '@angular/router';
import { ActivationComponent } from './components/activation/activation.component';
import { AddRaceComponent } from './components/add-race/add-race.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RaceComponent } from './components/race/race.component';
import { RacesComponent } from './components/races/races.component';
import { RunnerComponent } from './components/runner/runner.component';
import { localitiesResolver } from './resolvers/localities.resolver';
import { paginationResolver } from './resolvers/pagination.resolver';
import { raceResolver } from './resolvers/race.resolver';
import { racesResolver } from './resolvers/races.resolver';
import { resultsByRaceResolver } from './resolvers/results-by-race.resolver';
import { resultsByRunnerResolver } from './resolvers/results-by-runner.resolver';
import { runnerResolver } from './resolvers/runner.resolver';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

export const routes: Routes = [
  { path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  { path: "home",
    resolve: { races: racesResolver },
    component: HomeComponent
  },
  { path: "addrace",
    resolve: { localities: localitiesResolver },
    component: AddRaceComponent
  },
  { path: "profile",
    component: ProfileComponent
  },
  { path: "runner/:id",
    resolve: { runner: runnerResolver, results: resultsByRunnerResolver },
    component: RunnerComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  { path: "race/:id",
    resolve: { race: raceResolver, results: resultsByRaceResolver, pagination: paginationResolver },
    component: RaceComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  { path: "races",
    resolve: { races: racesResolver, pagination: paginationResolver },
    component: RacesComponent
  },
  { path: "activation",
    component: ActivationComponent,
  },
  { path: "forgotPassword",
    component: ForgotPasswordComponent,
  },
  {
    path: "resetPassword",
    component: ResetPasswordComponent,
  },
  { path: "error",
    component: ErrorComponent
  },
  { path: "**",
    component: ErrorComponent
  },
];
