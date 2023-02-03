'use strict';

const e = React.createElement;

class Test extends React.Component {
    render() {
        return e('p', {}, 'Made from scratch with resentment');
    }
}

class UserTable extends React.Component {
    
}

fetch("http://localhost:8080/users")
    .then((response) => response.json())
    .then((users) => console.log(JSON.stringify(users._embedded)))


const domContainer = document.querySelector('#user_form');
const root = ReactDOM.createRoot(domContainer);
root.render(e(Test));