import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useNewsletterSubscription } from "./useNewsletterSubscription";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: () => new Promise(() => {}) },
  }),
}));

const subscribeToNewsletterMock = vi.fn();
vi.mock("@/services/newsletter", () => ({
  subscribeToNewsletter: (email: string) => subscribeToNewsletterMock(email),
}));

const toastSuccessMock = vi.fn();
const toastErrorMock = vi.fn();
const toastInfoMock = vi.fn();
vi.mock("sonner", () => ({
  toast: {
    success: (...args: unknown[]) => toastSuccessMock(...args),
    error: (...args: unknown[]) => toastErrorMock(...args),
    info: (...args: unknown[]) => toastInfoMock(...args),
  },
}));

const submitEvent = () => ({ preventDefault: vi.fn() }) as unknown as React.FormEvent;

describe("useNewsletterSubscription", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects invalid email without calling the service", async () => {
    const { result } = renderHook(() => useNewsletterSubscription());

    act(() => {
      result.current.setEmail("not-an-email");
    });

    await act(async () => {
      await result.current.handleSubmit(submitEvent());
    });

    expect(subscribeToNewsletterMock).not.toHaveBeenCalled();
    expect(toastErrorMock).toHaveBeenCalled();
    expect(result.current.isSubmitted).toBe(false);
  });

  it("marks submitted and clears the input on success", async () => {
    subscribeToNewsletterMock.mockResolvedValueOnce({ success: true });

    const { result } = renderHook(() => useNewsletterSubscription());

    act(() => {
      result.current.setEmail("paula@example.com");
    });

    await act(async () => {
      await result.current.handleSubmit(submitEvent());
    });

    await waitFor(() => expect(result.current.isSubmitted).toBe(true));
    expect(subscribeToNewsletterMock).toHaveBeenCalledWith("paula@example.com");
    expect(result.current.email).toBe("");
    expect(toastSuccessMock).toHaveBeenCalled();
  });

  it("uses info toast when email is already subscribed", async () => {
    subscribeToNewsletterMock.mockResolvedValueOnce({ success: false, reason: "duplicate" });

    const { result } = renderHook(() => useNewsletterSubscription());

    act(() => {
      result.current.setEmail("paula@example.com");
    });

    await act(async () => {
      await result.current.handleSubmit(submitEvent());
    });

    await waitFor(() => expect(toastInfoMock).toHaveBeenCalled());
    expect(result.current.isSubmitted).toBe(false);
  });
});
