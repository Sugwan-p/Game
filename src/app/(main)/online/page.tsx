// 내일 할 일 :
// 1 : 내가 만든 방인 경우 삭제 할 수 있는 쓰레기통 버튼 만들기
// 2 : 참가 버튼 상호작용 = 방입장 버튼 활성화 하기
// 3 : 방 안 퍼블리싱 게임 시작 전 화면 퍼블리싱  !  인원수 따라 달라야 함
'use client';

import { memo } from 'react';
import OnlineTemplate from '@/components/templates/onlineTemplate';

// 대소문자 구별 주의 !

const Page = () => (
  <>
    <OnlineTemplate />
  </>
);

export default memo(Page);
