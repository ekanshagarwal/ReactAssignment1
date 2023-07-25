import Component1 from "../component/component1";
import DepartmentList from "../component/component2";
import { Typography } from "@mui/material";
import departmentsData from "../data/departmentsData.json";
import { useNavigate } from "react-router-dom";

const SecondPage = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails") || "");
  const navigate = useNavigate();

  if (
    !userDetails ||
    !userDetails.name ||
    !userDetails.phoneNumber ||
    !userDetails.email
  ) {
    alert("Please provide your details before accessing this page.");
    navigate("/");
    return null;
  }

  return (
    <>
      <div
        style={{
          width: "60rem",
          backgroundColor: "#83d0c9",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" sx={{ margin: "1rem 0 1rem 0" }}>
          Data Table
        </Typography>
        <Component1 />
        <Typography variant="h4" sx={{ margin: "3rem 0 1rem 0" }}>
          Departments and sub-departments
        </Typography>
        <DepartmentList departments={departmentsData} />
      </div>
    </>
  );
};

export default SecondPage;
