## npm install

배포 용도로 필요한 패키지들은 package.json 파일 안에서 dependencies 필드에,
개발 용도로만 필요한 패키지들은 devDependencies 필드에 저장되어야 한다.

npm install 시 아무 설정도 안하면, \
기본적으로 --save-prod 로 배표용으로 dependencies 필드에 설치된다. \
할 때 끝에 --save-dev 옵션을 주면 패키지 정보를 개발용 devDependencies 필드에 저장된다.

프로젝트의 코드를 배포 용도로 실행하기 전에는 보통 이런 순서의 작업을 거칩니다.
(1) 실제 개발 중이던 프로젝트 디렉토리를 하나 더 복사 \
(2) 새 디렉토리에서 node_modules 디렉토리 삭제 \
(3) `npm install --production`(또는 `NODE_ENV=production npm install`)를 실행해서 devDependencies 필드에 있던 패키지들은 제외하고, \
**dependencies 필드에 있던 패키지들만 node_modules 디렉토리에 재설치** \
(4) 실제 서비스를 위해 코드 실행(npm start 등 실행)

`npm install` **`nodemon`** `--save-dev` : 수정할 때마다 서버를 끄고 다시 킬 필요없이 수정 후 새로 저장할때마다 자동으로 서버 재시작할 수 있다. \
`npx nodemon 실행파일.js` 로 실행한다.\
package.json 안 script 프로퍼티 값인 객체 안에 명령어와 실행할 내용을 프로퍼티로 전달하면 `npm + run + 명령어`로도 해당 내용을 실행할 수 있다. \
지정어 **start**, **test** 같은 명령어는 run 없이 `npm + 명령어`로도 사용할 수 있다.

```json
"scripts": {
    "start": "nodemon app.js"
  },
  // npm start 로 nodemon을 실행시킬 수 있다. 수정 후 저장할 때마다 서버가 자동으로 재시작된다.
```
