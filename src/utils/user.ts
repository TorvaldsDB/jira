import { cleanObject } from "./index";
import { useAsync } from "./use-async";
import { User } from "screens/ProjectList/SearchPanel";
import { useEffect } from "react";
import { useHttp } from "utils/http";

export const useUsers = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();

  const client = useHttp();

  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
  }, [param]);

  return result;
};
