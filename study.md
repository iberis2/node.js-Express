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
package.json 안 `script` 객체에는 프로젝트에서 어떤 파일을 실행하거나 테스트 하는 등의 동작을 해야할 때 필요한 명령어(`npm start`, `npm test` 등)들을 지정해놓을 수 있다. \
package.json 안 script 프로퍼티 값인 객체 안에 명령어와 실행할 내용을 프로퍼티로 전달하면 `npm + run + 명령어`로도 해당 내용을 실행할 수 있다. \
지정어 **start**, **test** 같은 명령어는 run 없이 `npm + 명령어`로도 사용할 수 있다.

```json
"scripts": {
    "start": "nodemon app.js"
  },
  // npm start 로 nodemon을 실행시킬 수 있다. 수정 후 저장할 때마다 서버가 자동으로 재시작된다.
```

POST, PUT 리퀘스트가 JSON 에러가 발생하면서 안됐었는데, \
포트 번호를 바꾸고, POST에 URL path를 "/api/members/" 에서 "/api/members"로 고치니까 갑자기 됐다.

postman 웹사이트에서는 웹API만 리퀘스트를 보낼 수 있고, \
desktop-version은 따로 제공중이어서 어플을 다운받아야만 send request가 가능하다.
어플 상에서는 GET, POST, PUT, DELETE 모두 잘 된다.

### PUT 수정 리퀘스트

PUT 리퀘스트에서 members 객체를 직접 수정하지 않았는데도, 요소들 중 id 프로퍼티가 같은 요소를 변수 member에 담아 변수만 수정해도 원본 객체가 수정된다.
배열에 객체가 중첩된 구조여서, 요소를 member 변수에 담으면 얕은 복사가 일어나기 때문에,
요소만 수정해도 원본 객체가 변한다.

```javascript
const array1 = [{ a: 5 }, 12, 8, 130, 44];
const found = array1.find((element) => element["a"] === 5);

console.log(found); //  Object { a: 5 }
found["a"] = 1;

console.log(array1); // > Array [Object { a: 1 }, 12, 8, 130, 44]
```

복사한 found에서 a 프로퍼티 값을 바꿔도 array1 의 a 프로퍼티값도 바뀐다

```javascript
app.put("/api/members/:id", (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  const member = members.find((m) => m.id === Number(id));
  if (member) {
    for (prop in newInfo) {
      member[prop] = newInfo[prop];
    }
    res.send(member);
  } else {
    res.status(404).send({ message: "There is no member with the id!" });
  }
});
```

member 만 바꿨지만 members 객체의 요소도 바뀐다.
