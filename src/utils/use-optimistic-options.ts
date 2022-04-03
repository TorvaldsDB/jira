import { QueryKey, useQueryClient } from "react-query";

export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, olds?: any[]) => any[]
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    // --------------------------------------------
    // 乐观更新
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (olds?: any[]) => {
        return callback(target, olds);
      });
      return previousItems;
    },
    onError: (error: any, newItem: any, context: any) => {
      queryClient.setQueryData(
        queryKey,
        (context as { previousItems: any[] }).previousItems
      );
    },
    // --------------------------------------------
  };
};

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target: any, olds) => olds?.filter((item) => item.id !== target.id) || []
  );
export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target: any, olds) =>
      olds?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  );
export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target: any, olds) => (olds ? [...olds, target] : []));
