import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggleTest = () => {
  const { language } = useLanguage();

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: 'var(--bg-primary)', 
      minHeight: '200px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      alignItems: 'center'
    }}>
      <h2 style={{ color: 'var(--text-primary)' }}>
        Language Toggle Test
      </h2>
      <p style={{ color: 'var(--text-secondary)' }}>
        Current Language: <strong>{language}</strong>
      </p>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <span style={{ color: 'var(--text-primary)' }}>Language Toggle:</span>
        <LanguageSwitcher />
      </div>
      <div style={{ 
        padding: '10px', 
        backgroundColor: 'var(--bg-secondary)', 
        borderRadius: '8px',
        color: 'var(--text-secondary)',
        fontSize: '14px'
      }}>
        Click the dropdown above to test language switching. Check browser console for debug logs.
      </div>
    </div>
  );
};

export default LanguageToggleTest;
