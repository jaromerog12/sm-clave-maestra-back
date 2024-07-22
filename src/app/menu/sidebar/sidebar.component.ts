import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, CommonModule, RouterOutlet, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  sidebarClass = 'sidebar-dark-primary';
  title: string = '';
  selectedNav: string | null = null;

  fillerNav = [
    { label: 'Home', icon: 'home', path: '/' },
    { label: 'Clave maestra', icon: 'key', path: '/clave-maestra' },
    { label: 'Elementos', icon: 'key', path: '/elementos' }
  ];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd): void => {
      this.title = this.routeTitles.get(event.urlAfterRedirects) || '';
      this.selectedNav = this.title;
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  changeTitle(newTitle: string) {
    this.title = newTitle;
    this.selectedNav = newTitle;
  }

  private routeTitles = new Map<string, string>(
    this.fillerNav.map(nav => [nav.path, nav.label])
  );

}
