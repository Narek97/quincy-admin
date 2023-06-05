const debounce = (fn: any, wait: number) => {
  let timeoutID: any;
  return (...arg: any) => {
    if (timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(() => fn(...arg), wait);
  };
};

export const debounced200 = debounce((fn: any) => fn(), 200);
export const debounced400 = debounce((fn: any) => fn(), 400);
export const debounced800 = debounce((fn: any) => fn(), 800);
