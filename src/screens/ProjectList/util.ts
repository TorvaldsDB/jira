import { useUrlQueryParam } from "utils/url";
import { useCallback, useMemo, useState } from "react";
export const useProjectsSearchParams = () => {
  const [keys] = useState<("name" | "personId")[]>(["name", "personId"]);
  const [param, setParam] = useUrlQueryParam(keys);
  return [
    useMemo(
      () => ({
        ...param,
        personId: Number(param.personId) || undefined,
      }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const open = useCallback(
    () => setProjectCreate({ projectCreate: true }),
    [setProjectCreate]
  );
  const close = useCallback(
    () => setProjectCreate({ projectCreate: undefined }),
    [setProjectCreate]
  );

  return {
    projectModalOpen: projectCreate === "true",
    open,
    close,
  };
};
