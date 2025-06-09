import { getProducts } from "@/api/products";
import Home from "@/app/index";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react-native";

const queryClient = new QueryClient();
const mockedNavigate = jest.fn();

jest.mock("expo-router", () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
}));

jest.mock("@/api/products", () => ({
  getProducts: jest.fn(),
}));

const products = [
  {
    id: "uno",
    name: "Nombre producto uno",
    description: "Descripción producto",
    logo: "assets-1.png",
    date_release: "2025-01-01",
    date_revision: "2025-01-01",
  },
  {
    id: "dos",
    name: "Nombre producto dos",
    description: "Descripción producto dos",
    logo: "assets-2.png",
    date_release: "2025-01-01",
    date_revision: "2025-01-01",
  },
];

describe("<Home />", () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  afterEach(() => {
    cleanup();
    queryClient.clear();
    queryClient.cancelQueries();
  });

  const renderHome = () => (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Home />
      </NavigationContainer>
    </QueryClientProvider>
  );

  test("renders the component without any errors", async () => {
    (getProducts as jest.Mock).mockResolvedValue(products);
    const { getByText } = render(renderHome());
    await waitFor(() => {
      expect(getByText("BANCO")).toBeTruthy();
      expect(getByText("screen.noProducts")).toBeTruthy();
      expect(getByText("button.add")).toBeTruthy();
      expect(getByText("button.add")).toBeTruthy();
    });
  });

  test("should render a list of products", async () => {
    (getProducts as jest.Mock).mockResolvedValue(products);
    const { getByText } = render(renderHome());
    await waitFor(() => {
      expect(getByText("Nombre producto uno")).toBeTruthy();
      expect(getByText("Nombre producto dos")).toBeTruthy();
    });
  });

  test("should render empty message when no products are available", async () => {
    (getProducts as jest.Mock).mockResolvedValue([]);
    const { findByText } = render(renderHome());
    expect(await findByText("screen.noProducts")).toBeTruthy();
  });

  test("should filter the product list based on the search term", async () => {
    (getProducts as jest.Mock).mockResolvedValue(products);
    const { getByPlaceholderText, findByText, queryByText } =
      render(renderHome());
    const input = getByPlaceholderText("fields.search");
    await findByText("Nombre producto uno");
    fireEvent.changeText(input, "uno");
    expect(await findByText("Nombre producto uno")).toBeTruthy();
    expect(queryByText("dos")).toBeNull();
  });

  test("allow navigation to the Add Product", async () => {
    (getProducts as jest.Mock).mockResolvedValue(products);
    const { getByText } = render(renderHome());
    await waitFor(() => {
      fireEvent.press(getByText("button.add"));
      expect(mockedNavigate).toHaveBeenCalledTimes(1);
      expect(mockedNavigate).toHaveBeenCalledWith("register");
    });
  });
});
