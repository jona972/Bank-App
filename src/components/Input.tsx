import { COLORS } from "@/constants/Theme";
import React, { FC, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface InputProps extends TextInputProps {
  id: string;
  title?: string;
  errorText?: string | boolean | undefined;
  onInputChanged: (id: string, text: string) => void;
}

const Input: FC<InputProps> = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const onChangeText = (text: string) => {
    props.onInputChanged(props.id, text);
  };

  return (
    <View style={styles.container}>
      {props.title && <Text style={styles.title}>{props.title}</Text>}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: props.errorText
              ? COLORS.error
              : isFocused
                ? COLORS.secondary
                : COLORS.gray,
          },
        ]}
      >
        <TextInput
          {...props}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={styles.input}
          placeholder={props.placeholder}
          placeholderTextColor={props.placeholderTextColor}
          autoCapitalize={props?.autoCapitalize || "none"}
        />
      </View>
      {props.errorText && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 5,
    flexDirection: "row",
    height: 52,
    alignItems: "center",
    borderColor: COLORS.gray,
    paddingStart: 10,
  },
  input: {
    color: COLORS.black,
    flex: 1,
    fontFamily: "regular",
    fontSize: 14,
  },
  errorContainer: {
    marginVertical: 4,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
  },
  title: {
    color: COLORS.black,
    fontFamily: "bold",
    fontSize: 14,
  },
});

export default Input;
