'use client';

import Image from 'next/image';
import { memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const HomeHeader = () => {
  const router = useRouter();

  const handleTrophy = useCallback(() => {
    router.push('/rank'); // TODO: 랭킹/업적 페이지 연결
  }, [router]);

  return (
    <>
      <header className="wrap" aria-label="Home header">
        <div className="inner">
          <div className="center">
            <div className="logo">
              <Image src="/assets/images/icon.svg" alt="앱 로고" width={72} height={72} priority />
            </div>
          </div>

          <button
            type="button"
            className="trophy"
            aria-label="랭크/업적 보러가기"
            onClick={handleTrophy}
          >
            <Image src="/assets/icons/trophy.svg" alt="트로피" width={24} height={24} />
          </button>
        </div>
      </header>

      <style jsx>{`
        .wrap {
          position: relative;
          padding: 16px 16px 0;
          background: #ffffff;
        }
        .inner {
          height: 88px;
        }
        .center {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .logo {
          width: 76px;
          height: 76px;
          display: grid;
          place-items: center;
          background: #0c0a09;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        }
        .trophy {
          position: absolute;
          right: 16px;
          top: 12px;
          display: grid;
          place-items: center;
          width: 44px;
          height: 44px;
          background: #fff;
          border: 1px solid #e7e5e4;
          border-radius: 999px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
        }
        .trophy:active {
          transform: scale(0.98);
        }
        @media (min-width: 768px) {
          .inner {
            height: 96px;
          }
          .logo {
            width: 84px;
            height: 84px;
            border-radius: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default memo(HomeHeader);
