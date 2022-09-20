const validateForm = (username, password, email, photos) => {
  console.log("dddd", photos);
  let isValid = true;
  //if not all fields are filled in return an alert
  if (!username || !password || !email) {
    alert("Please fill all the fields");
    isValid = false;
  }

  //if the uploaded file is not of type image alert
  if (
    !photos[0].profile_pic?.type?.startsWith("image/") ||
    !photos[0].cover_pic?.type?.startsWith("image/")
  ) {
    alert("Please upload an image");
    isValid = false;
  }

  return isValid;
};

//loops over user object and fill formData object for multipart/form-data
const handleFormData = (data) => {
  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }

  return formData;
};

export { validateForm, handleFormData };
