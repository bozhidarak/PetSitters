import { Routes } from '@angular/router';
import { HomePageComponent } from '../../components/home-page/home-page.component';
import { PetSittersPageComponent } from '../../components/pet-sitter-offers-page/pet-sitter-offers-page.component';
import { OwnerOffersPageComponent } from '../../components/owner-offers-page/owner-offers-page.component';
import { RegistrationComponent } from '../../components/registration/registration.component';
import { LoginComponent } from '../../components/login/login.component';
import { HowPageComponent } from '../../components/how-page/how-page.component';
import { SitterDetailsComponent } from '../../components/sitter-offer-details/sitter-offer-details.component';
import { OwnerOfferDetailsComponent } from '../../components/owner-offer-details/owner-offer-details.component';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';

export const routes: Routes = [
    {
       path:'', pathMatch: 'full', redirectTo:'home-page',
    },
    {path:'home-page', component:HomePageComponent},
    {path:'pet-sitters', component:PetSittersPageComponent},
    {path:'owners-page', component:OwnerOffersPageComponent},
    {path:'registration', component:RegistrationComponent},
    {path:'login', component:LoginComponent},
    {path: 'how-page', component:HowPageComponent},
    {path: 'sitter-details/:id', component:SitterDetailsComponent},
    {path: 'owner-offer-details/:id', component:OwnerOfferDetailsComponent},
    {path: 'user-profile', component:UserProfileComponent}
];
