'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // wire up to your endpoint/email service of choice
    setStatus('sent');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mx-auto flex w-full max-w-md flex-col gap-4"
    >
      <input
        type="text"
        placeholder="Name"
        required
        className="rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-[#edeff2] placeholder:text-[#5b6270] outline-none transition-colors focus:border-[#00e5ff]/50"
      />
      <input
        type="email"
        placeholder="Email"
        required
        className="rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-[#edeff2] placeholder:text-[#5b6270] outline-none transition-colors focus:border-[#00e5ff]/50"
      />
      <textarea
        placeholder="What's on your mind?"
        required
        rows={4}
        className="resize-none rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-[#edeff2] placeholder:text-[#5b6270] outline-none transition-colors focus:border-[#00e5ff]/50"
      />

      <button
        type="submit"
        className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#00e5ff] to-[#1fefc4] px-6 py-3 text-sm font-semibold text-[#050505] transition-transform hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,229,255,0.35)]"
      >
        {status === 'sent' ? 'Sent — thank you' : 'Send message'}
        {status === 'idle' && <Send size={15} />}
      </button>
    </motion.form>
  );
}