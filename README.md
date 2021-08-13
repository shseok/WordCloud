## Word Cloud

## 목표

리액트에서 다루는 데이터를 파이어 베이스에 저장하고 관리하여 호스팅 서비스를 이용하고, 플라스크 Word Cloud API 서버를 구축해서 React와 연동해보자

## 기능

- 플라스크와 연동이 가능하다
- 상세페이지(3가지)로 이동이 가능하다
- 텍스트 파일 업로드가 가능하고 텍스트의 주요 단어를 제한해서 추출한다
- 추출한 단어들로 워드클라우드를 생성한다

* 단어에 가중치를 줘서 크기를 강조할 수 있다

## 실행절차

```
Word Cloud API 서버 실행 (port: 5000)

#git clone https://github.com/shseok/WordCloud.git
$cd React-and-firestore
$npm install
$yarn start (port: 3000)
```

## 주의사항

## 개선사항

- 새로고침해도 이전의 워드 이미지가 나오게 고정하기

- python API 추가 내용 readme file에 설명 추가하기

- 수치 설정시 키 먹는 현상 고치기

## 도움 받은 사이트 (ref)
