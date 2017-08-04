/**
 * Created by yss on 6/11/17.
 */
'use strict';

const timerMap = new Map();

class Cache extends Map {
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
        const timer = setTimeout(this.delete.bind(this, key), (typeof ttl === 'number' ? ttl : 5) * 1000);
        // and prevent the setTimeout from stop the server shutdown
        timer.unref();

        timerMap.set(key, timer);
    }

    'delete' (key) {
        super.delete(key);
        if (timerMap.has(key)) {
            clearTimeout(timerMap.get(key));
            timerMap.delete(key);
        }
    }
}

module.exports = Cache;