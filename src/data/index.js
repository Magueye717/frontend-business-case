export const packageColumns = [
  "Description",
  "Weight",
  "Width",
  "Height",
  "Depth",
  "From Name",
  "To Address",
  "To Name",
  "To Address",
];

export const deliveryColumns = [
  "Pickup time",
  "Start Time",
  "End time",
  "Status",
];

export const status = [
  "open",
  "picked-up",
  "in-transit",
  "delivered",
  " failed",
];

export const packageInputs = {
  description: "",
  weight: "",
  width: "",
  height: "",
  depth: "",
  from_name: "",
  from_address: "",
  from_location: "",
  to_name: "",
  to_address: "",
  to_location: "",
};

export const deliveryInputs = {
  start_time: "",
  end_time: "",
  pickup_time: "",
  package_id: "",
};

export const formValidator = (form) => {
  return Object.keys(form).every(function (k) {
    return form[k] !== "";
  });
};
