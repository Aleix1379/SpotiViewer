import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'msToTime'
})
export class MsToTimePipe implements PipeTransform {

  transform(time: number, ...args: any[]): any {

    time = time / 1000;

    const hours = Math.round((Math.floor(time / 3600)));
    const minutes = Math.round((Math.floor((time - hours * 3600) / 60)));
    const seconds = Math.round((time - hours * 3600 - minutes * 60));

    let strHours = `${hours}`;
    let strMinutes = `${minutes}`;
    let strSeconds = `${seconds}`;

    if (hours < 10) {
      strHours = '0' + hours;
    }
    if (minutes < 10) {
      strMinutes = '0' + minutes;
    }
    if (seconds < 10) {
      strSeconds = '0' + seconds;
    } else if (seconds === 0) {
      strSeconds = '0';
    }

    if (time < 60) {
      return strSeconds;
    } else if (time < 3600) {
      return strMinutes + ':' + strSeconds;
    }
    return strHours + ':' + strMinutes + ':' + strSeconds;
  }

}
