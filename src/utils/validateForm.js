const validateForm = (username, password, email, profile_pic) => {
  let isValid = true;
  //if not all fields are filled in return an alert
  if (!username || !password || !email || !profile_pic) {
    alert("Please fill all the fields");
    isValid = false;
  }

  //if the uploaded file is not of type image alert
  if (profile_pic && !profile_pic?.type?.startsWith("image/")) {
    alert("Please upload an image");
    isValid = false;
  }

  return isValid;
};

export default validateForm;
