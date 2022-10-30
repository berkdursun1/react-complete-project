import { useState, useEffect } from "react";
import { loaderService } from "@service";
import { plainToInstance } from "class-transformer";

export const useService = <T,>(
  promise: Promise<unknown>,
  classType: any,
  deps: unknown[] = []
) => {
  const [data, setData] = useState<T>();
  const [counter, setCounter] = useState(0);
  const trigger = () => setCounter((current) => current + 1);

  useEffect(() => {
    loaderService.increaseLoader();
    promise
      .then((data: any) => {
        setData(data.data);
      })
      .finally(() => loaderService.decreaseLoader());
  }, [counter, ...deps]);

  return { data: plainToInstance(classType, data) as T, trigger };
};