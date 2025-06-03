import { COLORS } from "@/constants/Theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, Text, View } from "react-native";

interface ErrorBoxProps {
  message: string;
}

const ErrorBox: React.FC<ErrorBoxProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <FontAwesome name="warning" size={20} color={COLORS.error} />
      <Text style={styles.error}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: COLORS.warning,
    borderColor: COLORS.gray,
  },
  error: {
    fontSize: 12,
    fontFamily: "bold",
    color: COLORS.black,
  },
});

export default ErrorBox;
