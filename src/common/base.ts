import fetch from "node-fetch";
import { apiUrl } from "./constants";

export namespace Base {
  let token = "";

  export const setToken = (value: string) => {
    token = value;
  };

  export const post = async (
    endpoint: string,
    body?: Record<string, unknown>
  ) => {
    const res = await fetch(`${apiUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...body,
        token: { Token: token },
      }),
    });

    return res.json();
  };
}

export const base = Base;
