import Food from './Food'
import Snake from './Snake'
import ScorePanel from './ScorePanel'

// 游戏控制器，控制其他所有类
class GameControl {
    food: Food
    snake: Snake
    scorePanel: ScorePanel

    // 存储蛇移动方向
    direction: string = ''

    // 设置蛇移动速度（初始速度）
    initialTime: number
    // 设置升级需要减去的时间
    intervalTime: number

    // 判断蛇是否活着
    isLive = true

    constructor(initialTime: number = 300, intervalTime: number = 30) {
        // 创建实例
        this.food = new Food()
        this.snake = new Snake()
        this.scorePanel = new ScorePanel()

        this.intervalTime = intervalTime
        this.initialTime = initialTime - (this.scorePanel.level - 1) * intervalTime

        // 调用即执行
        this.init()
    }

    // 游戏初始化
    init() {
        // 绑定键盘按下事件
        // this.keydownHandle.bind(this)：
        // 不加.bind(this)，keydownHandle方法指向document
        // 加上.bind(this)，创建一个新花函数，this指向当前当前对象（GameControl的实例）
        document.addEventListener('keydown', this.keydownHandle.bind(this))

        this.run()
    }

    // 键盘按下响应事件
    keydownHandle(event: KeyboardEvent) {
        let key = event.key.toLocaleLowerCase()
        switch(true) {
            case (key.includes('up') || key === 'w') && this.direction !== 'down':
                this.direction = 'up'
                break
            case (key.includes('right') || key === 'd') && this.direction !== 'left':
                this.direction = 'right'
                break
            case (key.includes('down') || key === 's') && this.direction !== 'up':
                this.direction = 'down'
                break
            case (key.includes('left') || key === 'a') && this.direction !== 'right':
                this.direction = 'left'
                break
        }
        console.log(this.direction)
    }

    // 蛇移动
    run() {
        // 获取蛇头坐标
        let X = this.snake.X
        let Y = this.snake.Y

        switch(this.direction) {
            case 'up':
                Y -= 10
                break
            case 'right':
                X += 10
                break
            case 'down':
                Y += 10
                break
            case 'left':
                X -= 10
        }

        this.checkEat(X, Y)

        try {
            this.snake.X = X
            this.snake.Y = Y
        } catch(e) {
            console.log(e)
            alert('GAME OVER! ' + e.message)
            this.isLive = false
        }

        this.isLive && setTimeout(this.run.bind(this), this.initialTime)
    }

    // 判断是否吃的食物
    checkEat(x: number, y: number) {
        if (x === this.food.X && y === this.food.Y) {
            // 改变食物位置
            this.food.change()
            // 增加蛇的躯干
            this.snake.addBodies()
            // 增加分数
            this.scorePanel.addScore()
        }
    }
}

export default GameControl
