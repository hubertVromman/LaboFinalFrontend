import { Routes } from '@angular/router';
import { AddRaceComponent } from './components/add-race/add-race.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RaceComponent } from './components/race/race.component';
import { ResultsComponent } from './components/results/results.component';
import { RunnerComponent } from './components/runner/runner.component';
import { localitiesResolver } from './resolvers/localities.resolver';
import { paginationResolver } from './resolvers/pagination.resolver';
import { raceResolver } from './resolvers/race.resolver';
import { racesResolver } from './resolvers/races.resolver';
import { resultsByRaceResolver } from './resolvers/results-by-race.resolver';
import { resultsByRunnerResolver } from './resolvers/results-by-runner.resolver';
import { runnerResolver } from './resolvers/runner.resolver';

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
    component: RunnerComponent
  },
  { path: "race/:id",
    resolve: { race: raceResolver, results: resultsByRaceResolver, pagination: paginationResolver },
    component: RaceComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  { path: "races",
    resolve: { races: racesResolver, pagination: paginationResolver },
    component: ResultsComponent
  },
  { path: "error",
    component: ErrorComponent
  },
  { path: "**",
    component: ErrorComponent
  },
];
