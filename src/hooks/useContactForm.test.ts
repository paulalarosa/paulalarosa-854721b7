import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useContactForm } from "./useContactForm";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: () => new Promise(() => {}) },
  }),
}));

const toastMock = vi.fn();
vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: (args: unknown) => toastMock(args) }),
}));

const executeRecaptchaMock = vi.fn();
const verifyRecaptchaTokenMock = vi.fn();
vi.mock("@/services/recaptcha", () => ({
  executeRecaptcha: () => executeRecaptchaMock(),
  verifyRecaptchaToken: (token: string) => verifyRecaptchaTokenMock(token),
}));

const recaptchaReadyRef = { current: true };
vi.mock("@/hooks/useRecaptcha", () => ({
  useRecaptcha: () => ({ isReady: recaptchaReadyRef.current }),
}));

const submitEvent = () => ({ preventDefault: vi.fn() }) as unknown as React.FormEvent;

describe("useContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    recaptchaReadyRef.current = true;
    window.open = vi.fn();
  });

  it("rejects submission with empty fields", async () => {
    const { result } = renderHook(() => useContactForm());

    await act(async () => {
      await result.current.handleSubmit(submitEvent());
    });

    expect(executeRecaptchaMock).not.toHaveBeenCalled();
    expect(toastMock).toHaveBeenCalled();
  });

  it("does not submit when recaptcha is not ready", async () => {
    recaptchaReadyRef.current = false;
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "Paula" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: "email", value: "paula@example.com" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: "message", value: "Hello, this is a long enough message." },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });

    await act(async () => {
      await result.current.handleSubmit(submitEvent());
    });

    expect(executeRecaptchaMock).not.toHaveBeenCalled();
  });

  it("happy path: validates, verifies recaptcha, opens WhatsApp and flips isSubmitted", async () => {
    executeRecaptchaMock.mockResolvedValueOnce("token-abc");
    verifyRecaptchaTokenMock.mockResolvedValueOnce({ success: true });

    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "Paula" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: "email", value: "paula@example.com" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: "message", value: "Hello, this is a long enough message." },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });

    await act(async () => {
      await result.current.handleSubmit(submitEvent());
    });

    await waitFor(() => expect(result.current.isSubmitted).toBe(true));
    expect(verifyRecaptchaTokenMock).toHaveBeenCalledWith("token-abc");

    await waitFor(() => expect(window.open).toHaveBeenCalled(), { timeout: 2000 });
    const calledUrl = (window.open as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(calledUrl).toContain("https://wa.me/");
  });
});
