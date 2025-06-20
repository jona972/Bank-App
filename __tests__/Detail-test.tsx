import { getProductById } from "@/api/products";
import Detail from "@/app/details/[id]";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react-native";

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
  useLocalSearchParams: () => ({
    id: "test-id",
  }),
  useFocusEffect: () => ({
    useCallback: jest.fn(),
  }),
}));

jest.mock("@/api/products", () => ({
  getProductById: jest.fn(),
}));

describe("<Detail />", () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  afterEach(() => {
    cleanup();
    queryClient.clear();
    queryClient.cancelQueries();
  });

  const renderDetail = () => (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Detail />
      </NavigationContainer>
    </QueryClientProvider>
  );

  test("renders the component without any errors", async () => {
    (getProductById as jest.Mock).mockResolvedValue({ id: "test-id" });
    const { getByText } = render(renderDetail());
    await waitFor(() => {
      expect(getByText("BANCO")).toBeTruthy();
      expect(getByText("screen.extraInformation")).toBeTruthy();
      expect(getByText("fields.id: test-id")).toBeTruthy();
      expect(getByText("fields.name")).toBeTruthy();
      expect(getByText("fields.description")).toBeTruthy();
      expect(getByText("fields.date_release")).toBeTruthy();
      expect(getByText("fields.date_revision")).toBeTruthy();
      expect(getByText("button.edit")).toBeTruthy();
      expect(getByText("button.delete")).toBeTruthy();
    });
  });

  test("allow navigation to the Edit Product", async () => {
    (getProductById as jest.Mock).mockResolvedValue({ id: "test-id" });
    const { getByText } = render(renderDetail());
    await waitFor(() => {
      fireEvent.press(getByText("button.edit"));
      expect(mockedNavigate).toHaveBeenCalledTimes(1);
      expect(mockedNavigate).toHaveBeenCalledWith("register", {
        id: "test-id",
      });
    });
  });
});
