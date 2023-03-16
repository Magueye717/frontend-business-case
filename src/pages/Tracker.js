/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  DriverContainer,
  MainContainer,
  PackageDetails,
  TrackerContainer,
} from "../components/styles";

import socketIO from "socket.io-client";
import TrackerMap from "../data/TrackerMap";

const socket = socketIO.connect("http://localhost:8000");

export default function Tracker() {
  const [packageId, setPackageId] = useState("");
  const [deliveryDetails, setDeliveryDetails] = useState();
  const [packageDetails, sePackageDetails] = useState();

  const onSearch = () => {
    setDeliveryDetails();
    sePackageDetails();
    axios
      .get(`http://localhost:8000/api/package/${packageId}`)
      .then(({ data }) => {
        sePackageDetails(data.data);
        if (data.data.active_delivery_id) {
          axios
            .get(
              `http://localhost:8000/api/delivery/${data.data.active_delivery_id}`
            )
            .then(({ data }) => {
              setDeliveryDetails(data.data);
            });
        }
      });
  };

  useEffect(() => {
    (() => {
      socket.on("delivery_updated", (delivery) => {
        packageId && setDeliveryDetails(delivery);
      });
    })();
  }, [packageDetails, packageId]);

  return (
    <MainContainer bg="#D9E8D3">
      <h2 style={{ width: "100%", textAlign: "center" }}>Web Tracker</h2>
      <DriverContainer>
        <div className="row">
          <div className="col-md-9">
            <input
              type="text"
              class="form-control col-md-5"
              placeholder="Enter Package ID"
              onChange={(e) => setPackageId(e.target.value)}
              style={{ height: 55, fontWeight: "bolder" }}
            />
          </div>
          <div className="col-md-2">
            <Button bg="#6AA74F" onClick={onSearch}>
              Track
            </Button>
          </div>
        </div>
      </DriverContainer>

      <TrackerContainer>
        <div className="row mb-3 ">
          <div className="col-md-7">
            <div>
              <h5>Package details</h5>
              <PackageDetails>
                <div className="row">
                  <div className="col-6">
                    <b>id:</b> {deliveryDetails?._id}
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

          <div className="col-md-5">
            <TrackerMap
              deliveryDetails={deliveryDetails}
              packageDetails={packageDetails}
            />
          </div>
        </div>
      </TrackerContainer>
    </MainContainer>
  );
}
