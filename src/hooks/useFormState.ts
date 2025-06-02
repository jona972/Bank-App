import { Constraints } from "@/types/contraints";
import { FormAction, FormState } from "@/types/form";
import { validateData } from "@/utils/validation";
import { reducer } from "@/utils/validation/reducer";
import { useCallback, useReducer } from "react";
import { useTranslation } from "react-i18next";

function useFormState<
  TValues extends Record<string, any>,
  TValidities extends Partial<Record<keyof TValues, boolean | undefined>>,
>(initialState: FormState<TValues, TValidities>, contraints: Constraints) {
  const { t } = useTranslation();
  const [formState, dispatchFormState] = useReducer(
    reducer as React.Reducer<
      FormState<TValues, TValidities>,
      FormAction<TValues>
    >,
    initialState,
  );

  const inputChangedHandler = useCallback(
    (inputId: string, inputValue: string, shouldValidate: boolean = true) => {
      const result = shouldValidate
        ? validateData(inputId, inputValue, t, contraints)
        : "";
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState],
  );

  return { formState, inputChangedHandler, dispatchFormState, contraints };
}

export default useFormState;
