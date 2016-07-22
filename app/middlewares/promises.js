import Promise from 'bluebird';

export default function promiseMiddleware ({dispatch, getState}) {
  return next => action => {
    const { promise, types, ...rest } = action;
    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...rest, type: REQUEST });

    let finalPromise = promise;

    if (typeof promise === 'function') {
      finalPromise = promise(getState());
    }

    window.promises = window.promises || [];
    window.promises.push(finalPromise);

    return finalPromise
      .then(result => {
        dispatch({ ...rest, data: result, type: SUCCESS })
        return Promise.resolve(result);
      })
      .catch(error => {
        dispatch({ ...rest, error, type: FAILURE })
        return Promise.reject(error);
      })
      .finally(() => {
        window.promises = window.promises.filter(p => p !== finalPromise);
      })
  }
}
