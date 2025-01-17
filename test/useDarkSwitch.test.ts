import { renderHook, act } from '@testing-library/react-hooks';
import { useDarkSwitch } from '../src/useDarkSwitch';

interface StorageProvider extends Storage {
  getItem: jest.Mock;
  setItem: jest.Mock;
  removeItem: jest.Mock;
  clear: jest.Mock;
  key: jest.Mock;
  length: number;
}

describe('useDarkSwitch', () => {
  beforeEach(() => {
    // Mock localStorage methods
    jest.spyOn(Storage.prototype, 'clear').mockImplementation(jest.fn());
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(jest.fn());
    jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(jest.fn());
    jest.spyOn(Storage.prototype, 'key').mockImplementation(jest.fn());

    Object.defineProperty(window, 'localStorage', {
      value: window.localStorage,
      writable: true,
    });

    // Mock matchMedia to simulate system theme changes
    const matchMediaMock = jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)', // Simulate dark mode query
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      value: matchMediaMock,
      writable: true,
    });
  });

  afterEach(() => {
    // Reset mocks and clear localStorage to avoid state carryover
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should initialize with default mode', () => {
    const { result } = renderHook(() => useDarkSwitch());
    expect(result.current.isDark).toBe(false); // defaultMode is false
  });

  it('should toggle dark mode', () => {
    const { result } = renderHook(() => useDarkSwitch());
    act(() => {
      result.current.toggle();
    });
    expect(result.current.isDark).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isDark).toBe(false);
  });

  it('should enable dark mode', () => {
    const { result } = renderHook(() => useDarkSwitch());
    act(() => {
      result.current.enable();
    });
    expect(result.current.isDark).toBe(true);
  });

  it('should disable dark mode', () => {
    const { result } = renderHook(() => useDarkSwitch({ defaultMode: true }));
    act(() => {
      result.current.disable();
    });
    expect(result.current.isDark).toBe(false);
  });

  it('should persist theme preference in localStorage', () => {
    const { result, rerender } = renderHook(() => useDarkSwitch({ storageKey: 'test-theme' }));
    act(() => {
      result.current.enable();
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('test-theme', 'true');

    rerender();
    expect(result.current.isDark).toBe(true);
  });

  it('should sync with system theme', () => {
    const { result } = renderHook(() => useDarkSwitch({ syncWithSystem: true }));
    expect(result.current.isDark).toBe(true); // system is set to dark
  });

  it('should call onChange callback', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useDarkSwitch({ onChange }));
    act(() => {
      result.current.toggle();
    });
    expect(onChange).toHaveBeenCalledWith(true); // onChange callback should be called
  });

  it('should handle custom storage provider', () => {
    const customStorage: StorageProvider = {
      getItem: jest.fn().mockReturnValue('false'),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(),
      length: 0,
    };

    const { result } = renderHook(() => useDarkSwitch({ storageProvider: customStorage }));
    expect(customStorage.getItem).toHaveBeenCalled(); // Should call getItem on customStorage
    act(() => {
      result.current.enable(); // Ensure we test actual behavior
    });
    expect(customStorage.setItem).toHaveBeenCalledWith('dark-mode', 'true'); // Expect setItem to be called
  });

  it('should apply custom class names', () => {
    const { result } = renderHook(() =>
      useDarkSwitch({
        classNameDark: 'custom-dark',
        classNameLight: 'custom-light',
      }),
    );

    const element = document.body; // <body> element

    // Initial check: Should have light mode class by default
    expect(element.classList.contains('custom-light')).toBe(true);
    expect(element.classList.contains('custom-dark')).toBe(false);

    // Enable dark mode and check class names
    act(() => {
      result.current.enable();
    });
    expect(element.classList.contains('custom-dark')).toBe(true);
    expect(element.classList.contains('custom-light')).toBe(false);

    // Disable dark mode and check class names
    act(() => {
      result.current.disable();
    });
    expect(element.classList.contains('custom-light')).toBe(true);
    expect(element.classList.contains('custom-dark')).toBe(false);
  });

  it('should handle transition duration', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useDarkSwitch({ transitionDuration: 500 }));

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isTransitioning).toBe(true);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.isTransitioning).toBe(false);

    jest.useRealTimers();
  });
});
