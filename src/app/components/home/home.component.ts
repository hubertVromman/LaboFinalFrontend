import { Component } from '@angular/core';
import { AddRaceComponent } from "../add-race/add-race.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AddRaceComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
