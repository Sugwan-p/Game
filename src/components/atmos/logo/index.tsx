'use client';

import Image from 'next/image';

const Logo = () => {
  return (
    <Image
      src="/assets/images/icon.png"
      alt="UNO Logo"
      width={85}
      height={85}
      className="rounded-2xl"
    />
  );
};

export default Logo;
