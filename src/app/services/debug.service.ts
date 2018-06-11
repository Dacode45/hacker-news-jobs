import { Injectable } from '@angular/core';
import { Actions, ofActionDispatched } from '@ngxs/store';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DebugService {

  constructor(
    private actions$: Actions
  ) {
    this.actions$.subscribe((action) => {
      console.log('[NGXS]: ', action);
    });
  }
}
