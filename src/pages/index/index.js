console.log(0.1 + 0.2)

if(module && module.hot) {
    module.hot.accept()
}

class Animal {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}

const dog = new Animal('dog');