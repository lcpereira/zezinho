import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDataGuard } from 'src/app/guards/user-data.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [UserDataGuard],
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then((m) => m.ProductsModule),
    canActivate: [UserDataGuard],
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
