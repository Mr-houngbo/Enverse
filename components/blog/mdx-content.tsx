import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';

// Custom components pour MDX
const components = {
  img: (props: any) => (
    <div className="relative h-96 w-full my-8 rounded-lg overflow-hidden">
      <Image
        {...props}
        fill
        className="object-cover"
        alt={props.alt || ''}
      />
    </div>
  ),
  a: (props: any) => (
    <Link 
      {...props} 
      className="text-primary hover:text-primary-dark dark:text-primary-dark dark:hover:text-primary underline"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    />
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-primary dark:border-primary-dark pl-6 py-2 my-6 bg-gray-50 dark:bg-gray-900 rounded-r-lg italic">
      {props.children}
    </blockquote>
  ),
  code: (props: any) => (
    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-primary dark:text-primary-dark">
      {props.children}
    </code>
  ),
  pre: (props: any) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6">
      {props.children}
    </pre>
  ),
};

interface MDXContentProps {
  content: string;
}

export function MDXContent({ content }: MDXContentProps) {
  return (
    <MDXRemote 
      source={content} 
      components={components}
    />
  );
}