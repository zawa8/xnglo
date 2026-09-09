// LocalFontPicker.tsx
'use client';

import { useEffect, useState } from 'react';

const LOCAL_FONTS = [
  // please do not change order
  { id: 'hindixv38font', name: 'xNglovinqi (hindixv38)', variable: 'var(--hindixv38font)' },
  { id: 'bengalixb38font', name: 'xNglobNgali (bengalixb38)', variable: 'var(--bengalixb38font)' },
  { id: 'eNgliSxe38font', name: 'xNgloiNgliS (eNgliSxe38)', variable: 'var(--eNgliSxe38font)' },
  { id: 'guzrajixg38font', name: 'xNgloguzraji (guzrajixg38)', variable: 'var(--guzrajixg38font)' },
  { id: 'jeluguxj38font', name: 'xNglojelugu (jeluguxj38)', variable: 'var(--jeluguxj38font)' },
  { id: 'knRaxk38font', name: 'xNgloknRa (knRaxk38)', variable: 'var(--knRaxk38font)' },
  { id: 'mlyalxmxm38font', name: 'xNglomlyalxm (mlyalxmxm38)', variable: 'var(--mlyalxmxm38font)' },
  { id: 'oriyaxo38font', name: 'xNglooriya (oriyaxo38)', variable: 'var(--oriyaxo38font)' },
  { id: 'pnzabixp38font', name: 'xNglopnzabi (pnzabixp38)', variable: 'var(--pnzabixp38font)' },
  { id: 'sinhlaxs38font', name: 'xNglosinvla (sinhlaxs38)', variable: 'var(--sinhlaxs38font)' },
  { id: 'tmilxt38font', name: 'xNglotmil (tmilxt38)', variable: 'var(--tmilxt38font)' },
];

export default function LocalFontPicker() {
  const [selectedFont, setSelectedFont] = useState('system');

  // Load saved font preference on mount
  useEffect(() => {
    const savedFont = localStorage.getItem('user-local-font');
    if (savedFont) {
      setSelectedFont(savedFont);
      applyGlobalFont(savedFont);
    }
  }, []);

  const handleFontChange = (fontId: string) => {
    setSelectedFont(fontId);
    localStorage.setItem('user-local-font', fontId);
    applyGlobalFont(fontId);
  };

  const applyGlobalFont = (fontId: string) => {
    const fontObj = LOCAL_FONTS.find((f) => f.id === fontId);
    if (fontObj) {
      // 1. पूरे डॉक्यूमेंट रूट पर एक्टिव वेरिएबल को सेट करें (Main Fix)
      document.documentElement.style.setProperty('--current-active-font', fontObj.variable);
      // 2. तुरंत बॉडी स्टाइल को अपडेट करें
      document.body.style.fontFamily = fontObj.variable;
    } else {
      document.documentElement.style.setProperty('--current-active-font', 'inherit');
      document.body.style.fontFamily = 'inherit';
    }
  };

  return (
    <div className="border rounded-xl shadow-md bg-white max-w-sm">
      <select
        value={selectedFont}
        onChange={(e) => handleFontChange(e.target.value)}
        className="w-full p-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-indigo-500 text-black"
      >
        <option value="system">System Font</option>
        {LOCAL_FONTS.map((font) => (
          <option key={font.id} value={font.id}>
            {font.name}
          </option>
        ))}
      </select>
    </div>
  );
}