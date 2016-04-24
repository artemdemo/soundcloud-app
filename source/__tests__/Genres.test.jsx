'use strict';

jest.dontMock('../components/Genres');
jest.dontMock('../stores/SCStore');
jest.dontMock('../../node_modules/axios/lib/axios.js');

import * as React from 'react';
import TestUtils from 'react-addons-test-utils';

describe('Genres component', () => {
    let renderedItem;
    const Genres = require('../components/Genres').Genres;

    beforeEach(function() {
        renderedItem = TestUtils.renderIntoDocument(
            <Genres></Genres>
        );
    });

    it('Array of genres has 28 elements', () => {
        const GenresContainer = TestUtils.scryRenderedDOMComponentsWithClass(renderedItem, 'genres__list-item');

        expect(GenresContainer.length).toEqual(28);
    });

});
