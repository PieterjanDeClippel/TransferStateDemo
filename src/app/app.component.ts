import { isPlatformServer } from '@angular/common';
import { Component, Inject, PLATFORM_ID, OnInit, TransferState, makeStateKey } from '@angular/core';

const backgroundColorState = makeStateKey<string>('backgroundColor');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: any, private transferState: TransferState) {}

  title = 'TransferStateDemo';
  backgroundColor?: string;

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      // We should be able to receive the background color from a SupplyData hook...
      this.backgroundColor = '#555';
      this.transferState.set(backgroundColorState, this.backgroundColor);
    } else {
      const colorFromState = this.transferState.get(backgroundColorState, undefined);
      if (colorFromState) {
        this.backgroundColor = colorFromState;
      } else {
        // This can happen when we're on a page instead of a rootcomponent,
        // and the value is to be fetched by the browser when the user navigates to this page.
      }
    }
  }
}
