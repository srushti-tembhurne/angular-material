import { NewPage } from './app.po';

describe('new App', () => {
  let page: NewPage;

  beforeEach(() => {
    page = new NewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
