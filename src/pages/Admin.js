/* eslint-disable no-restricted-globals */
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContainer, Button, MainContainer } from "../components/styles";
import Table from "../components/Table";

export default function Admin() {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [deliveries, setDeliveries] = useState([]);

  const goToPackageForm = () => {
    navigate("/create-package");
  };

  const goToDeliveryForm = () => {
    navigate("/create-delivery", { state: { packages } });
  };

  const onDeletePackege = (id) => {
    confirm("Press a button!");
    axios.delete(`http://localhost:8000/api/package/${id}`).then(() => {
      axios.get("http://localhost:8000/api/package").then(({ data }) => {
        setPackages(data.data);
      });
    });
  };

  const onDeleteDelivery = (id) => {
    confirm("Press a button!");
    axios.delete(`http://localhost:8000/api/delivery/${id}`).then(() => {
      axios.get("http://localhost:8000/api/delivery").then(({ data }) => {
        setDeliveries(data.data);
      });
    });
  };

  const onEditPackege = (id) => {
    navigate("/create-package", { state: id });
  };

  const onEditDelivery = (id) => {
    navigate("/create-delivery", { state: { id, packages } });
  };

  useEffect(() => {
    axios.get("http://localhost:8000/api/package").then(({ data }) => {
      setPackages(data.data);
    });
    axios.get("http://localhost:8000/api/delivery").then(({ data }) => {
      setDeliveries(data.data);
    });
  }, []);

  return (
    <MainContainer bg="#d9e9d3">
      <h2 style={{ width: "100%", textAlign: "center" }}> Web Admin - Home</h2>
      <h3>Packages</h3>
      <AdminContainer>
        <Table
          data={packages}
          onDelete={onDeletePackege}
          onEdit={onEditPackege}
        />
        <div style={{ paddingLeft: "25%", paddingTop: "25%" }}>
          <Button
            bg="#6AA74F"
            onClick={goToPackageForm}
            class="btn ml-4 btn-success"
          >
            Create Package
          </Button>
        </div>
      </AdminContainer>
      <h3>Deliveries</h3>
      <AdminContainer>
        <Table
          isDelivery
          data={deliveries}
          onDelete={onDeleteDelivery}
          onEdit={onEditDelivery}
        />

        <div style={{ paddingLeft: "25%", paddingTop: "25%" }}>
          <Button
            bg="#6AA74F"
            onClick={goToDeliveryForm}
            class="btn ml-4 btn-success"
          >
            Create Delivery
          </Button>
        </div>
      </AdminContainer>
    </MainContainer>
  );
}
