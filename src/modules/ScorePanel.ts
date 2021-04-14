// 定义计分区
class ScorePanel {
    // 分数，设置默认值为0
    score = 0
    // 等级，设置默认值为1
    level = 1

    // 获取dom中位置
    scoreEle: HTMLElement
    levelEle: HTMLElement

    // 设置多少分数晋级，不传默认为10
    upScore: number
    // 最高级别，不传默认为10
    maxLevel: number

    constructor(upScore: number = 10, maxLevel: number = 10) {
        this.scoreEle = document.getElementById('score')!
        this.levelEle = document.getElementById('level')!
        this.upScore = upScore
        this.maxLevel = maxLevel
    }

    // 分数增加
    addScore() {
        this.scoreEle.innerHTML = ++this.score + ''

        // 判断当前分数是否可以晋级
        if (this.score % this.upScore === 0) {
            this.addLevel()
        }
    }

    // 等级提升
    addLevel() {
        // 判断当前是否为最高级
        if (this.level < this.maxLevel) {
            this.levelEle.innerHTML = ++this.level + ''
        }
    }
}

export default ScorePanel