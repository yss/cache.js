/**
 * Created by yss on 8/4/17.
 */
'use strict';

const MemoCache = require('../cache.js');

describe('memo-cache.js', function () {
    let memoCache;

    beforeEach(function () {
        memoCache = new MemoCache();
    });

    describe('set()', function () {
        it('should allow a new item to the cache', function () {
            memoCache.set('key', 'value');
        });

        it('should allow adding a new item to the cache with a timeout', function() {
            memoCache.set('key1', 'value', 100);
        });
    });

    describe('get()', function () {
        it('should get the true value after set it', function () {
            memoCache.set('k1', 'v1');
            memoCache.get('k1').should.equal('v1');
        });

        it('should not be set twice for the same key', function () {
            memoCache.set('k2', 'value');
            memoCache.set('k2', 'value2');

            memoCache.get('k2').should.equal('value');
        });

        it('should not get the value after timeout', function (done) {
            memoCache.set('k3', 'v3', 0.2);
            setTimeout(function () {
                (memoCache.get('k3') === undefined).should.equal(true);
                done();
            }, 300);
            memoCache.get('k3').should.equal('v3');
        });
    });
});