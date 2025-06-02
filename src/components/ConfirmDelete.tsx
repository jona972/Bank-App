import { COLORS } from "@/constants/Theme";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import Button from "./Button";

interface ConfirmDeleteProps {
  ref: React.RefObject<any>;
  product: string | undefined;
  isLoading: boolean;
  disabled: boolean;
  onConfirm: () => void;
}

const ConfirmDelete = ({
  ref,
  isLoading,
  disabled,
  product,
  onConfirm,
}: ConfirmDeleteProps) => {
  const { t } = useTranslation();

  return (
    <RBSheet
      ref={ref}
      useNativeDriver
      closeOnPressMask={true}
      height={240}
      customStyles={{
        wrapper: {
          backgroundColor: "rgba(0,0,0,0.5)",
        },
        draggableIcon: {
          backgroundColor: COLORS.black,
          height: 4,
        },
        container: {
          borderTopRightRadius: 32,
          borderTopLeftRadius: 32,
          height: 240,
          backgroundColor: COLORS.white,
        },
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.separateLineTop} />
        <Text style={styles.bottomTitle}>
          {t("screen.confirmDelete", { name: product })}
        </Text>
        <View style={styles.separateLineBottom} />
      </ScrollView>
      <View style={styles.fixedButton}>
        <Button
          title={t("button.confirm")}
          filled
          onPress={onConfirm}
          isLoading={isLoading}
          disabled={disabled}
        />
        <Button
          title={t("button.cancel")}
          filled
          color={COLORS.info}
          onPress={() => ref.current.close()}
        />
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  bottomTitle: {
    fontSize: 20,
    fontFamily: "regular",
    color: COLORS.black,
    textAlign: "center",
    marginTop: 12,
  },
  fixedButton: {
    gap: 10,
    paddingStart: 20,
    paddingEnd: 20,
    paddingBottom: 5,
  },
  separateLineTop: {
    height: 1,
    backgroundColor: COLORS.gray,
    marginTop: 40,
  },
  separateLineBottom: {
    height: 1,
    backgroundColor: COLORS.gray,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default ConfirmDelete;
