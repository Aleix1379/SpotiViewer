import {NgModule} from '@angular/core';
import {GenresFormatPipe} from './genres-format.pipe';


@NgModule({
  declarations: [
    GenresFormatPipe,
  ],
  imports: [],
  exports: [
    GenresFormatPipe,
  ]
})
export class PipesModule {
}
