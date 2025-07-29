import { ChangeDetectionStrategy, Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  title: string;
  route: string
}

const reactiveItems = reactiveRoutes[0].children ?? []

@Component({
  selector: 'side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent { 

  reactiveMenu: MenuItem[] = reactiveItems
  .filter(item => item.path !== '**' )
  .map(item => ({
    
    route: `reactive/${item.path}`,
    title: `${item.title}`,

  }));

  authMenu: MenuItem[] = [{
    route: './auth', title: 'Registro'
  }]

  
  countryMenu: MenuItem[] = [{
    route: './country', title: 'Países'
  }]


}
