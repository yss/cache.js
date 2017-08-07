/**
 * Created by yss on 6/11/17.
 */
'use strict';

class Cache extends Map {
    /**
     * memory cache
     * @param {number} [ttl] time to live
     */
    constructor (ttl) {
        super ();

        this._ttl = ttl && typeof ttl === 'number' ? ttl : 5;
        this._timerMap = new Map();
    }
    /**
     * set cache with expired time
     *
     * @param {*} key
     * @param {*} value
     * @param {number} [ttl=5] time to live, and the unit is second
     */
    set (key, value, ttl) {

        // ignore duplicate setting
        if (this.has(key)) {
            return;
        }
        super.set(key, value);

        // remove it after timeout
        const timer = setTimeout(this.delete.bind(this, key), (typeof ttl === 'number' ? ttl : this._ttl) * 1000);
        // and prevent the setTimeout from stop the server shutdown on node environment
        timer.unref && timer.unref();

        this._timerMap.set(key, timer);
    }

    /**
     * change the default ttl
     * or one key's ttl
     *
     * @param {number} ttl
     * @param {*} [key]
     */
    setTtl (ttl, key) {
        if (typeof ttl !== 'number') {
            return;
        }

        if (!key) {
            this._ttl = ttl;
        } else if (this.has(key)) {
            let value = this.get(key);
            this.delete(key);
            this.set(key, value, ttl);
        }
    }

    'delete' (key) {
        super.delete(key);

        const timerMap = this._timerMap;

        if (timerMap.has(key)) {
            clearTimeout(timerMap.get(key));
            timerMap.delete(key);
        }
    }
}

module.exports = Cache;