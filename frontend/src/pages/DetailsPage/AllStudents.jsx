import React from "react";
import AllStudentsCard from "../../components/Cards/AllStudentsCard";
import DashBoardLayouot from "../../components/Layout/DashBoardLayouot";

const AllStudents = () => {
  return (
    <DashBoardLayouot>
        <h1 className="font-epunda text-xl mt-2 mb-3">All Students</h1>
      <AllStudentsCard />
    </DashBoardLayouot>
  );
};

export default AllStudents;
