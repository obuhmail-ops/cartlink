import React from 'react';

export default function PalmLeafDecoration({ side }) {
  const isRight = side === 'right';

  return (
    <svg
      viewBox="0 0 180 120"
      aria-hidden="true"
      className={`pointer-events-none absolute top-0 hidden h-full w-44 text-moss/35 lg:block ${isRight ? 'right-0 scale-x-[-1]' : 'left-0'}`}
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M-6 5C30 17 69 45 116 116" strokeWidth="3.2" />
        <path d="M18 17C49 12 78 18 105 37" strokeWidth="2" />
        <path d="M37 30C71 27 103 39 129 62" strokeWidth="2" />
        <path d="M56 47C93 47 124 62 148 87" strokeWidth="2" />
        <path d="M75 68C108 70 138 85 160 109" strokeWidth="1.8" />
      </g>
      <g fill="currentColor">
        <path d="M21 17C31 8 43 3 57 3C49 12 37 18 21 17Z" />
        <path d="M29 19C40 20 51 25 59 34C46 33 36 28 29 19Z" />
        <path d="M40 16C51 8 64 5 78 7C68 15 55 19 40 16Z" />
        <path d="M48 21C61 22 72 28 80 38C66 36 56 31 48 21Z" />
        <path d="M59 20C72 14 85 13 98 17C87 23 74 25 59 20Z" />
        <path d="M68 27C81 30 92 37 99 48C85 45 75 38 68 27Z" />
        <path d="M41 30C52 21 65 17 80 18C70 27 57 32 41 30Z" />
        <path d="M51 34C64 36 75 43 83 54C69 51 58 44 51 34Z" />
        <path d="M61 31C75 24 89 24 103 29C91 36 77 38 61 31Z" />
        <path d="M73 39C87 41 100 49 108 61C92 58 81 51 73 39Z" />
        <path d="M83 38C98 33 113 35 126 42C112 47 98 46 83 38Z" />
        <path d="M57 47C69 38 83 35 98 38C87 47 73 51 57 47Z" />
        <path d="M68 52C82 55 94 63 102 75C87 71 76 64 68 52Z" />
        <path d="M79 48C94 43 109 46 122 54C107 58 93 56 79 48Z" />
        <path d="M92 59C106 63 118 72 125 84C110 79 99 71 92 59Z" />
        <path d="M104 59C119 57 133 61 145 71C130 73 117 69 104 59Z" />
        <path d="M76 68C88 60 102 59 116 63C104 71 91 74 76 68Z" />
        <path d="M89 75C103 79 114 88 121 101C106 95 96 87 89 75Z" />
        <path d="M101 72C116 69 130 73 142 82C127 85 114 81 101 72Z" />
        <path d="M115 86C129 91 140 100 146 113C132 108 122 99 115 86Z" />
      </g>
    </svg>
  );
}