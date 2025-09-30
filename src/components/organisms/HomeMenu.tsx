'use client';

import { memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import CardButton from '@/components/atmos/CardButton';

const HomeMenu = () => {
  const router = useRouter();

  const handleAI = useCallback(() => {
    router.push('/ai');
  }, [router]);
  const handleOnline = useCallback(() => {
    router.push('/online');
  }, [router]);

  return (
    <>
      <section className="wrap" aria-label="메인 메뉴">
        <div className="panel">
          <div className="stack">
            <div className="cardBox">
              <CardButton title="AI와 게임하기" icon="robot" onClick={handleAI} />
            </div>
            <div className="cardBox">
              <CardButton title="온라인 게임하기" icon="group" onClick={handleOnline} />
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .wrap {
          padding: 16px;
        }
        .panel {
          border-radius: 24px;
          background: #f5f7fb;
          border: 1px solid #e7e5e4;
          padding: 18px;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.06);
        }
        .stack {
          display: grid;
          gap: 20px;
        }
        .cardBox {
          padding: 12px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 20px;
        }
        @media (min-width: 480px) {
          .panel {
            border-radius: 28px;
            padding: 22px;
          }
          .stack {
            gap: 22px;
          }
        }
        @media (min-width: 768px) {
          .wrap {
            padding: 20px;
          }
          .panel {
            border-radius: 32px;
            padding: 26px;
          }
          .cardBox {
            border-radius: 22px;
            padding: 14px;
          }
        }
        @media (min-width: 1024px) {
          .wrap {
            max-width: 720px;
            margin: 0 auto;
          }
        }
      `}</style>
    </>
  );
};

export default memo(HomeMenu);
