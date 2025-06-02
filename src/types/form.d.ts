export interface FormState<TValues, TValidities> {
  inputValues: TValues;
  inputValidities: TValidities;
  formIsValid: boolean;
}

export type FormAction<TValues> = {
  inputId: keyof TValues;
  inputValue: string | undefined;
  validationResult: string | undefined;
};
