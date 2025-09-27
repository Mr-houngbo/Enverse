import { useState, useEffect } from 'react';

interface ConsoleIntroProps {
  onComplete: () => void;
}

export function ConsoleIntro({ onComplete }: ConsoleIntroProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  const consoleLines = [
    '> Initialisation du blog Enverse...',
    '> Chargement du système neuronal...',
    '> Connexion aux données africaines...',
    '> Activation des idées innovantes...',
  ];

  const currentText = consoleLines[currentLine] || '';
  const displayedText = currentText.slice(0, currentChar);

  useEffect(() => {
    if (currentLine >= consoleLines.length) {
      setTimeout(onComplete, 300);
      return;
    }

    const timer = setTimeout(() => {
      if (currentChar < currentText.length) {
        setCurrentChar(prev => prev + 1);
      } else {
        setTimeout(() => {
          setCurrentLine(prev => prev + 1);
          setCurrentChar(0);
        }, 100);
      }
    }, 15);

    return () => clearTimeout(timer);
  }, [currentChar, currentLine, currentText.length, consoleLines.length, onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="w-full max-w-2xl p-8">
        <div className="bg-gray-900 border border-orange-500/30 rounded-lg p-6 font-mono text-green-400">
          <div className="mb-4 text-orange-400 text-sm">Enverse Terminal v2.0.24</div>

          <div className="space-y-2">
            {consoleLines.slice(0, currentLine).map((line, index) => (
              <div key={index} className="text-green-400">
                {line}
              </div>
            ))}

            {currentLine < consoleLines.length && (
              <div className="text-green-400">
                {displayedText}
                <span className="animate-pulse">|</span>
              </div>
            )}
          </div>

          {currentLine >= consoleLines.length && (
            <div className="mt-6 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
