import { COLORS } from "@/constants/Theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ListItemProps {
  name: string;
  id: string;
  isLast?: boolean;
}

const ListItem: React.FC<ListItemProps> = ({ name, id, isLast }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.container, isLast && styles.lastItem]}
      onPress={() => router.push(`/details/${id}`)}
    >
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.id}>ID: {id}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray,
    borderEndWidth: 1,
    borderEndColor: COLORS.gray,
    borderStartWidth: 1,
    borderStartColor: COLORS.gray,
  },
  lastItem: {
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: "bold",
    color: COLORS.black,
  },
  id: {
    fontSize: 14,
    fontFamily: "regular",
    color: "#6e6e73",
  },
});

export default ListItem;
