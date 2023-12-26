import { Routes } from '@angular/router';
import { HomePageComponent } from '../../components/home-page/home-page.component';
import { PetSittersPageComponent } from '../../components/pet-sitters-page/pet-sitters-page.component';
import { OwnersPageComponent } from '../../components/owners-page/owners-page.component';
import { RegistrationComponent } from '../../components/registration/registration.component';
import { LoginComponent } from '../../components/login/login.component';
import { HowPageComponent } from '../../components/how-page/how-page.component';

export const routes: Routes = [
    {
       path:'', pathMatch: 'full', redirectTo:'home-page',
    },
    {path:'home-page', component:HomePageComponent},
    {path:'pet-sitters', component:PetSittersPageComponent},
    {path:'owners-page', component:OwnersPageComponent},
    {path:'registration', component:RegistrationComponent},
    {path:'login', component:LoginComponent},
    {path: 'how-page', component:HowPageComponent}


];
