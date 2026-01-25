import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps } from 'react';

function CustomLink(props: ComponentProps<'a'>) {
  const href = props.href;
  
  if (href?.startsWith('/')) {
    return <Link href={href} {...props}>{props.children}</Link>;
  }
  
  if (href?.startsWith('#')) {
    return <a {...props} />;
  }
  
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function CustomImage(props: ComponentProps<typeof Image>) {
  return (
    <span className="block my-8">
      <Image
        {...props}
        alt={props.alt || ''}
        className="rounded-xl"
        width={props.width || 800}
        height={props.height || 450}
      />
    </span>
  );
}

function Callout({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' | 'tip' }) {
  const styles = {
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
    warning: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    tip: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
  };
  
  const icons = {
    info: 'ℹ️',
    warning: '⚠️',
    tip: '💡',
  };
  
  return (
    <div className={`p-4 rounded-lg border ${styles[type]} my-6`}>
      <span className="mr-2">{icons[type]}</span>
      {children}
    </div>
  );
}

export const MDXComponents = {
  a: CustomLink,
  img: CustomImage,
  Image: CustomImage,
  Callout,
  h2: (props: ComponentProps<'h2'>) => (
    <h2 className="text-2xl font-bold mt-12 mb-4 text-white" {...props} />
  ),
  h3: (props: ComponentProps<'h3'>) => (
    <h3 className="text-xl font-semibold mt-8 mb-3 text-white" {...props} />
  ),
  p: (props: ComponentProps<'p'>) => (
    <p className="text-neutral-300 leading-relaxed mb-4" {...props} />
  ),
  ul: (props: ComponentProps<'ul'>) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-neutral-300" {...props} />
  ),
  ol: (props: ComponentProps<'ol'>) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-neutral-300" {...props} />
  ),
  li: (props: ComponentProps<'li'>) => (
    <li className="text-neutral-300" {...props} />
  ),
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <blockquote className="border-l-4 border-cyan-500 pl-4 italic text-neutral-400 my-6" {...props} />
  ),
  hr: () => <hr className="border-white/10 my-8" />,
  code: (props: ComponentProps<'code'>) => (
    <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-cyan-300" {...props} />
  ),
  pre: (props: ComponentProps<'pre'>) => (
    <pre className="bg-neutral-900 rounded-lg p-4 overflow-x-auto my-6" {...props} />
  ),
  strong: (props: ComponentProps<'strong'>) => (
    <strong className="text-white font-semibold" {...props} />
  ),
};
