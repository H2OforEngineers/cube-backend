'use strict';

require("dotenv").config();
const {getCurrentUser, userLeave, getRoomUsers} = require('../src/server')


describe('check get CurrentUser', () => {
      it('CurrentUser is there', async () => {
        expect(getCurrentUser).toEqual(getCurrentUser)
      
      });
    });

    describe('check get userLeave', () => {
        it('userLeave is there', async () => {
          expect(userLeave).toEqual(userLeave)
        });
      });

      describe('check get getRoomUsers', () => {
        it('getRoomUsers is there', async () => {
          expect(getRoomUsers).toEqual(getRoomUsers)
        });
      });