'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { List } from 'lucide-react';
import { TableOfContentsItem } from '@/lib/models/blog';

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const listContainerRef = useRef<HTMLUListElement>(null);
  const activeItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    items.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    if (activeItemRef.current && listContainerRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, [activeId]);

  if (items.length === 0) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="sticky top-24 p-5 bg-white/5 border border-white/10 rounded-2xl z-10"
    >
      <h3 className="flex items-center gap-2 text-sm font-semibold text-white mb-4">
        <List className="w-4 h-4" />
        Table of Contents
      </h3>
      <ul
        ref={listContainerRef}
        className="space-y-2 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2"
      >
        {items.map((item) => (
          <li
            key={item.id}
            ref={activeId === item.id ? activeItemRef : null}
            style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
          >
            <a
              href={`#${item.id}`}
              className={`block text-sm transition-colors ${
                activeId === item.id
                  ? 'text-white font-medium'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
