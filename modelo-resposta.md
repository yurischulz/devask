Existem dois tipos de componentes no React: Class e Functional Components.

Class components são [ES6 classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) estendidos de [React.Component](https://reactjs.org/docs/react-component.html) e podem ter [state e lifecycle methods](https://reactjs.org/docs/state-and-lifecycle.html):

```JSX
class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ‘’
    };
  }

  componentDidMount() {
    /* ... */
  }

  render() {
    return <div>{this.state.message}</div>;
  }
}
```

Functional components são funções que apenas aceitam/recebem argumentos como propriedades do Component e retornam um JSX válido:

```JSX
function Message(props) {
  return <div>{props.message}</div>
}
// Or as an arrow function
const Message = (props) =>  <div>{props.message}</div>
```

Como pode ver, não há state ou lifecycle. Porém, desde a versão 16.8 do React, pode-se usar Hooks.

[React Hooks](https://blog.logrocket.com/react-reference-guide-hooks-api/) são funções que adicionam variáveis de estado para um componente funcional e implementam métodos de lifecycle das classes.
Hooks tendem a começar com `use`.

`useState` recebe o valor inicial do estado como um argumento:

```JSX
import React, { useState } from 'react';

const Message= () => {
  const messageState = useState( '' );
  const listState = useState( [] );
}
```

Além disto, `useState` retorna um _array_, onde o primeiro elemento é a variável de estado e o segundo elemento é uma função para atualizar o valor da variável:

```JSX
const Message= () => {
  const messageState = useState( '' );
  const message = messageState[0]; // Contains ''
  const setMessage = messageState[1]; // It’s a function
}
```

Porém, é uma boa prática utilizar [array destructuring](https://dev.to/sarah_chima/destructuring-assignment---arrays-16f) para simplificar o código:

```JSX
const Message= () => {
  const [message, setMessage]= useState( '' );
}
```

Desta forma você poderá usar a variável de estado dentro do componente funcional como qualquer outra variável:

```JSX
const Message = () => {
  const [message, setMessage] = useState( '' );

  return (
    <p>
      <strong>{message}</strong>
    </p>
  );
};
```

O segundo elemento retornado pelo `useState` é uma função que recebe um novo valor para atualizar a variável de estado.

Segue um exemplo onde usa-se `input[type="text"]` para atualizar o estado a cada alteração:

```JSX
const Message = () => {
  const [message, setMessage] = useState( '' );

  return (
    <div>
      <input
         type="text"
         value={message}
         placeholder="Enter a message"
         onChange={e => setMessage(e.target.value)}
       />
      <p>
        <strong>{message}</strong>
      </p>
    </div>
  );
};
```

Você pode ler mais sobre manipulação de estado [neste artigo](https://blog.logrocket.com/a-guide-to-usestate-in-react-ecb9952e406c/), e na [documentação oficial](https://pt-br.reactjs.org/docs/hooks-state.html).
