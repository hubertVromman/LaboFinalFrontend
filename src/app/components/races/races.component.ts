import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { environment } from '../../../../environment';
import { Pagination } from '../../models/pagination.model';

@Component({
  selector: 'app-races',
  standalone: true,
  imports: [TableModule, PaginatorModule, DatePipe, RouterModule, ButtonModule],
  templateUrl: './races.component.html',
  styleUrl: './races.component.scss'
})
export class RacesComponent {

  private ar = inject(ActivatedRoute);
  private router = inject(Router);

  paginatorOptions = environment.paginatorOptions;

  races = this.ar.snapshot.data['races'];
  pagination: Pagination = this.ar.snapshot.data['pagination'];
  totalRecords = this.races.count;

  ngOnInit() {
    this.ar.data.subscribe((resolversData) => {
      this.races = resolversData['races'];
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

    this.router.navigate(['races'], { queryParams: { 'page': this.pagination.page, 'limit': this.pagination.limit } });
  }
}
