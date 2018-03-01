'use strict';

import { browser, element, by, ElementFinder, ElementArrayFinder } from 'protractor';
import { promise } from 'selenium-webdriver';

const expectedH1 = 'Task';
const expectedTitle = `${expectedH1}`;

describe('Stocks display', () => {

  beforeAll(() => {

    browser.ignoreSynchronization = true;
    browser.waitForAngular();
    browser.sleep(500);
  });

  describe('Initial page', () => {

    browser.get('/dashboard');
    browser.waitForAngular();


    it(`has title '${expectedTitle}'`, () => {
      expect(browser.getTitle()).toEqual(expectedTitle);
    });

    it(`new quotes are displayed`, () => {
      element.all(by.css('.refresh-data-button')).click().then(() => {
        browser.sleep(2000);
        element(by.css('.stock-ticker-list-cont li:first-child')).getText().then((val) => {
          expect(val).not.toContain('N/A');
        })
      })

    });

  });

});

