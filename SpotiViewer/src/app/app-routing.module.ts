import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArtistsComponent} from './pages/artists/artists.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {AlbumsComponent} from './pages/albums/albums.component';
import {LoginComponent} from './pages/login/login.component';
import {AlbumDetailComponent} from './pages/album-detail/album-detail.component';
import {ArtistDetailComponent} from './pages/artist-detail/artist-detail.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'albums',
    component: AlbumsComponent
  },
  {
    path: 'albums/:id',
    component: AlbumDetailComponent
  },
  {
    path: 'artists',
    component: ArtistsComponent
  },
  {
    path: 'artists/:id',
    component: ArtistDetailComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
