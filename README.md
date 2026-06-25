# 신일팩 홈페이지

신일팩 샘플 홈페이지 v1입니다.

## Netlify 자동 배포 설정

GitHub 저장소를 Netlify에 연결할 때 아래 설정을 사용하세요.

- Build command: `pnpm build`
- Publish directory: `dist`
- Node version: `22`

이 저장소에는 `netlify.toml`이 포함되어 있어 Netlify가 위 설정을 자동으로 읽을 수 있습니다.

## 로컬 실행

```bash
pnpm install
pnpm dev
```

## 정적 빌드

```bash
pnpm build
```

빌드 결과는 `dist` 폴더에 생성됩니다.

## 샘플 관리자 로그인

- ID: `admin`
- Password: `1830`

## 참고

현재 컨설팅/공지/관리자 데이터는 브라우저 저장소 기반 샘플 기능입니다. 실제 운영 DB 저장은 추후 별도 연결이 필요합니다.
