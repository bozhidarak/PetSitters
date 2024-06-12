import { Routes } from '@angular/router';
import { HomePageComponent } from '../../components/home-page/home-page.component';
import { PetSittersPageComponent } from '../../components/pet-sitters-page/pet-sitters-page.component';
import { OwnerOffersPageComponent } from '../../components/owner-offers-page/owner-offers-page.component';
import { RegistrationComponent } from '../../components/registration/registration.component';
import { LoginComponent } from '../../components/login/login.component';
import { HowPageComponent } from '../../components/how-page/how-page.component';
import { SitterDetailsComponent } from '../../components/sitter-details/sitter-details.component';
import { OwnerOfferDetailsComponent } from '../../components/owner-offer-details/owner-offer-details.component';
import { EditProfileComponent } from '../../components/edit-profile/edit-profile.component';

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
    {path: 'sitter-details/:sitterEmail/:sitterEmailProvider/:sitterEmailDomain', component:SitterDetailsComponent},
    {path: 'owner-details/:id', component:OwnerOfferDetailsComponent},
    {path: 'edit-profile', component:EditProfileComponent}
];
