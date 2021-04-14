import './style/index.less'
import GameControl from './modules/GameControl'

const game = new GameControl()

class Animal {
    constructor(public name: string) {}

    sayHello(){
        console.log(`${this.name}sui`)
    }
}

class Dog extends Animal {
    run() {
        console.log(`${this.name}--咋`)
    }
}

let d = new Dog('dd')
console.log(d)
d.sayHello()
d.run()