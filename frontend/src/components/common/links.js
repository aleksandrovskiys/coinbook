import { APPLICATION_URLS } from "./constants";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export const APPLICATION_LINKS = {};

for (const key in APPLICATION_URLS) {
  APPLICATION_LINKS[key] = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to={APPLICATION_URLS[key]} {...props} role={undefined} />
  ));
}
