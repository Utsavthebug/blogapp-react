export function Checkvalid(data) {
  console.log(data);
  let err = {};

  Object.keys(data).forEach((key) => {
    const msg = validate(key, data[key]);
    if (msg) {
      err[key] = msg;
    }
  });

  //console.log(Object.keys(err));
  const hasError = Object.keys(err).length > 0;
  return {
    ...err,
    hasError,
  };
}

function validate(key, data) {
  let msg;
  switch (key) {
    case "file":
      msg = !data ? "file cannot be empty" : "";
      break;

    case "title":
    case "author":
      msg = data.length <= 0 ? `${key} cannot be empty` : "";
      break;

    case "description":
      if (data.split("").length <= 0) {
        msg = `${key} cannot be lesser 20 words`;
      }
      break;

    default:
      return;
  }
  return msg;
}
