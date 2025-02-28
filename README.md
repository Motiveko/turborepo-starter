# Turborepo Starter

## TODO

### Common

- [x] TODO LIST 추가

<br>

### API

- [ ] request type validation / parse 공통화
  - 특정 타입의 body/query를 강제하고, 어길경우 400응답을 자동으로 내려주도록. controller에서는 보장된 타입만 받아야한다.
- [ ] 통합 테스트 환경 구성
  - dto validation 코드 같은것도 우선 테스트코드를 통해 동작을 검증한다.
  - 이를 위해서 적절한 integration 테스트 코드 작성 모범패턴을 구축한다.
- [ ] 공통 모듈 분리
  - api도 웹도 모두 msa로 쪼개질 수있음
  - api에서 공통으로 쓸 decorator나 middlewares 같은거는 모듈분리가 필요하다. ( 이건 추후 )
- [ ] logger 개선
