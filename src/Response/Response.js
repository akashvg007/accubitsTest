const responseObj = {
  data: [],
  error: false,
};
export const makeResponse = (res, data, err = false) => {
  responseObj.error = err;
  responseObj.data = data;
  res.json(responseObj);
};
