import { FormatDetailsPipe } from './genres-format.pipe';

describe('GenresFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new FormatDetailsPipe();
    expect(pipe).toBeTruthy();
  });
});
