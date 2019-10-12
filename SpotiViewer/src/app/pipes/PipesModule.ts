import {NgModule} from '@angular/core';
import {FormatDetailsPipe} from './genres-format.pipe';


@NgModule({
  declarations: [
    FormatDetailsPipe,
  ],
  imports: [],
  exports: [
    FormatDetailsPipe,
  ]
})
export class PipesModule {
}
