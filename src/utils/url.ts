import { cleanObject } from "./index";
import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParam] = useSearchParams();
  const setSearchParam = useSetUrlSearchParam();

  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParam.get(key) || "" };
        }, {} as { [key in K]: string }),
      [searchParam, keys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParam(params);
    },
  ] as const;
};

export const useSetUrlSearchParam = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParam),
      ...params,
    }) as URLSearchParamsInit;

    return setSearchParam(o);
  };
};
