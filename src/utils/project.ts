import { useHttp } from "utils/http";
import { cleanObject } from "./index";
import { useEffect } from "react";
import { Project } from "./../screens/ProjectList/List";
import { useAsync } from "./use-async";

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
  }, [param]);

  return result;
};
