import { COLORS } from "@/constants/Theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  onClick?: () => void;
  showIcon?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onClick, showIcon }) => {
  const navigation = useNavigation<NavigationProp<any>>();

  const handleClick = (): void => {
    if (onClick) {
      onClick();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {showIcon && (
        <TouchableOpacity onPress={handleClick}>
          <View style={styles.backIcon}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </View>
        </TouchableOpacity>
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>BANCO</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  backIcon: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontFamily: "bold",
    color: COLORS.secondary,
    textAlign: "center",
  },
});

export default Header;
