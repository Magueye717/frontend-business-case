import React from "react";
import { deliveryColumns, packageColumns } from "../data";
import { AcitonButton } from "./styles";

export default function Table({ data, isDelivery, onDelete, onEdit }) {
  return (
    <div className="">
      {!isDelivery && (
        <table class="table table-striped">
          <thead class="thead-light">
            <tr>
              {packageColumns.map((label) => (
                <th scope="col">{label}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr>
                <td>{item.description}</td>
                <td>{`${item.weight} grams`}</td>
                <td>{`${item.width} cm`}</td>
                <td>{`${item.height} cm`}</td>
                <td>{`${item.depth} cm`}</td>
                <td>{item.from_name}</td>
                <td>{item.from_address}</td>
                <td>{item.to_name}</td>
                <td>{item.to_address}</td>
                <td>
                  <AcitonButton onClick={() => onEdit(item?._id)} bg="green">
                    Edit
                  </AcitonButton>
                  <AcitonButton onClick={() => onDelete(item?._id)} bg="red">
                    Delete
                  </AcitonButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isDelivery && (
        <table class="table table-striped">
          <thead>
            <tr>
              {deliveryColumns.map((label) => (
                <th scope="col">{label}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr>
                <td>{item.pickup_time}</td>
                <td>{item.start_time}</td>
                <td>{item.end_time}</td>
                <td>{item.status}</td>
                <td>
                  <AcitonButton onClick={() => onEdit(item?._id)} bg="green">
                    Edit
                  </AcitonButton>
                  <AcitonButton onClick={() => onDelete(item?._id)} bg="red">
                    Delete
                  </AcitonButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
