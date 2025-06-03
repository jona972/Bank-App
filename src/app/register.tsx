import { getProductById, saveProduct, updateProduct } from "@/api/products";
import Button from "@/components/Button";
import DateTimePicker from "@/components/DateTimePicker";
import ErrorBox from "@/components/ErrorBox";
import Header from "@/components/Header";
import Input from "@/components/Input";
import { COLORS } from "@/constants/Theme";
import { productFormState } from "@/data/product";
import useFormState from "@/hooks/useFormState";
import { Product, ProductValidities } from "@/types/product";
import { formatInitialValues } from "@/utils/formHelper";
import { getProductConstraints } from "@/utils/validation/constraints/product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const Register = () => {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const [error, setError] = useState<string>("");
  const { data: product } = useQuery({
    queryKey: ["productById", id],
    queryFn: () => getProductById(id as string),
    enabled: !!id,
  });
  const { formState, inputChangedHandler } = useFormState<
    Product,
    ProductValidities
  >(formatInitialValues(product, productFormState), getProductConstraints(t));
  const [datePicker, setDatePicker] = useState({
    release: false,
    revision: false,
  });
  const saveMutation = useMutation({
    mutationFn: saveProduct,
    onError: (error) => setError(String(error)),
  });
  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onError: (error) => setError(String(error)),
  });

  const handleSubmit = () => {
    if (!formState.formIsValid) return;
    if (id) {
      updateMutation.mutate(formState.inputValues);
    } else {
      saveMutation.mutate(formState.inputValues);
    }
  };

  const handleRestart = () => {
    Object.keys(formState.inputValues).forEach((key) => {
      if (id && key === "id") {
        return;
      }
      inputChangedHandler(key, "", false);
    });
  };

  return (
    <SafeAreaView style={styles.area}>
      <Header showIcon />
      <View style={styles.container}>
        <Text style={styles.title}>{t("screen.registrationForm")}</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.formContainer}>
            <Input
              id="id"
              placeholder={t("fields.id")}
              title={t("fields.id")}
              maxLength={10}
              editable={!id}
              value={formState.inputValues.id}
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities.id}
            />
            <Input
              id="name"
              autoCapitalize="words"
              placeholder={t("fields.name")}
              title={t("fields.name")}
              maxLength={100}
              value={formState.inputValues.name}
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities.name}
            />
            <Input
              id="description"
              placeholder={t("fields.description")}
              title={t("fields.description")}
              maxLength={200}
              value={formState.inputValues.description}
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities.description}
            />
            <Input
              id="logo"
              placeholder={t("fields.logo")}
              title={t("fields.logo")}
              onInputChanged={inputChangedHandler}
              value={formState.inputValues.logo}
              errorText={formState.inputValidities.logo}
            />
            <DateTimePicker
              value={new Date(formState.inputValues.date_release || new Date())}
              mode="date"
              is24Hour={true}
              display="default"
              minimumDate={new Date()}
              onGetValue={(value) => inputChangedHandler("date_release", value)}
              isVisible={datePicker.release}
              showPicker={() =>
                setDatePicker((prev) => ({ ...prev, release: true }))
              }
              hidePicker={() =>
                setDatePicker((prev) => ({ ...prev, release: false }))
              }
              errorText={formState.inputValidities.date_release}
              title={t("fields.date_release")}
              testID="date-picker-release"
              displayValue={
                formState.inputValues.date_release || t("fields.date_release")
              }
            />
            <DateTimePicker
              value={
                new Date(formState.inputValues.date_revision || new Date())
              }
              mode="date"
              is24Hour={true}
              display="default"
              minimumDate={new Date()}
              onGetValue={(value) =>
                inputChangedHandler("date_revision", value)
              }
              isVisible={datePicker.revision}
              showPicker={() =>
                setDatePicker((prev) => ({ ...prev, revision: true }))
              }
              hidePicker={() =>
                setDatePicker((prev) => ({ ...prev, revision: false }))
              }
              errorText={formState.inputValidities.date_revision}
              title={t("fields.date_revision")}
              testID="date-picker-revision"
              displayValue={
                formState.inputValues.date_revision || t("fields.date_revision")
              }
            />
          </View>
          {error && <ErrorBox message={error} />}
        </ScrollView>
        <View style={styles.fixedButton}>
          <Button
            title={t("button.send")}
            filled
            isLoading={saveMutation.isPending || updateMutation.isPending}
            disabled={
              !formState.formIsValid ||
              saveMutation.isPending ||
              updateMutation.isPending
            }
            onPress={handleSubmit}
          />
          <Button
            title={t("button.restart")}
            filled
            color={COLORS.info}
            onPress={handleRestart}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingStart: 20,
    paddingEnd: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: "bold",
    color: COLORS.black,
  },
  fixedButton: {
    gap: 10,
    paddingBottom: 40,
  },
  formContainer: {
    paddingTop: 10,
    gap: 10,
    paddingBottom: 10,
  },
});

export default Register;
