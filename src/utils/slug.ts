// title을 URL-safe 문자열로 변환 + 짧은 해시를 붙여 충돌 최소화
export const createRoomSlug = (title: string, salt?: string) => {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[\s\_]+/g, '-') // 공백/언더스코어 → 하이픈
    .replace(/[^a-z0-9\-]/g, '') // 영문/숫자/하이픈만
    .replace(/\-+/g, '-')
    .replace(/^\-+|\-+$/g, '');

  // 간단 해시(충돌 최소화용). id가 생기면 salt로 id를 넣으면 더 안전.
  const hash = (() => {
    const str = `${title}|${salt ?? ''}`;
    let h = 0;
    for (let i = 0; i < str.length; i += 1) h = (h * 31 + str.charCodeAt(i)) >>> 0;
    return h.toString(36).slice(0, 4); // 4글자 base36
  })();

  return `${base}-${hash}`;
};
