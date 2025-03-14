# Turborepo Starter

## TODO

### Common

- [x] TODO LIST 추가

<br>

### API

- [x] request type validation / parse 공통화
  - 특정 타입의 body/query를 강제하고, 어길경우 400응답을 자동으로 내려주도록. controller에서는 보장된 타입만 받아야한다.
- [x] 통합 테스트 환경 구성
  - dto validation 코드 같은것도 우선 테스트코드를 통해 동작을 검증한다.
  - 이를 위해서 적절한 integration 테스트 코드 작성 모범패턴을 구축한다.
  - TODO : 테스트 db가 있는데 mock data setup 및 delete 까지 구축
- logger 개선

  - [x] winston 모듈 추가
  - [x] transporter를 선택 가능하게 변경( options 형태로, file/http/stream 추가필요, )

- [ ] lint 미동작하는거 확인 및 반영
- [ ] 공통 모듈 분리
  - api도 웹도 모두 msa로 쪼개질 수있음
  - api에서 공통으로 쓸 decorator나 middlewares 같은거는 모듈분리가 필요하다. ( 이건 추후 )

### web

- [ ] 기본 라우팅 세팅
  - layout, page 분리
  - not found
  - 인증
- [x] 상태관리 추가 (`zustand`)
- [ ] zustand slice 패턴( 상태 scaling )
- [ ] react-toastify 추가
  - 구현 참고해서 할 수 있으면 직접하는것도 좋아보임
- [x] tailwindcss 추가
- [ ] api client 추가

- [ ] design pattern 기반 재사용 컴포넌트
  - [ ] props collection + props getter
    - dnd 기능
  - [ ] [hoc + hoc compose](https://chatgpt.com/c/67d43fb3-64ac-800c-833c-6de59c24dd17)
    - Authorization
    - conditional rendering(loading, error)
    - analytics / logging
    - Styling/Theming
    - error boundary
    - dnd 등..
  - [ ] Compound Component
    - 이게 내가 알던거랑 좀 다르다. Context를 쓰는 컴포넌트를 말하는듯.

### notification

- [ ] discord notification
