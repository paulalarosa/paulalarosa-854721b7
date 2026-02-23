import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock matchMedia (required for some shadcn/ui components)
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Mock ResizeObserver
class ResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
}
window.ResizeObserver = ResizeObserver;
global.ResizeObserver = ResizeObserver;

// Mock IntersectionObserver
class IntersectionObserver {
    root = null;
    rootMargin = '';
    thresholds = [];
    disconnect = vi.fn();
    observe = vi.fn();
    takeRecords = vi.fn();
    unobserve = vi.fn();

    constructor() { }
}
window.IntersectionObserver = IntersectionObserver;
global.IntersectionObserver = IntersectionObserver as unknown as typeof global.IntersectionObserver;


// Mock scrollTo
window.scrollTo = vi.fn();

// Mock localStorage
const localStorageMock = (function () {
    let store: Record<string, string> = {};
    return {
        getItem: vi.fn((key: string) => store[key] || null),
        setItem: vi.fn((key: string, value: string) => {
            store[key] = value.toString();
        }),
        removeItem: vi.fn((key: string) => {
            delete store[key];
        }),
        clear: vi.fn(() => {
            store = {};
        }),
        length: 0,
        key: vi.fn((index: number) => Object.keys(store)[index] || null),
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});