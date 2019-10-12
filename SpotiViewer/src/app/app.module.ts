import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatDialogModule, MatSnackBarModule} from '@angular/material';
import {LoginComponent} from './pages/login/login.component';
import {InterceptorModule} from './interceptor.module';
import {ArtistsComponent} from './pages/artists/artists.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {AlbumsComponent} from './pages/albums/albums.component';
import {GridItemComponent} from './components/grid-item/grid-item.component';
import {PopularityComponent} from './components/popularity/popularity.component';
import {LoadingComponent} from './components/loading/loading.component';
import {SnackBarComponent} from './components/snack-bar/snack-bar.component';
import { AlbumDetailComponent } from './pages/album-detail/album-detail.component';
import { HeaderComponent } from './components/header/header.component';
import {PipesModule} from './pipes/PipesModule';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ListHeaderComponent } from './components/list-header/list-header.component';
import { ArtistDetailComponent } from './pages/artist-detail/artist-detail.component';

@NgModule({
  entryComponents: [
    LoadingComponent,
    SnackBarComponent,
  ],
  declarations: [
    AlbumsComponent,
    AppComponent,
    ArtistsComponent,
    GridItemComponent,
    LoadingComponent,
    LoginComponent,
    PopularityComponent,
    ProfileComponent,
    SnackBarComponent,
    AlbumDetailComponent,
    HeaderComponent,
    ListItemComponent,
    ListHeaderComponent,
    ArtistDetailComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    InterceptorModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    PipesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
