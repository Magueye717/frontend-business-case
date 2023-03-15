/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deliveryInputs, formValidator, status } from "../data";
import { AdminContainer, Button, MainContainer } from "./styles";

export default function DeliveryForm() {
  const [deliveryForm, setDeliveryForm] = useState(deliveryInputs);
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmited, setIsSubmed] = useState(false);

  const packages = location?.state?.packages;

  const delivery_id = location?.state?.id;

  const deliveryFormHandler = {
    onInputChange: (e) => {
      setDeliveryForm({ ...deliveryForm, [e.target.name]: e.target.value });
    },
    onSelectChange: (e) => {
      setDeliveryForm({ ...deliveryForm, [e.target.name]: e.target.value });
    },
  };

  const isValid = formValidator(deliveryForm);

  const onSubmit = () => {
    setIsSubmed(true);
    if (isValid) {
      toast.success(
        !delivery_id
          ? "Delivery added sucesfully !"
          : "Delivery updated sucesfully !",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      if (!delivery_id) {
        const { package_id, ...form } = deliveryForm;
        axios.post(`http://localhost:8000/api/delivery/${package_id}`, {
          ...form,
        });
        setDeliveryForm({});
        navigate(-1);
      } else {
        axios.put(
          `http://localhost:8000/api/delivery/${delivery_id}`,
          deliveryForm
        );

        setDeliveryForm({});
        navigate(-1);
      }
      return;
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/delivery/${delivery_id}`)
      .then(({ data }) => {
        setDeliveryForm(data.data);
      });
  }, []);

  return (
    <MainContainer bg="#d9e9d3">
      <h2 style={{ width: "100%", textAlign: "center" }}>
        Web Admin - Create Delivery
      </h2>
      <AdminContainer>
        <form>
          <div className="row mb-2">
            <div className="col-md-6 mb-3">
              <label>Status</label>
              <select
                onChange={deliveryFormHandler.onSelectChange}
                className="custom-select form-control"
                name="status"
                disabled
              >
                {status.map((status) => (
                  <option
                    selected={
                      !delivery_id
                        ? status === "open"
                        : status === deliveryForm.status
                    }
                    value={status}
                  >
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label>Packages</label>
              <select
                onChange={deliveryFormHandler.onSelectChange}
                className={`form-control custom-select ${
                  isSubmited &&
                  deliveryForm?.package_id === "" &&
                  "border border-2 border-danger"
                }`}
                name="package_id"
              >
                <option>Select the concerned Package</option>
                {packages?.map((packageItem) => (
                  <option
                    selected={packageItem?.active_delivery_id === delivery_id}
                    value={packageItem?._id}
                  >{`${packageItem.from_address}    <---->   ${packageItem.to_address} `}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-6 mb-3">
              <label>Pickup Time</label>
              <input
                type="time"
                className={`form-control ${
                  isSubmited &&
                  deliveryForm?.pickup_time === "" &&
                  "border border-2 border-danger"
                }`}
                name="pickup_time"
                onChange={deliveryFormHandler.onInputChange}
                value={`${deliveryForm?.pickup_time}`}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>Start Time</label>
              <input
                type="time"
                className={`form-control ${
                  isSubmited &&
                  deliveryForm?.start_time === "" &&
                  "border border-2 border-danger"
                }`}
                name="start_time"
                onChange={deliveryFormHandler.onInputChange}
                value={`${deliveryForm?.start_time}`}
              />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-6 mb-3">
              <label>End Time</label>
              <input
                type="time"
                className={`form-control ${
                  isSubmited &&
                  deliveryForm?.end_time === "" &&
                  "border border-2 border-danger"
                }`}
                placeholder="End time"
                name="end_time"
                onChange={deliveryFormHandler.onInputChange}
                value={`${deliveryForm.end_time}`}
              />
            </div>
          </div>
        </form>
        <Button bg="#6AA74F" onClick={onSubmit}>
          Submit
        </Button>
      </AdminContainer>
    </MainContainer>
  );
}
