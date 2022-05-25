export const FormReducer = (state, action) => {
  switch (action.type) {
    case "FORM_RESET":
      return {
        title: "",
        author: "",
        description: "",
        file: null,
        isEdit: false,
      };

    case "HANDLE_CHANGE":
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };

    case "FILE_UPLOAD":
      return {
        ...state,
        file: action.payload,
      };

    case "ADD":
      //console.log(action.payload);
      const { title, author, description, id, imageName, imageURL } =
        action.payload;

      return {
        title,
        author,
        description,
        imageName,
        id,
        imageURL,
        isEdit: true,
      };

    default:
      return state;
  }
};
