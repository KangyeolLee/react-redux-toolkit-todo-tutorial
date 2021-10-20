# Redux-ToolKit(RTK)를 쓱 써보자

Redux 진영의 구원자 RTK를 가볍게 쓱 써보자

# 소개

웹 어플리케이션에서 상태를 전역적으로 관리하기 위한 방법 중 예전부터 많이 사용되고 아직도 높은 점유율을 보이고 있는 라이브러리는 리덕스(Redux)이다. 하지만 리덕스는 몇 가지 번거로운 점을 가지고 있다.

- 방대한 양의 보일러 플레이트: 액션과 리듀서를 별도로 관리 + 늘어나는 코드의 양
- 객체의 불변성(`Immutability`)을 직접 관리
- 그로인한 러닝커브

몇 가지 더 꼽을 수 있겠지만 이게 핵심이라고 볼 수 있다.

리덕스의 공식 개발 도구로 등장한 Redux ToolKit은 이러한 점을 많이 해소하여 코드의 양을 줄이며
생각의 전환까지 가져올 수 있는 도구이다. 객체의 불변성 역시 자체적으로 `Immer.js` 라이브러리를 통해 개발자 대신 케어한다. 더 자세한 내용은 [공식문서](https://redux-toolkit.js.org/)를 참고하자.

# 쓱 둘러보기

RTK를 쓱 핥아보자. 자세한 내용은 공식문서를 참고하는 것을 추천한다.
다음은 리덕스로 구성하는 일반적인 카운터 예제이다.

```js
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

function increment() {
  return { type: INCREMENT };
}
function decrement() {
  return { type: DECREMENT };
}

function counter(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}

const store = Redux.createStore(counter);
```

매우 단순한 예제라 복잡한 코드로 생각하지 않을 수 있지만, 그럼에도 불구하고 `INCREMENT` 등의 액션 타입이 계속 중복되는 등의 비효율적인 구조를 볼 수 있다.

RTK는 기존 리덕스로 짜여진 구조를 이식하기 위한 몇 가지 기능을 제공한다. 해당 API들을 간단하게 살펴보자.

1. `configureStore`

- 기본적으로 `createStore`와 동일한 기능을 제공한다.
- 때문에 기존 코드의 `createStore`를 그대로 `configureStore`로 대체할 수 있다. 그 외 내부적으로 `Redux DevTools Extension`을 사용하기 위한 설정을 적용하고 기본적으로 `Redux Middleware`를 포함하고 있다.

2. `createAction`

- 액션 타입 문자열을 인자로 받고, 해당 타입을 사용하는 액션 생성자함수를 반환한다.
- `toString()` 메서드가 구현되어 있어 타입에 해당하는 문자열을 반환받을 수 있다. 또는 프로퍼티 `.type`을 통해 접근해서 얻을 수 있다. 이를 이용해 이전 카운터 예제의 액션 선언부를 단순화 할 수 있다.

```js
const increment = createAction("INCREMENT");
const decrement = createAction("DECREMENT");

function counter(state = 0, action) {
  switch (action.type) {
    case increment.type:
      return state + 1;
    case decrement.type:
      return state - 1;
    default:
      return state;
  }
}

const store = configureStore({ reducer: counter });
```

3. `createReducer`

- 일종의 룩업 테이블 객체를 사용해 리듀서를 작성한다. 이때 객체의 각 키는 리덕스 액션 type 문자열이며, 값은 리듀서 함수 자체이다.
- 키는 ES6 Object computed 속성을 이용해 단순하게 기입할 수 있다. 이때 `cretaeAction`으로 생성된 액션 생성자함수는 내부에 있는 모든 변수에 대해 `toString()`을 호출하기에 별도 `.type` 프로퍼티 없이 바로 사용 가능하다.

```js
const counter = createReducer(0, {
  [increment]: (state) => state + 1,
  [decrement]: (state) => state - 1,
});
```

이를 종합해보면 기존 리덕스 구조가 상당히 간소화 되었음을 알 수 있다.

```js
const increment = createAction("INCREMENT");
const decrement = createAction("DECREMENT");

const counter = createReducer(0, {
  [increment]: (state) => state + 1,
  [decrement]: (state) => state - 1,
});

const store = configureStore({
  reducer: counter,
});
```

4. `createSlice`

- 위와 같은 구조가 나쁜 것은 아니지만, 액션 선언부와 리듀서 선언부가 분리되어 독립적으로 존재한다는 점이 아쉽다.
- 특히 `Ducks` 패턴에 따르면 관련 액션 및 리듀서 등의 기능을 하나의 파일에서 모두 관리하는 것을 권고한다.
- `createSlice`는 생성된 리듀서 함수를 `reducer` 프로퍼티로 포함하는 `slice` 객체와 `actions`라는 객체 내부에서 생성된 액션 생성함수를 반환한다. 즉 쉽게 말해 액션 선언부와 리듀서 선언부를 하나의 객체로 관리할 수 있다.

```js
const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
});

const store = configureStore({
  reducer: conuterSlice.reducer,
});

// 또는 ES6 구조 분해 할당을 통해 다음과 같이 사용 가능
const { actions, reducer } = counterSlice;
const { increment, decrement } = actions;
```

- 즉 `createSlice`는 내부적으로 `createAction`과 `createReducer`를 사용하고 있는 함수이다. 만약 기존 리덕스의 구조를 독립적으로 계속 유지할 뚜렷한 이유가 없다면, 대부분 이 두 함수를 직접 사용할 필요 없이 `createSlice` 만으로 구조를 작성할 수 있다.
- `slice`의 의미는 공식문서에 따르면, 일반적인 리덕스 앱이 상태트리 최상단에 가지고 있는 JS객체이자 루트 리듀서를 가지게 되는데, 이때 해당 객체에서 `key/value` 쌍으로 구분되는 `object`를 `slice`라고 칭한다고 하고 있다. 그리고 해당 `slice`의 상태를 업데이트 하는 리듀서는 `slice reducer`라고 칭한다.
- `createSlice`에서 프로퍼티 `reducers` 내부에 선언되는 각각의 리듀서 로직은 `key`가 액션의 타입 문자열이 되고, `value`는 해당 액션이 디스패치 될 때 실행되게 되는 로직이다. 이때 생성된 리듀서는 현재 디스패치된 액션이 아닌 다른 액션들에 대해 자동으로 현재 상태를 반환하도록 처리되어 있기 때문에, 직접 핸들링해주지 않아도 된다.
- `craeteSlice`와 `craeteReducer`는 내부 변경 로직을 `Immer.js`의 `produce`로 래핑하여 처리한다. 따라서 기존 리덕스에서는 절대 state를 직접적으로 변경하지 않고 불변성을 유지하는 방식으로 작성해야 했지만, 해당 함수 내부에서는 직접 변형하는 형식으로 코드를 직관적으로 작성이 가능하다.
- 다음은 TODO 리듀서를 리덕스와 RTK로 작성한 예제이다.

```js
// Redux
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: true,
        }
      ];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
}

export default todos;

// RTK
const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo(state, action) {
      const { id, text } = action.payload;
      state.push({ id, text, completed: true });
    },
    toggleTodo(state, action) {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    }
  }
});

export const { addTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
```

- 마지막으로 `payload`를 사용자 정의해서 리턴해야 하는 경우에는 리듀서 함수 자체가 아닌 `reducer`와 `prepare` 함수를 포함하는 객체를 전달하면 된다.

```js
// 👇👇👇 createAction을 사용하는 경우 payload 전처리 과정
let nextTodoId = 0;
export const addTodo = createAction('ADD_TODO', text => {
  return {
    payload: { id, nextTodoId++, text }
  }
});

// 👇👇👇 createSlice 내부에서 해결
const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: {
      reducer(state, action) {
        const { id, text } = action.payload;
        state.push({ id, text, completed: true });
      },
      prepare(text) {
        return { payload: { text, id: nextTodoId++ }};
      }
    }
  }
})
```

5. `createSelector`

- 필터링 등의 과정에서는 표시해야 할 목록만 선택하는 등의 선택과정이 필요하고, 이를 정의한 함수를 일종의 선택기(`selector`)라고 부른다.
- 리덕스 앱은 일반적으로 `memoized` 기능이 있는 선택기 함수를 정의할 수 있는 `createSelector` 함수가 있다. 이는 내부적으로 `Reselect` 라는 라이브러리를 사용하는데, 메모된 선택기는 실제 입력이 변경된 경우에만 값을 다시 계산하기에 최적화에 용이하다.
- 따라서 조건에 따라 필터링 되는 경우에는 `createSelector`를 이용해 `selector`를 정의하여 사용가능하다.

# 쓱 결론

리덕스는 리덕스였다.

# References

1. https://redux-toolkit.js.org/
2. https://velog.io/@undefcat/series/redux-toolkit-todo
3. https://ibrahimovic.tistory.com/31
4. http://blog.hwahae.co.kr/all/tech/tech-tech/6946/
5. https://blog.rhostem.com/posts/2020-03-04-redux-toolkits
