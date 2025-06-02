import { COLORS } from "@/constants/Theme";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type EmptyDataProps = {
  message: string;
};

const EmptyData: React.FC<EmptyDataProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="inbox" size={80} color={COLORS.secondary} />
      <Text style={styles.title}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.info,
  },
  title: {
    fontSize: 22,
    fontFamily: "bold",
    color: COLORS.secondary,
  },
});

export default EmptyData;
