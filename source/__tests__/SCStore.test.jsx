'use strict';

jest.dontMock('../stores/SCStore');
jest.dontMock('../../node_modules/axios/lib/axios.js');

describe('SCStore', () => {
    const constants = require('../constants');

    const actionFetchClientId = {
        source: 'VIEW_ACTION',
        action: {
            actionType: constants.FETCH_CLIENT_ID
        }
    };

    let Dispatcher;
    let SCStore;
    let callback;

    beforeEach(function() {
        Dispatcher = require('../dispatcher').Dispatcher;
        SCStore = require('../stores/SCStore').SCStore;
        callback = Dispatcher.register.mock.calls[0][0];
    });

    it('registers a callback with the dispatcher', function() {
        expect(Dispatcher.register.mock.calls.length).toBe(1);
    });

    it('By default client id is equal to null', function() {
        expect(SCStore.getClientId()).toBe(null);
    });

    describe('Fetch genre by id', () => {
        it('Classical', function() {
            expect(SCStore.getGenreById('classical').name).toBe('Classical');
        });
        it('Folk & Singer-Songwriter', function() {
            expect(SCStore.getGenreById('folk+&+singer-songwriter').name).toBe('Folk & Singer-Songwriter');
        });
        it('R&B & Soul', function() {
            expect(SCStore.getGenreById('r&b+&+soul').name).toBe('R&B & Soul');
        });
    });
});
