import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useHttp } from "utils/http";
import { Project } from "./../screens/ProjectList/List";
import { cleanObject } from "./index";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: cleanObject(param || {}) })
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client("projects", {
        method: "POST",
        data: params,
      }),
    useAddConfig(queryKey)
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id,
    }
  );
};

// export const useProjects = (param?: Partial<Project>) => {
//   const client = useHttp();
//   const { run, ...result } = useAsync<Project[]>();

//   const fetchProjects = useCallback(
//     () => client("projects", { data: cleanObject(param || {}) }),
//     [client, param]
//   );
//   useEffect(() => {
//     run(fetchProjects(), {
//       retry: fetchProjects,
//     });
//   }, [fetchProjects, param, run]);

//   return result;
// };

// export const useAddProject = () => {
//   const { run, ...asyncResult } = useAsync();
//   const client = useHttp();

//   const mutate = (params: Partial<Project>) => {
//     return run(
//       client(`projects`, {
//         data: params,
//         method: "POST",
//       })
//     );
//   };

//   return {
//     mutate,
//     ...asyncResult,
//   };
// };

// export const useEditProject = () => {
//   const { run, ...asyncResult } = useAsync();
//   const client = useHttp();

//   const mutate = (params: Partial<Project>) => {
//     return run(
//       client(`projects/${params.id}`, {
//         data: params,
//         method: "PATCH",
//       })
//     );
//   };

//   return {
//     mutate,
//     ...asyncResult,
//   };
// };
