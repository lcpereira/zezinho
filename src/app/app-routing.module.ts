import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationGuard } from '@shared/guards/location.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [LocationGuard],
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then((m) => m.ProductsModule),
    canActivate: [LocationGuard],
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then((m) => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
