/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect } from "react";
import { memo } from "react";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFndWV5ZSIsImEiOiJjbGY1OTVncTcxYWl5M3dzOXoydXU0dDJ0In0.wh6Khoqi7F_VLWCHJ8ADPQ";

const TrackerMap = ({ packageDetails, deliveryDetails }) => {
  useEffect(() => {
    navigator?.geolocation.getCurrentPosition((position) => {
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: [
          packageDetails?.to_location?.lng || position?.coords?.longitude,
          packageDetails?.to_location?.lat || position?.coords?.latitude,
        ],
        zoom: 11.5,
      });

      if (deliveryDetails) {
        map?.on("load", () => {
          map.addSource("route", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [
                  [
                    packageDetails?.from_location?.lng,
                    packageDetails?.from_location?.lat,
                  ],
                  [
                    deliveryDetails?.location?.lng ||
                      packageDetails?.to_location?.lng,
                    deliveryDetails?.location?.lat ||
                      packageDetails?.to_location?.lat,
                  ],
                ],
              },
            },
          });

          packageDetails &&
            map.addLayer({
              id: "route",
              type: "line",
              source: "route",
              layout: {
                "line-join": "round",
                "line-cap": "round",
              },
              paint: {
                "line-color": "#E06666",
                "line-width": 2.5,
              },
            });

          new mapboxgl.Marker({ color: "#6AA64F", draggable: false })
            ?.setLngLat([
              packageDetails?.from_location?.lng,
              packageDetails?.from_location?.lat,
            ])
            ?.addTo(map);

          new mapboxgl.Marker({ color: "#FF9900", draggable: false })
            ?.setLngLat([
              deliveryDetails?.location?.lng ||
                packageDetails?.to_location?.lng,
              deliveryDetails?.location?.lat ||
                packageDetails?.to_location?.lat,
            ])
            ?.addTo(map);
        });
      }
    });
  }, [deliveryDetails]);

  return <div id="map"></div>;
};

export default memo(TrackerMap);
