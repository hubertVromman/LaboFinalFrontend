import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { environment } from '../../../../environment';
import { ObjectsWithPagination } from '../../models/objects-with-pagination.model';
import { Pagination } from '../../models/pagination.model';
import { Race } from '../../models/race.model';

@Component({
  selector: 'app-race',
  standalone: true,
  imports: [TableModule, PaginatorModule, RouterModule, ButtonModule, DecimalPipe],
  templateUrl: './race.component.html',
  styleUrl: './race.component.scss'
})
export class RaceComponent {

  private ar = inject(ActivatedRoute);
  private router = inject(Router);

  paginatorOptions = environment.paginatorOptions;

  race: Race = this.ar.snapshot.data['race'];
  results: ObjectsWithPagination = this.ar.snapshot.data['results'];
  pagination: Pagination = this.ar.snapshot.data['pagination'];
  totalRecords = this.results.count;

  ngOnInit() {
    this.ar.data.subscribe((resolversData) => {
      this.race = resolversData['race'];
      this.results = resolversData['results'];
      this.pagination = resolversData['pagination'];
    });
  }

  onPageChange(paginatorState: PaginatorState) {
    if ('rows' in paginatorState)
      this.pagination.limit = paginatorState.rows!;

    if ('page' in paginatorState)
      this.pagination.page = paginatorState.page! + 1;
    else if ('first' in paginatorState)
      this.pagination.page = (paginatorState.first! / this.pagination.limit) + 1;

    this.router.navigate(['race/', this.race.raceId], { queryParams: { 'page': this.pagination.page, 'limit': this.pagination.limit } });
  }
}
