import { renderHook } from "@testing-library/react";
import { useCaseStudy } from "./useCaseStudy";
import { describe, it, expect, vi } from "vitest";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: { returnObjects?: boolean }) => {
      if (options?.returnObjects) {
        return [];
      }
      return key;
    },
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

describe("useCaseStudy Hook", () => {
  it("should return default project (website) when id is undefined", () => {
    const { result } = renderHook(() => useCaseStudy(undefined));

    expect(result.current.projectData.key).toBe("website");
    expect(result.current.projectData.title).toBe("lab.projects.website.title");
  });

  it('should return correct project data for "portfolio"', () => {
    const { result } = renderHook(() => useCaseStudy("portfolio"));

    expect(result.current.projectData.key).toBe("portfolio");
    expect(result.current.projectData.title).toBe("lab.projects.portfolio.title");
  });

  it('should return correct next project for "portfolio"', () => {
    const { result } = renderHook(() => useCaseStudy("portfolio"));

    expect(result.current.nextProject.key).toBe("microsaas");
  });
});
