import React from "react";
import { useParams } from "react-router-dom";
import EventEdit from "../../UI/EventEdit";

function AdminDashboardEdit() {
  const { id } = useParams();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* CONTENT BELOW*/}
      <div className="mx-auto max-w-3xl">
        <EventEdit id={id} />
      </div>
    </div>
  );
}

export default AdminDashboardEdit;
