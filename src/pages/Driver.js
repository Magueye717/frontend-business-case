import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  MainContainer,
  PackageDetails,
  DriverContainer,
} from "../components/styles";
import socketIO from "socket.io-client";
import DeliverMap from "../data/DeliverMap";

const socket = socketIO.connect("http://localhost:8000");

export default function Driver() {
  const [deliveryId, setDeliveryId] = useState("");
  const [deliveryDetails, setDeliveryDetails] = useState();
  const [packageDetails, sePackageDetails] = useState();
  const [location, setLocation] = useState();
  const [deliveryStatus, setDeliveryStatus] = useState({
    current: "open",
    previous: null,
  });

  const onSearch = () => {
    setDeliveryDetails();
    sePackageDetails();
    axios
      .get(`http://localhost:8000/api/delivery/${deliveryId}`)
      .then(({ data }) => {
        setDeliveryDetails(data.data);
        sePackageDetails(data.data.package_id);
        setDeliveryStatus({ current: data.data.status });
      });
  };

  const onUpdateStatus = (status) => {
    socket.emit("status_changed", {
      delivery_id: deliveryDetails?._id,
      status,
    });
    switch (status) {
      case "picked-up":
        setDeliveryStatus({ current: status, previous: "open" });
        break;
      case "in-transit":
        setDeliveryStatus({ current: status, previous: "picked-up" });
        break;
      case "delivered":
      case "failed":
        setDeliveryStatus({ current: "delivered", previous: "in-transit" });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    (() => {
      socket.on("delivery_updated", (delivery) => {
        setDeliveryDetails(delivery);
        setDeliveryStatus((prev) => ({
          previous: prev.prev,
          current: delivery.status,
        }));
      });
    })();
  }, [location]);

  useEffect(() => {
    const interval = setInterval(() => {
      !!deliveryId &&
        deliveryDetails &&
        socket.emit("location_changed", {
          delivery_id: deliveryDetails?._id,
          location,
        });
    }, 20000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, deliveryStatus]);

  return (
    <MainContainer bg="#FCE5CD">
      <h2 style={{ width: "100%", textAlign: "center" }}>Web Driver</h2>
      <DriverContainer>
        <div className="row">
          <div className="col-md-9">
            <input
              type="text"
              class="form-control col-md-5"
              placeholder="Enter Delivery ID"
              onChange={(e) => setDeliveryId(e.target.value)}
              style={{ height: 55, fontWeight: "bolder" }}
            />
          </div>
          <div className="col-md-2">
            <Button bg="#6AA74F" onClick={onSearch}>
              Submit
            </Button>
          </div>
        </div>
      </DriverContainer>
      <DriverContainer>
        <div className="row mb-3 ">
          <div className="col-md-7">
            <div>
              <h5>Package details</h5>
              <PackageDetails>
                <div className="row">
                  <div className="col-6">
                    <b>id:</b> {packageDetails?._id}
                    <p>
                      <b>weight:</b>
                      {packageDetails && `${packageDetails?.weight} grams`}
                    </p>
                    <p>
                      <b>width:</b>
                      {packageDetails && `${packageDetails?.width} cm`}
                    </p>
                    <p>
                      <b>height:</b>
                      {packageDetails && `${packageDetails?.height} cm`}
                    </p>
                    <p>
                      <b>depth:</b>
                      {packageDetails && `${packageDetails?.depth} cm`}
                    </p>
                  </div>
                  <div className="col-6">
                    <p>
                      <b>From name:</b> {packageDetails?.from_name}
                    </p>
                    <p>
                      <b>From address:</b>
                      {packageDetails?.from_address}
                    </p>
                    <p>
                      <b>To name:</b> {packageDetails?.to_name}
                    </p>
                    <p>
                      <b>To address:</b> {packageDetails?.to_address}
                    </p>
                  </div>
                </div>
                <p>
                  <b>Description:</b> {packageDetails?.description}
                </p>
              </PackageDetails>
            </div>

            <div>
              <h5>Delivery details</h5>
              <PackageDetails>
                <p class="text-bold">
                  <b>id:</b> {deliveryDetails?._id}
                </p>
                <p>
                  <b>Pickup time:</b> {deliveryDetails?.pickup_time}
                </p>
                <p>
                  <b>Start time:</b> {deliveryDetails?.start_time}
                </p>
                <p>
                  <b>End time:</b> {deliveryDetails?.end_time}
                </p>
                <p>
                  <b>Status:</b> {deliveryDetails?.status}
                </p>
              </PackageDetails>
            </div>
          </div>

          <div className="col-md-5 ">
            <DeliverMap
              location={location}
              setLocation={setLocation}
              packageDetails={packageDetails}
              /*  deliveryDetails={deliveryDetails} */
            />
          </div>
        </div>
        <div>
          <Button
            disabled={
              !deliveryDetails ||
              deliveryStatus.current !== "open" ||
              deliveryStatus.current === "picked-up" ||
              deliveryStatus.current === "in-transit"
            }
            onClick={() => onUpdateStatus("picked-up")}
            className="mb-2"
            bg="#6FA7DB"
          >
            Picked Up
          </Button>
          <Button
            disabled={deliveryStatus.current !== "picked-up"}
            onClick={() => onUpdateStatus("in-transit")}
            className="mb-2"
            bg="#FF9900"
          >
            In-Transit
          </Button>
          <Button
            className="mb-2"
            bg="#6AA74F"
            disabled={deliveryStatus.current !== "in-transit"}
            onClick={() => onUpdateStatus("delivered")}
          >
            Delivered
          </Button>
          <Button
            className="mb-2"
            bg="#E06666"
            disabled={deliveryStatus.current !== "in-transit"}
            onClick={() => onUpdateStatus("failed")}
          >
            Failed
          </Button>
        </div>
      </DriverContainer>
    </MainContainer>
  );
}
