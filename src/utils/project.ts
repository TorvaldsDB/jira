import { useHttp } from "utils/http";
import { cleanObject } from "./index";
import { Project } from "./../screens/ProjectList/List";
import { useAsync } from "./use-async";
import { useMutation, useQuery, useQueryClient } from "react-query";

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

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: cleanObject(param || {}) })
  );
};

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

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client("projects", {
        method: "POST",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

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

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};
