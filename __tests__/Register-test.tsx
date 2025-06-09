import { getProductById } from "@/api/products";
import Register from "@/app/register";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react-native";

const queryClient: QueryClient = new QueryClient();
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
    id: "",
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
  });

  afterEach(() => {
    cleanup();
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
    (getProductById as jest.Mock).mockResolvedValue(null);
    const { getByText } = render(renderRegister());
    await waitFor(() => {
      expect(getByText("BANCO")).toBeTruthy();
      expect(getByText("screen.registrationForm")).toBeTruthy();
      expect(getByText("button.send")).toBeTruthy();
      expect(getByText("button.restart")).toBeTruthy();
    });
  });

  test("shows all the input fields", async () => {
    (getProductById as jest.Mock).mockResolvedValue(null);
    const { getByPlaceholderText, getAllByText } = render(renderRegister());
    await waitFor(() => {
      expect(getByPlaceholderText("fields.id")).toBeTruthy();
      expect(getByPlaceholderText("fields.name")).toBeTruthy();
      expect(getByPlaceholderText("fields.description")).toBeTruthy();
      expect(getByPlaceholderText("fields.logo")).toBeTruthy();
      expect(getAllByText("fields.date_release")).toBeTruthy();
      expect(getAllByText("fields.date_revision")).toBeTruthy();
    });
  });

  test("clears form fields when pressing restart", async () => {
    (getProductById as jest.Mock).mockResolvedValue(null);
    const { getByPlaceholderText, getByText } = render(renderRegister());
    await waitFor(() => {
      const nameInput = getByPlaceholderText("fields.name");
      fireEvent.changeText(nameInput, "Test");
      fireEvent.press(getByText("button.restart"));
      expect(nameInput.props.value).toBe("");
    });
  });

  test("shows error when data is not entered", async () => {
    (getProductById as jest.Mock).mockResolvedValue(null);
    const { getByPlaceholderText, getByText, getAllByText, findByTestId } =
      render(renderRegister());
    await waitFor(async () => {
      fireEvent.changeText(getByPlaceholderText("fields.id"), null);
      fireEvent.changeText(getByPlaceholderText("fields.name"), null);
      fireEvent.changeText(getByPlaceholderText("fields.description"), null);
      fireEvent.changeText(getByPlaceholderText("fields.logo"), null);

      fireEvent.press(getAllByText("fields.date_release")[1]);
      const dateReleasePicker = await findByTestId("date-picker");
      fireEvent(dateReleasePicker, "onChange", { type: "set" }, null);

      fireEvent.press(getAllByText("fields.date_revision")[1]);
      const dateExpirePicker = await findByTestId("date-picker");
      fireEvent(dateExpirePicker, "onChange", { type: "set" }, null);

      expect(getByText("fields.id validation.required")).toBeVisible();
      expect(getByText("fields.name validation.required")).toBeVisible();
      expect(getByText("fields.description validation.required")).toBeVisible();
      expect(getByText("fields.logo validation.required")).toBeVisible();
      expect(
        getByText("fields.date_release validation.required"),
      ).toBeVisible();
      expect(
        getByText("fields.date_revision validation.required"),
      ).toBeVisible();
    });
  });
});
