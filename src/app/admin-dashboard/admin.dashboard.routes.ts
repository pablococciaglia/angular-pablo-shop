import { Routes } from '@angular/router';
import { AdminDashboardLayout } from './layout/admin-dashboard-layout/admin-dashboard-layout';
import { ProductAdminPage } from './pages/product-admin-page/product-admin-page';
import { ProductsAdminPage } from './pages/products-admin-page/products-admin-page';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: AdminDashboardLayout,
    children: [
      {
        path: 'product/:id',
        component: ProductAdminPage,
      },
      {
        path: 'products',
        component: ProductsAdminPage,
      },
      {
        path: '**',
        redirectTo: 'products',
      },
    ],
  },
];

export default dashboardRoutes;
