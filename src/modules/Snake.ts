import ScorePanel from "./ScorePanel"

// 设置蛇的类
class Snake {
    // 蛇的容器
    element: HTMLElement
    // 蛇头：获取第一个div
    head: HTMLElement
    // 蛇的躯干（包含蛇头）：获取所有div
    bodies: HTMLCollection

    constructor() {
        this.element = document.getElementById('snake')!
        // 获取snake下的第一个div
        this.head = document.querySelector('#snake > div') as HTMLElement
        this.bodies = this.element.getElementsByTagName('div')
    }

    // 获取蛇头X坐标
    get X() {
        return this.head.offsetLeft
    }

    // 获取蛇头Y坐标
    get Y() {
        return this.head.offsetTop
    }

    // 设置蛇头X坐标
    set X(value) {
        // 判断是否是否需要重新赋值
        if (this.X === value) return
        // 判断是否超出范围
        if (value < 0 || value > 290) {
            // 抛出异常
            throw new Error('撞墙了！')
        }

        // 判断蛇是否反向掉头 （GameControl中不加方向判断，就使用这个）
        if (this.bodies[1] && value === (this.bodies[1] as HTMLElement).offsetLeft) {
            if (value > this.X) {
                value = this.X -10
            } else {
                value = this.X + 10
            }
        }
        
        this.moveBodies()

        this.head.style.left = value + 'px'
        this.judgeBodies()
    }

    // 设置蛇头X=Y坐标
    set Y(value) {
        if (this.Y === value) return
        if (value < 0 || value > 290) {
            throw new Error('撞墙了！')
        }

        // 判断蛇是否反向掉头 （GameControl中不加方向判断，就使用这个）
        if (this.bodies[1] && value === (this.bodies[1] as HTMLElement).offsetTop) {
            if (value > this.Y) {
                value = this.Y -10
            } else {
                value = this.Y + 10
            }
        }

        this.moveBodies()

        this.head.style.top = value + 'px'
        this.judgeBodies
    }

    // 增加蛇身体
    addBodies() {
        // 在容器最后面增加一个div
        // insertAdjacentHTML()：将指定的文本解析为HTML或XML,并将结果节点插入到DOM树中的指定位置。
        // beforeend：最后
        this.element.insertAdjacentHTML('beforeend', '<div></div>')
    }

    // 身体移动
    moveBodies() {
        // 从后向前；后一个的坐标等于前一个
        for (let i = this.bodies.length - 1; i > 0; i--) {
            let x = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let y = (this.bodies[i - 1] as HTMLElement).offsetTop;

            (this.bodies[i] as HTMLElement).style.left = x + 'px';
            (this.bodies[i] as HTMLElement).style.top = y + 'px';
        }
    }

    // 判断是否相撞
    judgeBodies() {
        for (let i = 3; i < this.bodies.length; i++) {
            let dom = this.bodies[i] as HTMLElement
            let x = dom.offsetLeft
            let y = dom.offsetTop
            if (x === this.X && y === this.Y) {
                throw new Error('身体相撞了')
            }
            
        }
    }

}

export default Snake