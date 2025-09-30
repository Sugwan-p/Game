'use client';

import { memo, type PropsWithChildren } from 'react';

const MainTemplate = ({ children }: PropsWithChildren) => (
  <>
    <div className="layout">{children}</div>

    <style jsx>{`
      .layout {
        min-height: 100dvh;
        display: flex;
        flex-direction: column;
        background: #ffffff;
      }
    `}</style>
  </>
);

export default memo(MainTemplate);
