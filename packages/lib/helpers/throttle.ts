export const throttle = (func: Function, delay: number = 250) => {
  let inThrottle: boolean;
  let waitingArgs: any[] | null = null;
  const mainFunc = () => {
    if (waitingArgs) {
      func(...waitingArgs);
      waitingArgs = null;
      setTimeout(mainFunc, delay);
    } else {
      inThrottle = false;
    }
  };
  return (...args: any[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(mainFunc, delay);
    } else {
      waitingArgs = args;
    }
  };
};
// a
// ab
// timeoutfunc
// abc
