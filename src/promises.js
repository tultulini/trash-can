import { promises } from "dns";

export function MakeQuerablePromise(promise) {
    // Don't modify any promise that has been already modified.
    if (promise.isResolved) return promise;

    // Set initial state
    var isPending = true;
    var isRejected = false;
    var isFulfilled = false;

    // Observe the promise, saving the fulfillment in a closure scope.
    var result = promise.then(
        function (v) {
            isFulfilled = true;
            isPending = false;
            return v;
        },
        function (e) {
            isRejected = true;
            isPending = false;
            throw e;
        }
    );

    result.isFulfilled = function () { return isFulfilled; };
    result.isPending = function () { return isPending; };
    result.isRejected = function () { return isRejected; };
    return result;
}

export function isPromise(val) {
    return val && val.constructor && val.constructor.name === "Promise"
}

export function wrapPromiseForResult(promise, result) {
    return new Promise((resolve, reject) => {
        promise.then(() => resolve(result))
            .catch(() => reject(result))

    })
}