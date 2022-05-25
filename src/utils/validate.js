export function validate(data) {
  let error = {};
  Object.keys(data).forEach((key) => {
    error["key"] = Validatedata(data["key"], key);
  });
}

function Validatedata(data, key) {
  switch (key) {
    case "title":
      if (!data.length) {
        return "";
      }
  }
}
