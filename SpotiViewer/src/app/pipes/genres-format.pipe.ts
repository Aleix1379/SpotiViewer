import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formatDetails'
})
export class FormatDetailsPipe implements PipeTransform {

  transform(genres: string[]): any {
    if (genres && Array.isArray(genres) && genres.length > 0) {
      return genres.join(', ');
    } else if (genres && Array.isArray(genres) && genres.length === 0) {
      return 'There is no genres';
    }

    return genres;
  }

}
