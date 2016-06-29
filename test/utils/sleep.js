const sleep = (timeout = 0) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timeout)
  });
}

export default sleep;
