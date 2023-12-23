import { fetchBaseQuery } from "@reduxjs/toolkit/query";

interface IParsedAuthenticatedUserObject {
  id: string;
  userCompanyId: string;
  accessToken: string;
}

const authenticatedUserObject = localStorage.getItem(
  "authenticatedUserObject"
);

export const parsedAuthenticatedUserObject: IParsedAuthenticatedUserObject =
  authenticatedUserObject !== null
    ? JSON.parse(authenticatedUserObject)
    : null;

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_PMS_BACKEND_BASEURL,
  prepareHeaders: (headers, { getState }) => {
    const authenticatedUserObject = localStorage.getItem(
      "authenticatedUserObject"
    );

    const parsedAuthenticatedUserObject: IParsedAuthenticatedUserObject =
      authenticatedUserObject !== null
        ? JSON.parse(authenticatedUserObject)
        : null;

    if (
      authenticatedUserObject !== null &&
      parsedAuthenticatedUserObject.accessToken
    ) {
      headers.set(
        "Authorization",
        `Bearer ${parsedAuthenticatedUserObject.accessToken}`
      );
    }
    return headers;
  },
});
