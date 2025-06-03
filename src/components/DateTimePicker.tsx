import { COLORS } from "@/constants/Theme";
import { getStringDate } from "@/utils/formatter";
import CommunityDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type DateTimePickerProps = React.ComponentProps<
  typeof CommunityDateTimePicker
> & {
  errorText?: string | boolean | undefined;
  displayValue: string;
  showPicker: () => void;
  hidePicker: () => void;
  isVisible: boolean;
  title?: string;
  onGetValue?: (value: string) => void;
};

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  errorText,
  displayValue,
  isVisible,
  showPicker,
  hidePicker,
  title,
  onGetValue,
  ...props
}) => {
  const onChangePicker = (event: DateTimePickerEvent, date?: Date): void => {
    if (props.onChange) {
      props.onChange(event, date);
    }

    let formatDate = "";

    if (date && event.type === "set") {
      formatDate = getStringDate(date);
    }

    hidePicker();
    if (onGetValue) {
      onGetValue(formatDate);
    }
  };

  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.container}
        onPress={showPicker}
        testID={props.testID}
      >
        <View
          style={[
            styles.dateContainer,
            { borderColor: errorText ? COLORS.error : COLORS.gray },
          ]}
        >
          <Text style={styles.text}>{displayValue}</Text>
        </View>
      </TouchableOpacity>
      {isVisible && (
        <CommunityDateTimePicker
          testID={props.testID ? `${props.testID}-inner` : "date-picker"}
          {...props}
          onChange={onChangePicker}
        />
      )}
      {errorText && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  dateContainer: {
    width: "100%",
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
    height: 52,
    alignItems: "center",
    paddingStart: 10,
  },
  errorContainer: {
    marginVertical: 4,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
  },
  text: {
    fontFamily: "regular",
    fontSize: 14,
    color: COLORS.black,
  },
  title: {
    color: COLORS.black,
    fontFamily: "bold",
    fontSize: 14,
  },
});

export default DateTimePicker;
