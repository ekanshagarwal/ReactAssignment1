import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Checkbox,
} from "@mui/material";

interface Department {
  department: string;
  sub_departments: string[];
}

interface DepartmentList {
  departments: Department[];
}

const DepartmentList: React.FC<DepartmentList> = ({ departments }) => {
  const [expandedDepartments, setExpandedDepartments] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<
    string[]
  >([]);

  // handle department click
  const handleDepartmentClick = (department: string) => {
    setExpandedDepartments((prevExpanded) =>
      prevExpanded.includes(department)
        ? prevExpanded.filter((dept) => dept !== department)
        : [...prevExpanded, department]
    );
  };

  // handle department check box
  const handleDepartment = (
    event: React.ChangeEvent<HTMLInputElement>,
    department: string
  ) => {
    const [dept] = departments.filter((dept) => dept.department === department);

    if (event.target.checked) {
      setSelectedSubDepartments((prevSelected) => [
        ...prevSelected,
        ...dept.sub_departments,
      ]);
      setSelectedDepartments((prevSelected) => [...prevSelected, department]);
    } else {
      setSelectedSubDepartments((prevSelected) =>
        prevSelected.filter(
          (subDepartment) => !dept.sub_departments.includes(subDepartment)
        )
      );
      setSelectedDepartments((prevSelected) =>
        prevSelected.filter(
          (selectedDepartment) => selectedDepartment !== department
        )
      );
    }
  };

  // handle sub department check box
  const handleSubDepartment = (
    event: React.ChangeEvent<HTMLInputElement>,
    subDepartment: string
  ) => {
    setSelectedSubDepartments((prevSelected) =>
      event.target.checked
        ? [...prevSelected, subDepartment]
        : prevSelected.filter(
            (selectedSubDepartment) => selectedSubDepartment !== subDepartment
          )
    );
  };

  useEffect(() => {
    const [subDepartment] = selectedSubDepartments.slice(-1);

    const rootDepartment = departments.find((dept) =>
      dept.sub_departments.includes(subDepartment)
    );

    if (
      rootDepartment &&
      rootDepartment.sub_departments.every((subDept) =>
        selectedSubDepartments.includes(subDept)
      )
    ) {
      setSelectedDepartments((prevSelected) => [
        ...prevSelected,
        rootDepartment.department,
      ]);
    } else {
      setSelectedDepartments((prevSelected) =>
        prevSelected.filter(
          (selectedDepartment) =>
            selectedDepartment !== rootDepartment?.department
        )
      );
    }
  }, [selectedSubDepartments]);

  return (
    <List component="ul" sx={{ backgroundColor: "white", width: "30%" }}>
      {departments.map((dept) => (
        <div key={dept.department}>
          <div style={{ display: "flex" }}>
            <Checkbox
              checked={selectedDepartments.includes(dept.department)}
              onChange={(e) => handleDepartment(e, dept.department)}
            />
            <ListItem
              key={dept.department}
              sx={{ cursor: "pointer" }}
              onClick={() => handleDepartmentClick(dept.department)}
            >
              <ListItemText
                primary={
                  dept.department + " (" + dept.sub_departments.length + ")"
                }
              />
            </ListItem>
          </div>
          <Collapse
            in={expandedDepartments.includes(dept.department)}
            unmountOnExit
          >
            <List component="ul">
              {dept.sub_departments.map((subDept) => (
                <ListItem key={subDept} sx={{ pl: 4 }}>
                  <Checkbox
                    edge="start"
                    checked={selectedSubDepartments.includes(subDept)}
                    onChange={(e) => handleSubDepartment(e, subDept)}
                  />
                  <ListItemText primary={subDept} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;
