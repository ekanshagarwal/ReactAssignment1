import { useNavigate } from "react-router-dom";
import { Button, Card, TextField, Typography } from "@mui/material";

import "./form.css";
import useInput from "../hooks/use-input";

const Form = () => {
  const navigate = useNavigate();

  const {
    value: name,
    valueIsValid: firstNameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((name) => {
    return name.trim() !== "";
  });

  const {
    value: phoneNumber,
    valueIsValid: lastNnameIsValid,
    hasError: phoneNumberHasError,
    valueChangeHandler: phoneNumberChangeHandler,
    inputBlurHandler: phoneNumberBlurHandler,
    reset: resetPhoneNumberInput,
  } = useInput((name) => {
    return name.trim() !== "";
  });

  const {
    value: enteredEmail,
    valueIsValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((email) => {
    return email.trim().includes("@");
  });

  let formIsValid = false;

  if (emailIsValid && firstNameIsValid && lastNnameIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!formIsValid) {
      alert("Enter your details before proceeding further");
      window.location.reload();
      return;
    }

    localStorage.setItem(
      "userDetails",
      JSON.stringify({
        name: name,
        email: enteredEmail,
        phoneNumber: phoneNumber,
      })
    );

    resetNameInput();
    resetPhoneNumberInput();
    resetEmailInput();

    navigate("/second");
  };

  return (
    <Card
      variant="outlined"
      sx={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "20rem",
      }}
    >
      <Typography variant="h4">Enter User Details</Typography>
      <form onSubmit={formSubmissionHandler} className="form-control">
        <TextField
          sx={{ mt: "1rem" }}
          label="Name"
          name="name"
          value={name}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          fullWidth
        />
        {nameHasError && (
          <Typography component="p" sx={{ color: "#b40e0e" }}>
            Please enter a name
          </Typography>
        )}

        <TextField
          sx={{ mt: "1rem" }}
          label="Phone Number"
          name="phoneNumber"
          value={phoneNumber}
          onChange={phoneNumberChangeHandler}
          onBlur={phoneNumberBlurHandler}
          fullWidth
        />
        {phoneNumberHasError && (
          <Typography sx={{ color: "#b40e0e" }}>
            Please enter a phone number
          </Typography>
        )}

        <TextField
          sx={{ mt: "1rem" }}
          label="Email"
          name="email"
          type="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          fullWidth
        />
        {emailHasError && (
          <Typography sx={{ color: "#b40e0e" }}>
            Please enter an emial
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          //   disabled={!formIsValid}
          sx={{ mt: "2rem" }}
        >
          Continue
        </Button>
      </form>
    </Card>
  );
};

export default Form;
