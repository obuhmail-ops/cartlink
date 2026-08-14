import React from 'react';

export default function PalmLeafDecoration({ side }) {
  const isRight = side === 'right';

  return (
    <svg
      viewBox="0 0 150 110"
      aria-hidden="true"
      className={`pointer-events-none absolute top-0 hidden h-full w-36 text-moss/30 lg:block ${isRight ? 'right-0 scale-x-[-1]' : 'left-0'}`}
    >
      <path d="M2 5C42 25 71 55 103 106" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M23 16C34 13 49 14 60 21C44 24 34 22 23 16Z" fill="currentColor" />
      <path d="M37 28C52 24 67 27 77 35C60 37 48 35 37 28Z" fill="currentColor" />
      <path d="M50 42C67 38 81 42 90 51C73 52 60 49 50 42Z" fill="currentColor" />
      <path d="M61 56C79 53 92 58 100 67C83 67 70 64 61 56Z" fill="currentColor" />
      <path d="M75 71C91 70 105 76 112 86C95 84 83 80 75 71Z" fill="currentColor" />
      <path d="M19 13C21 27 18 39 10 49C7 34 10 22 19 13Z" fill="currentColor" />
      <path d="M32 23C34 39 30 51 21 60C19 44 23 32 32 23Z" fill="currentColor" />
      <path d="M45 35C47 51 43 64 34 74C32 57 36 44 45 35Z" fill="currentColor" />
      <path d="M58 49C59 65 55 78 46 88C44 71 49 58 58 49Z" fill="currentColor" />
      <path d="M71 64C72 80 68 93 60 103C57 86 62 73 71 64Z" fill="currentColor" />
    </svg>
  );
}