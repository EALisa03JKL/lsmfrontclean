import { Component } from '@angular/core';
import { LucideAngularModule, Settings } from 'lucide-angular';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css'],
  imports: [LucideAngularModule],
  standalone: true,
})
export class ProfileInfoComponent {
  readonly SettingsIcon = Settings;
}
