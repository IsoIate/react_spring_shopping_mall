
# 1. Project Overview (프로젝트 개요)
- 프로젝트 이름: Fruit Store
- 프로젝트 설명: React와 Spring Boot를 학습한 뒤 복습 및 확실한 체득을 위해 진행한 개인 프로젝트 

<br/>
<br/>

# 2. Team Members (팀원 및 팀 소개)
| 전현준 |
|:------:|
| ![Image](https://github.com/user-attachments/assets/b97c1b7c-51b2-496b-a2a8-97cbdd1fd32e) |
| FE / BE |
| 화면 구성, 설계, 기능구현, API 설계, 구현, DB 설계 등 전반적인 프로젝트 담당 |

<br/>
<br/>

# 3. Key Features (주요 기능)
- **회원가입**:
  - 회원가입 시 DB에 유저정보가 등록됩니다.

- **로그인**:
  - 사용자 인증 정보를 통해 로그인합니다.

- **과일 판매 페이지**:
  - 판매중인 과일의 정보를 확인할 수 있습니다.
  - 베스트, 신상품, 각 분류별 등 다양한 조건으로 과일의 정보를 확인할 수 있습니다.

- **상세정보 페이지**:
  - 선택한 과일의 상세정보를 확인할 수 있습니다.
  - 즉시 구매하거나, 장바구니에 담아서 결제시 활용할 수 있습니다.

- **장바구니**:
  - 장바구니에 담은 과일들의 정보를 확인할 수 있습니다.
  - 장바구니에 담긴 과일의 수량을 조절하거나, 장바구니 내 과일을 삭제할 수 있습니다.

- **과일 등록**:
  - 새로운 과일 정보를 등록할 수 있습니다.
    
<br/>
<br/>


# 4. Technology Stack (기술 스택)
## 4.1 Publishing
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

## 4.2 Frotend
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">  ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)  

## 4.3 Backend
<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white">   <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=Spring-Security&logoColor=white">

## 4.4 Server
![Azure](https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white)  ![Amazon S3](https://img.shields.io/badge/Amazon%20S3-FF9900?style=for-the-badge&logo=amazons3&logoColor=white)  ![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)

## 4.5 Cooperation
<img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white"/>   <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/> 

<br/>

# 5. Project Structure (프로젝트 구조)
## 5.1 Frontend
```plaintext
project/
├── public/
│   ├── index.html           # HTML 템플릿 파일
│   └── favicon.ico          # 아이콘 파일
├── src/
│   ├── assets/              # 이미지, 폰트 등 정적 파일
│   ├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── css/                 # css 파일
│   ├── pages/               # 각 페이지별 컴포넌트
│   ├── store/               # redux 파일
│   ├── App.js               # 메인 애플리케이션 컴포넌트
│   ├── index.js             # 엔트리 포인트 파일
│   ├── index.css            # 전역 css 파일
│   ├── firebaseConfig.js    # firebase 인스턴스 초기화 파일
│   package-lock.json    # 정확한 종속성 버전이 기록된 파일로, 일관된 빌드를 보장
│   package.json         # 프로젝트 종속성 및 스크립트 정의
├── .gitignore               # Git 무시 파일 목록
└── README.md                # 프로젝트 개요 및 사용법
```

## 5.2 Backend
```plaintext
java/
├── src/
│   ├── cart/                # 카드 관련 비지니스 로직
│   ├── config/              # 로그인, 시큐리티 관련 및 프록시 설정 파일
│   ├── main/                # 메인 페이지 관련 비즈니스 로직
│   ├── member/              # 멤버 관련 비지니스 로직
│   ├── review/              # 리뷰 관련 비지니스 로직
│   ├── security/            # 스프링 시큐리티 관련 로직
│   ├── fruit/               # 과일 관련 비지니스 로직
│   ├── Application.java     # 메인 실행파일 
│   ├── S3Service.java       # AWS S3 설정파일
│   package-lock.json        # 정확한 종속성 버전이 기록된 파일로, 일관된 빌드를 보장
│   buld.gradle              # 프로젝트 종속성 및 의존성 관리
├── .gitignore               # Git 무시 파일 목록
└── README.md                # 프로젝트 개요 및 사용법
```
<br/>
<br/>

