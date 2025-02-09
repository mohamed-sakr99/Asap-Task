import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { authGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo:  'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard], // Protect Layout
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'product', component: ProductComponent },
            { path: 'product-details', component: EditProductComponent },
            { path: 'product-details/:id', component: EditProductComponent }
        ]
    },
    { path: '**', component: PageNotFoundComponent } // Redirect unknown routes
];
