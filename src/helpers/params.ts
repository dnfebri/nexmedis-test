import { ReadonlyURLSearchParams } from "next/navigation";
import { useCallback } from "react";

export const ParamsCreateQuery = (searchParams: ReadonlyURLSearchParams) => {
  return useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.get(name) && params.delete(name);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
};

export const ParamsDeleteQueryString = (
  searchParams: ReadonlyURLSearchParams
) => {
  return useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);

      return params.toString();
    },
    [searchParams]
  );
};
