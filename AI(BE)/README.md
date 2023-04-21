# NLP API

API server for riskout project

## 로컬 환경 설정 방법

### Update/install Docker and build & run

```bash
curl -fsSL https://get.docker.com/ | sudo sh
docker build --tag nlptools:1.0 . # Build dockerfile!
docker run --rm -p 8000:8000 nlptools:1.0 # Run image and bash
# or
docker compose up -d # (Optional) 만약, 이 nlptool를 단독으로 쓰고 싶다면
```

- Go to {your_domain_or_ip_address}/docs and see API Docs

# REST API

The REST API to the example are all below.

## FAKE NEWS

### REQUEST

`POST /fakenews`

```json
{
  "document": "지난 9월 10일 한 블로그에 방호복을 입은 사람들이 문을 부수는 영상과 함께 한국에서도 경찰력을 동원한 백신 강제접종이 이뤄질 것이라고 주장하는 글이 올라왔다. 해당 게시물은 응급의료에 관한 법률 개정안, 경찰관 직무집행법 개정안이 통과되면 경찰이 가정을 찾아와 백신을 강제로 접종할 것이라고 주장했다. 작성자의 말대로 경찰을 동원한 백신 강제 접종이 가능해질까."
}
```

### RESPONSE

```json
{
  "true_score": 0.0643644329071816,
  "time": 0.1972644329071045
}
```

## SUMMARIZER

### REQUEST

`POST /ner`

```json
{
  "document": "(서울=뉴스1) 이주현 기자 = 넷플릭스 오리지널 시리즈 '오징어게임'이 세계적으로 인기를 끌며 드라마에 등장하는 소품과 먹거리 등도 함께 주목받고 있다. 국내에서는 구슬치기 등 추억을 자극하는 소품들의 판매가 급증했고, 해외에서는 달고나와 양은도시락 등 생소한 제품이 고가에 판매되고 있다.\n\n이밖에 소주와 라면, 사이다, 떡볶이 등 드라마에 등장하는 제품들도 홍보 효과를 거두며 영화 '기생충'에 나와 인기를 끈 '제2의 짜파구리(짜파게티+너구리)' 열풍으로 이어질 조짐이다.\n\n◇'달고나 키트' 직구시 약 6만5000원에도 인기\n\n26일 온라인 마켓플레이스 옥션에 따르면 오징어게임 방송 이후 지난 17일부터 23일까지 구슬치기 매출은 직전월 동기간(8월17~8월23일) 대비 860% 증가 했다. 오징어게임 출연진이 입고 나온 456번이 세겨진 트레이닝복(상하세트)의 경우 188% 뛰었고 달고나는 9% 판매가 늘었다.\n\n드라마 속 등장하는 구슬치기 모습에 어릴 적 즐긴 게임의 순수함을 다시 즐겨보기 위해 구매한 소비자가 큰 폭으로 늘어난 것으로 분석된다. 드라마 속 게임 참여자들이 입고 있는 트레이닝복도 오징어게임의 인기에 판매가 약 3배 늘었다.\n\n다만 달고나의 경우 최근 몇년 간 인기를 끌었고 길거리 음식으로 자리매김 한 탓에 온라인 쇼핑에서 판매가 큰 폭으로 늘지는 않았다.\n\n해외에서는 반대 양상을 보이고 있어 흥미를 끈다. 온라인 경매사이트 이베이에서는 드라마에 등장한 '달고나'의 만들기 세트는 23.99달러(약 2만8260원)에 판매되고 있다. 판매 초기 33.99달러(약 3만9000원) 보다 가격이 내렸지만 해외에서 직구로 구매할 경우 배송비 들을 포함해 약 55.71달러(약 6만5000원)이 넘는다.\n\n국내 판매 가격 약 5000원 대비 약 13배 높은 금액이지만 달고나를 만들거나 먹어보지 못한 해외팬들의 호기심을 자극하며 판매가 계속되고 있다.\n\n유튜브 등 소셜네트워크서비스(SNS)에서는 달고나 만드는 영상도 인기를 끌고 있다. 오징어게임 속 장면을 따라한 한 유튜버의 영상은 조회수 수십만회를 넘기며 오징어 게임의 높은 인기와 달고나에 대한 호기심을 반영하고 있다.\n\n'추억의 양은도시락' 역시 국내 판매 가격 대비 약 10배 비싼 35.70달러(약 4만1000원)에 판매되고 있다. 도시락 문화에 익숙하지 않지만 오징어 게임을 본 해외팬들의 판매가 계속되고 있는 것으로 알려졌다.\n\n오징어게임 주인공들이 입고 나온 티셔츠는 약 40달러(약 4만7000원)에 판매되고 있다. 배송비를 포함하면 7만7000원에 달하는 금액이지만 주인공 이정재의 번호인 456번 티셔츠의 인기가 높은 것으로 알려졌다.\n\n이들 제품들은 오징어 게임의 인기가 계속되고 해외 팬들이 늘어날 경우 관련 상품 판매는 더욱 늘어날 전망이다."
}
```

### RESPONSE

```json
{
  "ner": [
    {
      "AFW": ["뉴스", "서울"],
      "PER": ["이정재", "이주현"],
      "CVL": [
        "소주",
        "티셔츠",
        "오징어",
        "기자",
        "기생충",
        "구리",
        "짜파게티",
        "출연진",
        "떡볶이"
      ],
      "ORG": ["이베이", "넷플릭스"],
      "TRM": ["소셜", "구슬치기", "양", "오징어", "옥션"],
      "NUM": ["회", "도시락", "세", "겨"],
      "FLD": ["드라마"],
      "DAT": ["전월", "년", "월", "최근", "동기간", "일", "간", "직"]
    }
  ],
  "time": 0.1972644329071045
}
```

## SENTIMENT

### REQUEST

`POST /sentiment`

```json
{
  "document": "(서울=뉴스1) 이주현 기자 = 넷플릭스 오리지널 시리즈 '오징어게임'이 세계적으로 인기를 끌며 드라마에 등장하는 소품과 먹거리 등도 함께 주목받고 있다. 국내에서는 구슬치기 등 추억을 자극하는 소품들의 판매가 급증했고, 해외에서는 달고나와 양은도시락 등 생소한 제품이 고가에 판매되고 있다.\n\n이밖에 소주와 라면, 사이다, 떡볶이 등 드라마에 등장하는 제품들도 홍보 효과를 거두며 영화 '기생충'에 나와 인기를 끈 '제2의 짜파구리(짜파게티+너구리)' 열풍으로 이어질 조짐이다.\n\n◇'달고나 키트' 직구시 약 6만5000원에도 인기\n\n26일 온라인 마켓플레이스 옥션에 따르면 오징어게임 방송 이후 지난 17일부터 23일까지 구슬치기 매출은 직전월 동기간(8월17~8월23일) 대비 860% 증가 했다. 오징어게임 출연진이 입고 나온 456번이 세겨진 트레이닝복(상하세트)의 경우 188% 뛰었고 달고나는 9% 판매가 늘었다.\n\n드라마 속 등장하는 구슬치기 모습에 어릴 적 즐긴 게임의 순수함을 다시 즐겨보기 위해 구매한 소비자가 큰 폭으로 늘어난 것으로 분석된다. 드라마 속 게임 참여자들이 입고 있는 트레이닝복도 오징어게임의 인기에 판매가 약 3배 늘었다.\n\n다만 달고나의 경우 최근 몇년 간 인기를 끌었고 길거리 음식으로 자리매김 한 탓에 온라인 쇼핑에서 판매가 큰 폭으로 늘지는 않았다.\n\n해외에서는 반대 양상을 보이고 있어 흥미를 끈다. 온라인 경매사이트 이베이에서는 드라마에 등장한 '달고나'의 만들기 세트는 23.99달러(약 2만8260원)에 판매되고 있다. 판매 초기 33.99달러(약 3만9000원) 보다 가격이 내렸지만 해외에서 직구로 구매할 경우 배송비 들을 포함해 약 55.71달러(약 6만5000원)이 넘는다.\n\n국내 판매 가격 약 5000원 대비 약 13배 높은 금액이지만 달고나를 만들거나 먹어보지 못한 해외팬들의 호기심을 자극하며 판매가 계속되고 있다.\n\n유튜브 등 소셜네트워크서비스(SNS)에서는 달고나 만드는 영상도 인기를 끌고 있다. 오징어게임 속 장면을 따라한 한 유튜버의 영상은 조회수 수십만회를 넘기며 오징어 게임의 높은 인기와 달고나에 대한 호기심을 반영하고 있다.\n\n'추억의 양은도시락' 역시 국내 판매 가격 대비 약 10배 비싼 35.70달러(약 4만1000원)에 판매되고 있다. 도시락 문화에 익숙하지 않지만 오징어 게임을 본 해외팬들의 판매가 계속되고 있는 것으로 알려졌다.\n\n오징어게임 주인공들이 입고 나온 티셔츠는 약 40달러(약 4만7000원)에 판매되고 있다. 배송비를 포함하면 7만7000원에 달하는 금액이지만 주인공 이정재의 번호인 456번 티셔츠의 인기가 높은 것으로 알려졌다.\n\n이들 제품들은 오징어 게임의 인기가 계속되고 해외 팬들이 늘어날 경우 관련 상품 판매는 더욱 늘어날 전망이다."
}
```

### RESPONSE

```json
{
  "score": [0.7660200595855713],
  "time": 0.16649460792541504
}
```

## SUMMARIZE

### REQUEST

`POST /summarize`

```json
{
  "document": "(서울=뉴스1) 이주현 기자 = 넷플릭스 오리지널 시리즈 '오징어게임'이 세계적으로 인기를 끌며 드라마에 등장하는 소품과 먹거리 등도 함께 주목받고 있다. 국내에서는 구슬치기 등 추억을 자극하는 소품들의 판매가 급증했고, 해외에서는 달고나와 양은도시락 등 생소한 제품이 고가에 판매되고 있다.\n\n이밖에 소주와 라면, 사이다, 떡볶이 등 드라마에 등장하는 제품들도 홍보 효과를 거두며 영화 '기생충'에 나와 인기를 끈 '제2의 짜파구리(짜파게티+너구리)' 열풍으로 이어질 조짐이다.\n\n◇'달고나 키트' 직구시 약 6만5000원에도 인기\n\n26일 온라인 마켓플레이스 옥션에 따르면 오징어게임 방송 이후 지난 17일부터 23일까지 구슬치기 매출은 직전월 동기간(8월17~8월23일) 대비 860% 증가 했다. 오징어게임 출연진이 입고 나온 456번이 세겨진 트레이닝복(상하세트)의 경우 188% 뛰었고 달고나는 9% 판매가 늘었다.\n\n드라마 속 등장하는 구슬치기 모습에 어릴 적 즐긴 게임의 순수함을 다시 즐겨보기 위해 구매한 소비자가 큰 폭으로 늘어난 것으로 분석된다. 드라마 속 게임 참여자들이 입고 있는 트레이닝복도 오징어게임의 인기에 판매가 약 3배 늘었다.\n\n다만 달고나의 경우 최근 몇년 간 인기를 끌었고 길거리 음식으로 자리매김 한 탓에 온라인 쇼핑에서 판매가 큰 폭으로 늘지는 않았다.\n\n해외에서는 반대 양상을 보이고 있어 흥미를 끈다. 온라인 경매사이트 이베이에서는 드라마에 등장한 '달고나'의 만들기 세트는 23.99달러(약 2만8260원)에 판매되고 있다. 판매 초기 33.99달러(약 3만9000원) 보다 가격이 내렸지만 해외에서 직구로 구매할 경우 배송비 들을 포함해 약 55.71달러(약 6만5000원)이 넘는다.\n\n국내 판매 가격 약 5000원 대비 약 13배 높은 금액이지만 달고나를 만들거나 먹어보지 못한 해외팬들의 호기심을 자극하며 판매가 계속되고 있다.\n\n유튜브 등 소셜네트워크서비스(SNS)에서는 달고나 만드는 영상도 인기를 끌고 있다. 오징어게임 속 장면을 따라한 한 유튜버의 영상은 조회수 수십만회를 넘기며 오징어 게임의 높은 인기와 달고나에 대한 호기심을 반영하고 있다.\n\n'추억의 양은도시락' 역시 국내 판매 가격 대비 약 10배 비싼 35.70달러(약 4만1000원)에 판매되고 있다. 도시락 문화에 익숙하지 않지만 오징어 게임을 본 해외팬들의 판매가 계속되고 있는 것으로 알려졌다.\n\n오징어게임 주인공들이 입고 나온 티셔츠는 약 40달러(약 4만7000원)에 판매되고 있다. 배송비를 포함하면 7만7000원에 달하는 금액이지만 주인공 이정재의 번호인 456번 티셔츠의 인기가 높은 것으로 알려졌다.\n\n이들 제품들은 오징어 게임의 인기가 계속되고 해외 팬들이 늘어날 경우 관련 상품 판매는 더욱 늘어날 전망이다."
}
```

### RESPONSE

```json
{
  "summairzed": [
    "넷플릭스 오리지널 시리즈 '오징어게임'이 세계적으로 인기를 끌며 국내에서는 구슬치기 등 추억을 자극하는 소품들의 판매가 급증했고, 해외에서는 달고나와 양은도시락 등 생소한 제품이 고가에 판매되고 있다."
  ],
  "time": 5.040387868881226
}
```

---

## KEYWORDS

### REQUEST

`POST /keywords`

```json
{
  "document": [
    "종전선언은 한반도평화의 초석될 수 있을까",
    "IAEA 우려에도 답 없는 쿼드정상... 북에 끌려가는 비핵화",
    "막판 평화시계 다시 돌아가나…靑, 김여정 담화에 일관되게 최선",
    "中 잡지, 대만 공격 시나리오 공개…美와 장기전 우려도",
    "北김여정, '남북 정상회담' 거론에 靑 신중하고 면밀히 검토(종합)",
    "한·멕시코 외교장관회담서 보건협력협정 추진",
    "성추행 피해 사망관련 공군 수뇌부 통신영장 무더기 기각",
    "Korea and Mongolia make new forestation plans",
    "미·러, 정상회담 김여정 담화에 원론적 “지지” 입장",
    "中 관영매체, “정의용 장관은 사실을 말했을 뿐” 두둔",
    "김여정 연이틀 담화에 與 대화 나서야 野 자존심도 없나(종합)",
    "軍 코로나19 신규확진 5명…누적 1737명",
    "정부 김여정 담화, 의미 있게 평가…우선 통신선 복원",
    "통일부 남북통신연락선 신속하게 복원 돼야",
    "외교부 '신북방 청년 아카데미 워크숍'개최",
    "세금 왜 이리 쓰나…개발 1억3천, 매년 보수비 수천 외교부앱 '애물단지'",
    "北김여정 유화 담화, 남북미 교착상태에 활기 불어넣나",
    "먼저 남북정상회담 꺼낸 김여정…3년전 처럼 '깜짝 정상회동' 할까?"
  ]
}
```

### RESPONSE

```json
{
  "keywords": [
    ["김여정", 2.3147080193756495],
    ["정상", 1.8464907145197724],
    ["남북", 1.5780279894989322],
    ["회담", 1.5084714300901014],
    ["담화", 1.4527588800110358],
    ["명", 1],
    ["北", 0.9849603180002695],
    ["靑", 0.9245756284680017],
    ["종합", 0.8126847469293367],
    ["미", 0.807686718963801]
  ],
  "time": 0.021562814712524414
}
```

## KEYSENTENCES

### REQUEST

`POST /keywords`

```json
{
  "document": [
    "종전선언은 한반도평화의 초석될 수 있을까",
    "IAEA 우려에도 답 없는 쿼드정상... 북에 끌려가는 비핵화",
    "막판 평화시계 다시 돌아가나…靑, 김여정 담화에 일관되게 최선",
    "中 잡지, 대만 공격 시나리오 공개…美와 장기전 우려도",
    "北김여정, '남북 정상회담' 거론에 靑 신중하고 면밀히 검토(종합)",
    "한·멕시코 외교장관회담서 보건협력협정 추진",
    "성추행 피해 사망관련 공군 수뇌부 통신영장 무더기 기각",
    "Korea and Mongolia make new forestation plans",
    "미·러, 정상회담 김여정 담화에 원론적 “지지” 입장",
    "中 관영매체, “정의용 장관은 사실을 말했을 뿐” 두둔",
    "김여정 연이틀 담화에 與 대화 나서야 野 자존심도 없나(종합)",
    "軍 코로나19 신규확진 5명…누적 1737명",
    "정부 김여정 담화, 의미 있게 평가…우선 통신선 복원",
    "통일부 남북통신연락선 신속하게 복원 돼야",
    "외교부 '신북방 청년 아카데미 워크숍'개최",
    "세금 왜 이리 쓰나…개발 1억3천, 매년 보수비 수천 외교부앱 '애물단지'",
    "北김여정 유화 담화, 남북미 교착상태에 활기 불어넣나",
    "먼저 남북정상회담 꺼낸 김여정…3년전 처럼 '깜짝 정상회동' 할까?"
  ]
}
```

### RESPONSE

```json
{
  "keysentences": [
    {
      "id": 4,
      "score": 1.3384932079264047,
      "sentence": "北김여정, '남북 정상회담' 거론에 靑 신중하고 면밀히 검토(종합)"
    },
    {
      "id": 8,
      "score": 1.3295243943582151,
      "sentence": "미·러, 정상회담 김여정 담화에 원론적 “지지” 입장"
    },
    {
      "id": 17,
      "score": 1.1815908451295631,
      "sentence": "먼저 남북정상회담 꺼낸 김여정…3년전 처럼 '깜짝 정상회동' 할까?"
    },
    {
      "id": 16,
      "score": 1.1739269754176886,
      "sentence": "北김여정 유화 담화, 남북미 교착상태에 활기 불어넣나"
    },
    {
      "id": 12,
      "score": 1.0607260516936052,
      "sentence": "정부 김여정 담화, 의미 있게 평가…우선 통신선 복원"
    },
    {
      "id": 10,
      "score": 1.0238134539414232,
      "sentence": "김여정 연이틀 담화에 與 대화 나서야 野 자존심도 없나(종합)"
    },
    {
      "id": 11,
      "score": 1,
      "sentence": "軍 코로나19 신규확진 5명…누적 1737명"
    },
    {
      "id": 2,
      "score": 0.9834732742511121,
      "sentence": "막판 평화시계 다시 돌아가나…靑, 김여정 담화에 일관되게 최선"
    },
    {
      "id": 9,
      "score": 0.8164058179318646,
      "sentence": "中 관영매체, “정의용 장관은 사실을 말했을 뿐” 두둔"
    },
    {
      "id": 3,
      "score": 0.8164058179318646,
      "sentence": "中 잡지, 대만 공격 시나리오 공개…美와 장기전 우려도"
    }
  ],
  "time": 0.008257865905761719
}
```

## References

- [lovit/textrank](https://github.com/lovit/textrank)

  - ^1 : Mihalcea, R., & Tarau, P. (2004). Textrank: Bringing order into text. In Proceedings of the 2004 conference on empirical methods in natural language processing

- [SKT-AI/kobart](https://github.com/SKT-AI/KoBART)

  - [seujung/KoBART-summarizationseujung/](https://github.com/seujung/KoBART-summarization)

- [mologg/KoBERT-NER](https://github.com/monologg/KoBERT-NER)

  - [NAVER/nlp-challenges](https://github.com/naver/nlp-challenge)

- [aisolab/nlp_classification](https://github.com/aisolab/nlp_classification)