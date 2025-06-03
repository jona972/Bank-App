import Register from "@/app/register";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, waitFor } from "@testing-library/react-native";

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
}));

jest.mock("@/api/products", () => ({
  saveProduct: jest.fn(),
  updateProduct: jest.fn(),
  getProductById: jest.fn(),
}));

describe("<Register />", () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        result: { success: true },
      }),
    });
  });

  afterEach(() => {
    queryClient.clear();
    queryClient.cancelQueries();
  });

  const renderRegister = () => (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Register />
      </NavigationContainer>
    </QueryClientProvider>
  );

  test("renders the component without any errors", async () => {
    const { getByText } = render(renderRegister());
    await waitFor(() => {
      expect(getByText("BANCO")).toBeTruthy();
      expect(getByText("screen.registrationForm")).toBeTruthy();
      expect(getByText("button.send")).toBeTruthy();
      expect(getByText("button.restart")).toBeTruthy();
    });
  });

  test("shows all the input fields", async () => {
    const { getByPlaceholderText } = render(renderRegister());
    await waitFor(() => {
      expect(getByPlaceholderText("fields.id")).toBeTruthy();
      expect(getByPlaceholderText("fields.name")).toBeTruthy();
      expect(getByPlaceholderText("fields.description")).toBeTruthy();
      expect(getByPlaceholderText("fields.logo")).toBeTruthy();
    });
  });

  test("clears form fields when pressing restart", async () => {
    const { getByPlaceholderText, getByText } = render(renderRegister());
    await waitFor(() => {
      const nameInput = getByPlaceholderText("fields.name");
      fireEvent.changeText(nameInput, "Test");
      fireEvent.press(getByText("button.restart"));
      expect(nameInput.props.value).toBe("");
    });
  });

  test("shows error when data is not entered", async () => {
    const { getByPlaceholderText, getByText } = render(renderRegister());
    await waitFor(() => {
      fireEvent.changeText(getByPlaceholderText("fields.name"), null);
      fireEvent.changeText(getByPlaceholderText("fields.description"), null);
      fireEvent.changeText(getByPlaceholderText("fields.logo"), null);
      expect(getByText("fields.name validation.required")).toBeVisible();
      expect(getByText("fields.description validation.required")).toBeVisible();
      expect(getByText("fields.logo validation.required")).toBeVisible();
    });
  });
});
