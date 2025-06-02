import { getProducts } from "@/api/products";
import Button from "@/components/Button";
import EmptyData from "@/components/EmptyData";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ListItem from "@/components/ListItem";
import { COLORS } from "@/constants/Theme";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProp<any>>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const filteredData = useMemo(() => {
    if (!searchTerm || !data) return data;
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [data, searchTerm]);

  return (
    <SafeAreaView style={styles.area}>
      <Header />
      <View style={styles.container}>
        <Input
          id="search"
          onInputChanged={(id, value) => setSearchTerm(value)}
          placeholder={t("fields.search")}
        />
        <FlatList
          contentContainerStyle={styles.listItem}
          data={filteredData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <ListItem
              name={item.name}
              id={item.id}
              isLast={filteredData ? index === filteredData.length - 1 : false}
            />
          )}
          ListEmptyComponent={<EmptyData message={t("screen.noProducts")} />}
        />
        <View style={styles.fixedButton}>
          <Button
            title={t("button.add")}
            filled
            disabled={isLoading}
            onPress={() => navigate("register")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

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
  listItem: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  fixedButton: {
    paddingBottom: 40,
  },
});
