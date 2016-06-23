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

    return finalPromise
      .then(result => {
        dispatch({ ...rest, data: result, type: SUCCESS })
        return result;
      })
      .catch(error => {
        dispatch({ ...rest, error, type: FAILURE })
        return error;
      })

  }
}
