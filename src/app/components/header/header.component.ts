import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('searchInput') searchInput!: ElementRef<any>;
  currentPath: string = '';

  routes = [
    {
      route: '/rick-and-morty/characters',
      label: 'Characters',
      active: false
    },
    {
      route: '/rick-and-morty/episodes',
      label: 'Episodes',
      active: false
    },
    {
      route: '/rick-and-morty/locations',
      label: 'Locations',
      active: false
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void { }

  validateInput(name: any, event: any): void {
    if (event.keyCode === 13) {
      this.search(name);
    }
  }

  search(name: string) {
    if (name !== '') {
      this.searchInput.nativeElement.value = '';
      var snapshot = this.route.snapshot;
      const params = { ...snapshot.queryParams };
      delete params['name']
      this.router.navigate([], { queryParams: { name } });
    }
  }

  navigateTo(path: string): void {
    this.currentPath = path;
    this.router.navigate([path]);
  }

}
