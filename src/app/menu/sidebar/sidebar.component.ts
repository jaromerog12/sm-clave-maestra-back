import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SIDEBAR_DARK_SKINS, SIDEBAR_LIGHT_SKINS } from '../../utils/theme';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, CommonModule, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  sidebarClass = 'sidebar-dark-primary';
  sidebarLightSkins = SIDEBAR_LIGHT_SKINS;
  sidebarDarkSkins = SIDEBAR_DARK_SKINS;

  
  fillerNav = [
    { label: 'Home', icon: 'home' },
    { label: 'Settings', icon: 'settings' },
    { label: 'Info', icon: 'info' }
  ];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  //shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
}
