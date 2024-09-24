import { Component } from '@angular/core';
import { GroupCardComponent } from '../components/group-card/group-card.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [
    GroupCardComponent,
    MatIconModule,
  ],
  templateUrl: './community.component.html',
  styleUrl: './community.component.css'
})
export class CommunityComponent {

}
