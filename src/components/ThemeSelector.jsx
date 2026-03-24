import React from 'react';
import PropTypes from 'prop-types';
import { Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { themes } from '../data/themes';

const ThemeSelector = () => {
  const { currentTheme, changeTheme } = useTheme();

  return (
    <div className="theme-selector">
      <h3 className="selector-title">Choose Theme</h3>
      <div className="theme-grid">
        {Object.entries(themes).map(([key, theme]) => (
          <button
            key={key}
            className={`theme-option ${currentTheme === key ? 'active' : ''}`}
            onClick={() => changeTheme(key)}
          >
            <div className="theme-preview">
              <div className="preview-swatches">
                <div
                  className="swatch swatch-primary"
                  style={{ background: theme.primary }}
                  title="Primary Color"
                />
                <div
                  className="swatch swatch-secondary"
                  style={{ background: theme.secondary }}
                  title="Secondary Color"
                />
                <div
                  className="swatch swatch-bg"
                  style={{ background: theme.background, border: '1px solid var(--border-light)' }}
                  title="Background Color"
                />
              </div>
              {currentTheme === key && (
                <div className="theme-check-overlay">
                  <div className="check-circle">
                    <Check size={14} strokeWidth={3} />
                  </div>
                </div>
              )}
            </div>
            <span className="theme-name">{theme.name}</span>
          </button>
        ))}
      </div>

      <style jsx>{`
        .theme-selector {
          padding: 2rem;
          background: var(--bg-card);
          border: 1px solid var(--border-light);
          border-radius: 24px;
          box-shadow: var(--shadow-sm);
        }

        .selector-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .theme-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 1.25rem;
        }

        .theme-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 1.25rem;
          background: var(--bg-card);
          border: 2px solid var(--border-light);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .theme-option:hover {
          border-color: var(--primary);
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -8px rgba(var(--primary-rgb), 0.2);
          background: var(--bg-subtle);
        }

        .theme-option.active {
          border-color: var(--primary);
          background: var(--primary-light);
          box-shadow: 0 8px 16px -4px rgba(var(--primary-rgb), 0.15);
        }

        .theme-preview {
          position: relative;
          width: 100%;
          padding: 0.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .preview-swatches {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          height: 60px;
          width: 80px;
        }

        .swatch {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          position: absolute;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
          border: 2px solid white;
        }

        .swatch-primary {
          z-index: 3;
          left: 0;
        }

        .swatch-secondary {
          z-index: 2;
          left: 20px;
          opacity: 0.9;
        }

        .swatch-bg {
          z-index: 1;
          left: 40px;
          opacity: 0.8;
        }

        .theme-option:hover .swatch {
          transform: scale(1.1);
        }

        .theme-check-overlay {
          position: absolute;
          top: -8px;
          right: -8px;
          z-index: 10;
          animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .check-circle {
          width: 24px;
          height: 24px;
          background: var(--primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          border: 2px solid white;
        }

        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .theme-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-main);
          transition: color 0.3s ease;
        }

        .theme-option.active .theme-name {
          color: var(--primary);
        }

        @media (max-width: 768px) {
          .theme-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.75rem;
          }
          .theme-option {
            padding: 0.75rem;
          }
          .swatch {
            width: 32px;
            height: 32px;
          }
          .preview-swatches {
            height: 48px;
            width: 64px;
          }
           .swatch-secondary { left: 16px; }
           .swatch-bg { left: 32px; }
        }
      `}</style>
    </div>
  );
};

ThemeSelector.propTypes = {};

export default ThemeSelector;
