import { renderHook } from '@testing-library/react';
import { useCaseStudy } from './useCaseStudy';
import { describe, it, expect, vi } from 'vitest';

// Mock react-i18next
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, options?: any) => {
            // Mock return values for specific keys if needed, or just return the key
            if (options?.returnObjects) {
                return []; // Return empty array for lists
            }
            return key;
        },
        i18n: {
            changeLanguage: () => new Promise(() => { }),
        },
    }),
}));

describe('useCaseStudy Hook', () => {
    it('should return default project (website) when id is undefined', () => {
        const { result } = renderHook(() => useCaseStudy(undefined));

        expect(result.current.projectData.key).toBe('website');
        expect(result.current.projectData.title).toBe('lab.projects.website.title');
    });

    it('should return correct project data for "portfolio"', () => {
        const { result } = renderHook(() => useCaseStudy('portfolio'));

        expect(result.current.projectData.key).toBe('portfolio');
        expect(result.current.projectData.title).toBe('lab.projects.portfolio.title');
    });

    it('should return correct next project for "portfolio"', () => {
        const { result } = renderHook(() => useCaseStudy('portfolio'));

        // portfolio index is 1, so next one (index 2) should be 'microsaas'
        // based on default array order: ['website', 'portfolio', 'microsaas', 'dashboard', 'platform']
        expect(result.current.nextProject.key).toBe('microsaas');
    });
});
