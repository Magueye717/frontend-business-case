/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminContainer, Button, MainContainer } from "./styles";
import { packageInputs, formValidator } from "../data";
import { toast } from "react-toastify";

export default function PackageForm() {
  const [packageForm, setPackageForm] = useState(packageInputs);
  const navigate = useNavigate();
  const [isSubmited, setIsSubmed] = useState(false);
  const [isFromLocation, setIsFromLocation] = useState(false);
  const [isToLocation, setIsToLocation] = useState(false);

  const location = useLocation();

  const package_id = location?.state;

  const packageFormHandler = (e) => {
    setPackageForm({ ...packageForm, [e.target.name]: e.target.value });
  };

  const locationHandler = useCallback(
    (label) => (e) => {
      axios
        .get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${e.target.value},&limit=1&appid=7e682fde58e73116cf5dabb979a44cf9`
        )
        .then(({ data }) => {
          if (data) {
            setTimeout(function () {
              if (!data[0]) {
                label === "from_location"
                  ? setIsFromLocation(true)
                  : setIsToLocation(true);
                return;
              }
              label === "from_location"
                ? setIsFromLocation(false)
                : setIsToLocation(false);
            }, 2000);

            setPackageForm({
              ...packageForm,
              [label]: { lng: data[0].lon, lat: data[0].lat },
            });
          }
        });
    },

    [packageForm]
  );

  const isValid = formValidator(packageForm);

  const onSubmit = () => {
    setIsSubmed(true);
    if (isValid) {
      toast.success(
        !package_id
          ? "Package added sucesfully !"
          : "Package updated sucesfully !",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      if (!package_id) {
        if (packageForm.height) {
          axios.post("http://localhost:8000/api/package", packageForm);

          navigate(-1);
        }
      } else {
        axios.put(
          `http://localhost:8000/api/package/${package_id}`,
          packageForm
        );

        navigate(-1);
      }
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/package/${package_id}`)
      .then(({ data }) => {
        setPackageForm(data.data);
      });
  }, []);

  return (
    <MainContainer bg="#d9e9d3">
      <h2 style={{ width: "100%", textAlign: "center" }}>
        Web Admin - Create Package
      </h2>
      <AdminContainer>
        <form>
          <div class="row mb-2">
            <div class="col-md-6 mb-3">
              <label>From name</label>
              <input
                type="text"
                className={`form-control ${
                  isSubmited &&
                  packageForm?.from_name === "" &&
                  "border border-2 border-danger"
                }`}
                placeholder="Deliverer Name"
                name="from_name"
                onChange={packageFormHandler}
                value={packageForm.from_name}
              />
            </div>

            <div class="col-md-6 mb-3">
              <label>To Name</label>
              <input
                type="text"
                className={`form-control ${
                  isSubmited &&
                  packageForm?.to_name === "" &&
                  "border border-2 border-danger"
                }`}
                placeholder="Receiver Name"
                name="to_name"
                onChange={packageFormHandler}
                value={packageForm.to_name}
              />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-md-6 mb-3">
              <label>From location</label>
              <input
                type="text"
                className={`form-control ${
                  isSubmited &&
                  packageForm?.from_location === "" &&
                  "border border-2 border-danger"
                }`}
                placeholder="Ex: Dakar"
                name="from_location"
                onChange={locationHandler("from_location")}
              />
              <p className="text-danger mb-0">
                {isFromLocation &&
                  "Please type a correct city name to get the coordinates"}
              </p>
            </div>
            <div class="col-md-6 mb-3">
              <label>To location</label>
              <input
                type="text"
                className={`form-control ${
                  isSubmited &&
                  packageForm?.to_location === "" &&
                  "border border-2 border-danger"
                }`}
                placeholder="Ex: Lomé"
                name="to_location"
                onChange={locationHandler("to_location")}
              />
              <p className="text-danger mb-0">
                {isToLocation &&
                  "Please type a correct city name to get the coordinates"}
              </p>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-md-6 mb-3">
              <label>From address</label>
              <input
                type="text"
                className={`form-control ${
                  isSubmited &&
                  packageForm?.from_address === "" &&
                  "border border-2 border-danger"
                }`}
                placeholder="Deliverer Address"
                name="from_address"
                onChange={packageFormHandler}
                value={packageForm.from_address}
              />
            </div>
            <div class="col-md-6 mb-3">
              <label>To address</label>
              <input
                type="text"
                className={`form-control ${
                  isSubmited &&
                  packageForm?.to_address === "" &&
                  "border border-2 border-danger"
                }`}
                placeholder="Receiver Address"
                name="to_address"
                onChange={packageFormHandler}
                value={packageForm.to_address}
              />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-md-6 mb-3">
              <label>Weight</label>
              <input
                type="number"
                className={`form-control ${
                  isSubmited &&
                  packageForm?.weight === "" &&
                  "border border-2 border-danger"
                }`}
                placeholder="Weight (grams)"
                name="weight"
                onChange={packageFormHandler}
                value={packageForm.weight}
              />
            </div>
            <div class="col-md-6 mb-3">
              <label>Depth</label>
              <input
                type="number"
                className={`form-control ${
                  isSubmited &&
                  packageForm?.depth === "" &&
                  "border border-2 border-danger"
                }`}
                placeholder="Depth (cm)"
                name="depth"
                onChange={packageFormHandler}
                value={packageForm.depth}
              />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-md-6 mb-3">
              <label>Height</label>
              <input
                type="number"
                className={`form-control ${
                  isSubmited &&
                  packageForm?.height === "" &&
                  "border border-2 border-danger"
                }`}
                placeholder="Height (cm)"
                name="height"
                onChange={packageFormHandler}
                value={packageForm.height}
              />
            </div>
            <div class="col-md-6 mb-3">
              <label>Width</label>
              <input
                type="number"
                className={`form-control ${
                  isSubmited &&
                  packageForm?.width === "" &&
                  "border border-2 border-danger"
                }`}
                placeholder="Width (cm)"
                name="width"
                onChange={packageFormHandler}
                value={packageForm.width}
              />
            </div>
          </div>

          <label>Description</label>
          <textarea
            name="description"
            onChange={packageFormHandler}
            value={packageForm.description}
            columns="3"
            rows={4}
            className={`form-control col-md-12 ${
              isSubmited &&
              packageForm?.description === "" &&
              "border border-2 border-danger"
            }`}
            placeholder="Description"
          ></textarea>
        </form>
        <Button bg="#6AA74F" onClick={onSubmit} class="btn ml-4 btn-success">
          Submit
        </Button>
      </AdminContainer>
    </MainContainer>
  );
}
