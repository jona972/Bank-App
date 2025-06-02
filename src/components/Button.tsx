import { COLORS } from "@/constants/Theme";
import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  color?: string;
  textColor?: string;
  filled?: boolean;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    title,
    color,
    textColor,
    filled = false,
    isLoading = false,
    disabled = false,
    style,
    onPress,
    ...rest
  } = props;
  const filledBgColor = color || COLORS.primary;
  const outlinedBgColor = COLORS.white;
  const bgColor = filled ? filledBgColor : outlinedBgColor;
  const opacity = disabled ? 0.6 : 1;
  const pointerEvents = disabled ? "none" : "auto";

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: bgColor,
          opacity,
          pointerEvents,
          borderColor: bgColor,
        },
        style,
      ]}
      onPress={onPress}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={COLORS.white} />
      ) : (
        <Text style={[styles.text, { color: textColor || COLORS.secondary }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 52,
  },
  text: {
    fontSize: 15,
    fontFamily: "bold",
  },
});

export default Button;
