import { useState, useEffect, useCallback } from 'react';
import { NasaImageItem } from '../types';

const STORAGE_KEY = 'acrooosverse_saved_v1';

export function useSavedRecords() {
  const [savedRecords, setSavedRecords] = useState<NasaImageItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read saved records from localStorage:', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedRecords));
    } catch (e) {
      console.warn('Could not write saved records to localStorage:', e);
    }
  }, [savedRecords]);

  const isSaved = useCallback(
    (nasa_id: string) => {
      return savedRecords.some((r) => r.nasa_id === nasa_id);
    },
    [savedRecords]
  );

  const toggleSave = useCallback((item: NasaImageItem) => {
    setSavedRecords((prev) => {
      const exists = prev.some((r) => r.nasa_id === item.nasa_id);
      if (exists) {
        return prev.filter((r) => r.nasa_id !== item.nasa_id);
      } else {
        return [item, ...prev];
      }
    });
  }, []);

  const removeSaved = useCallback((nasa_id: string) => {
    setSavedRecords((prev) => prev.filter((r) => r.nasa_id !== nasa_id));
  }, []);

  const clearAllSaved = useCallback(() => {
    setSavedRecords([]);
  }, []);

  const getExportBibliography = useCallback(() => {
    if (savedRecords.length === 0) return '';
    return savedRecords
      .map((item, idx) => {
        const year = item.date_created
          ? new Date(item.date_created).getFullYear()
          : 'n.d.';
        const center = item.center ? ` (${item.center})` : '';
        return `[${idx + 1}] "${item.title}." NASA Image ID: ${item.nasa_id}${center}. Date Cataloged: ${year}. NASA Image and Video Library. Source: https://images.nasa.gov/details/${item.nasa_id}`;
      })
      .join('\n\n');
  }, [savedRecords]);

  return {
    savedRecords,
    isSaved,
    toggleSave,
    removeSaved,
    clearAllSaved,
    getExportBibliography,
  };
}
