import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { describe, it, expect, vi } from 'vitest';

// Mock specific components/libraries that might cause issues in JSDOM or are heavy
vi.mock('framer-motion', async () => {
    const actual = await vi.importActual('framer-motion');
    return {
        ...actual,
        AnimatePresence: ({ children }: any) => <>{children}</>,
    };
});

describe('App Smoke Test', () => {
    it('renders the application without crashing', async () => {
        // Render the entire App
        render(<App />);

        // Check for elements that should always be present on the home page (e.g., Header name/logo)
        // Note: Since text might be split by animations or translation tags, we look for key landmarks.

        // Wait for any lazy loaded components or effects
        await waitFor(() => {
            // Assuming "Paula La Rosa" is in the title or header
            // Using regex for case insensitive match
            const titleElements = screen.getAllByText(/Paula La Rosa/i);
            expect(titleElements.length).toBeGreaterThan(0);
        });

        // Check if navigation exists
        const navElement = screen.getByRole('banner'); // Header usually has role='banner'
        expect(navElement).toBeInTheDocument();
    });
});
