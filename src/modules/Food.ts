// 创建食物-Food类
class Food {
    // 表示食物对应的元素
    element: HTMLElement

    constructor() {
        // 获取页面中的food元素，赋值给element
        // 加!，表示这元素一定存在，不用在检测
        this.element = document.getElementById('food')!
    }

    // 获取元素X轴坐标
    get X() {
        return this.element.offsetLeft
    }

    // 获取元素Y轴坐标
    get Y() {
        return this.element.offsetTop
    }

    // 修改食物坐标
    change() {
        // 食物大小为10px
        // 总范围0~300，蛇移动一次为10px
        // 因此top/left值为10的整数倍，即（0~29）*10

        let top = Math.round(Math.random() * 29) * 10
        let left = Math.round(Math.random() * 29) * 10

        this.element.style.top = top + 'px'
        this.element.style.left = left + 'px'
    }
}

export default Food;