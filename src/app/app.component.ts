import { Component } from '@angular/core';
import { DebugService } from './services/debug.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(debug: DebugService) {}
}
