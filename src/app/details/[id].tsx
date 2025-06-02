import { deleteProduct, getProductById } from "@/api/products";
import Button from "@/components/Button";
import ConfirmDelete from "@/components/ConfirmDelete";
import Header from "@/components/Header";
import { COLORS } from "@/constants/Theme";
import { getValidImage } from "@/utils/formHelper";
import { NavigationProp } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Details = () => {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const deleteRef = useRef<any>(null);
  const { data, refetch } = useQuery({
    queryKey: ["productById", id],
    queryFn: () => getProductById(id as string),
    enabled: !!id,
  });
  const { goBack, navigate } = useNavigation<NavigationProp<any>>();
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteProduct(id as string),
    onSuccess: () => {
      deleteRef?.current.close();
      goBack();
    },
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return (
    <SafeAreaView style={styles.area}>
      <Header showIcon />
      <View style={styles.container}>
        <Text style={styles.title}>{`${t("fields.id")}: ${id}`}</Text>
        <Text style={styles.subTitle}>{t("screen.extraInformation")}</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.containerInformation}>
            <View style={styles.information}>
              <Text style={styles.subTitle}>{t("fields.name")}</Text>
              <Text style={styles.textData}>{data?.name}</Text>
            </View>
            <View style={styles.information}>
              <Text style={styles.subTitle}>{t("fields.description")}</Text>
              <Text style={styles.textData}>{data?.description}</Text>
            </View>
            <View style={styles.information}>
              <Text style={styles.subTitle}>{t("fields.logo")}</Text>
            </View>
            <View style={styles.containerLogo}>
              <Image source={getValidImage(data?.logo)} style={styles.logo} />
            </View>
            <View style={styles.information}>
              <Text style={styles.subTitle}>{t("fields.date_release")}</Text>
              <Text style={styles.textData}>{data?.date_release}</Text>
            </View>
            <View style={styles.information}>
              <Text style={styles.subTitle}>{t("fields.date_revision")}</Text>
              <Text style={styles.textData}>{data?.date_revision}</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.fixedButton}>
          <Button
            title={t("button.edit")}
            filled
            color={COLORS.info}
            onPress={() => navigate("register", { id })}
          />
          <Button
            title={t("button.delete")}
            filled
            color={COLORS.error}
            textColor={COLORS.white}
            onPress={() => deleteRef.current?.open()}
          />
        </View>
      </View>
      <ConfirmDelete
        ref={deleteRef}
        isLoading={isPending}
        disabled={isPending}
        onConfirm={() => mutate()}
        product={data?.name}
      />
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
    paddingTop: 50,
    paddingStart: 20,
    paddingEnd: 20,
  },
  containerInformation: {
    gap: 20,
    paddingTop: 50,
  },
  containerLogo: {
    alignItems: "center",
  },
  fixedButton: {
    gap: 10,
    paddingBottom: 40,
  },
  information: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingStart: 20,
    paddingEnd: 20,
  },
  logo: {
    width: 300,
    height: 200,
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontFamily: "bold",
    color: COLORS.black,
  },
  subTitle: {
    fontSize: 15,
    fontFamily: "regular",
    color: COLORS.black,
  },
  textData: {
    fontSize: 15,
    fontFamily: "bold",
    color: COLORS.black,
  },
});

export default Details;
