'use client';

import { memo, type PropsWithChildren } from 'react';

const MainTemplate = ({ children }: PropsWithChildren) => (
  <div className="min-h-dvh flex flex-col bg-white">{children}</div>
);

export default memo(MainTemplate);
