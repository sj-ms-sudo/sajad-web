'use client';

import { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';

const LINES = [
  '$ whoami',
  'sajad — full-stack engineer',
  '$ cat focus.txt',
  'building: onverse.in, psyra platform',
  'breaking: web/binary/AD exploitation',
  '$ status',
  '[+] open to full-stack & AI/ML roles',
];

export default function TerminalCard() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    if (lineIdx >= LINES.length) return;
    const current = LINES[lineIdx];

    if (charIdx <= current.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 20 + Math.random() * 26);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setDone((d) => [...d, current]);
      setLineIdx((i) => i + 1);
      setCharIdx(0);
    }, 420);
    return () => clearTimeout(t);
  }, [charIdx, lineIdx]);

  const currentLine = LINES[lineIdx]?.slice(0, charIdx) ?? '';
  const isPrompt = (line: string) => line.startsWith('$');
  const isOk = (line: string) => line.startsWith('[+]');

  const lineClass = (line: string) =>
    isPrompt(line) ? 'text-[#8fe9ff]' : isOk(line) ? 'text-[#1fefc4]' : 'text-[#cfd3d9]';

  return (
    <div className="w-full max-w-[380px] overflow-hidden rounded-2xl border border-[#00e5ff]/20 bg-[#060809] shadow-[0_0_40px_rgba(0,229,255,0.08)]">
      <div className="flex items-center gap-2 border-b border-white/5 bg-[#0b0e10] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 flex items-center gap-1.5 text-[11px] tracking-wide text-[#5b6270]">
          <Terminal size={12} /> sj@portfolio
        </span>
      </div>
      <div className="min-h-[190px] p-5 font-mono text-[12.5px] leading-[1.9]">
        {done.map((line, i) => (
          <div key={i} className={lineClass(line)}>
            {line}
          </div>
        ))}
        {lineIdx < LINES.length && (
          <div className={lineClass(LINES[lineIdx])}>
            {currentLine}
            <span className="ml-0.5 inline-block h-[14px] w-[7px] animate-blink bg-[#00e5ff] align-middle" />
          </div>
        )}
      </div>
    </div>
  );
}