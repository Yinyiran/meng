// // 订阅/发布者模式（观察者）
// // pub / sub这个应该大家用到的最广的设计 模式了
// // 在这种模式中，并不是一个对象调用另一个对象的方法，而是一个对象订阅另一个对象
// // 特定活动并在状态改变后获得通知，订阅者因此也成为观察者，而被观察的对象成为发布者或主题。当发生了一个重要事件的时候发布者会通知（调用）所有订阅者并且可能经常以事件对象的形式传递消息。
// class EventBus {
//   // 存储事件
//   constructor() {
//     this.tasks = [];
//   }
//   // 绑定事件
//   $on(eName, cb) {
//     typeof cb == "function"
//       ? this.tasks[eName] || (this.tasks[eName] = [])
//       : this.Error(cb, "is not function")
//     this.tasks[eName].some(fn => fn === cb)
//       ? true
//       : this.tasks[eName].push(cb) // 避免重绑定
//   }
//   // 触发事件
//   $emit(eName, ...arg) {
//     let taskQueue;
//     this.tasks[eName] && this.tasks[eName].length > 0
//       ? (taskQueue = this.tasks[eName])
//       : this.Error(eName, "is not defined or is a array of having empty callback")
//     taskQueue.forEach(fn => fn(...arg))
//   }
//   // 绑定事件（只触发一次）
//   $once(eName, cb) {
//     let fn = (...arg) => {
//       this.$off(eName, fn)
//       cb(...arg)
//     }
//     typeof cb == "function" && this.$on(eName, fn)
//   }
//   // 卸载事件
//   $off(eName, cb) {
//     let taskQueue;
//     this.tasks[eName] && this.tasks[eName].length > 0
//       ? (taskQueue = this.tasks[eName])
//       : this.Error(eName, "is not exist")
//     if (typeof cb === "function") {
//       let index = taskQueue.findIndex(v => (v == cb))
//       index != -1 && taskQueue.splice(index, 1)
//     }
//     if (typeof cb === "undefined") taskQueue.length = 0
//   }
//   Error(node, errorMsg) {
//     throw Error(`${node} ${errorMsg}`)
//   }
// }

// const EventSinks = {
//   add(x, y) { console.log("总和: " + x + y) },
//   multip(x, y) { console.log("乘积: " + x + y) },
//   onceEvent() { console.log("我执行一次之后就卸载") }
// }

// let bus = new EventBus();
// bus.$on("operate", EventSinks.add)
// bus.$on("operate", EventSinks.add)
// bus.$emit("operate", 3, 5)
// bus.$off("operate")
// bus.$emit("operate", 3, 5)
// bus.$once("onceEmit", EventSinks.onceEvent)
// bus.$emit("onceEmit")
// bus.$emit("onceEmit")


// 单例模式
// 单例模式的定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点。实现的方法为先判断实例存在与否，如果存在则直接返回，否则就创建实例再返回，这就保证了一个类只实例化一次
// 一个单一对象。比如：弹窗，无论点击多少次，弹窗只应该被创建一次

class Singleton {
  constructor(x, y) {
    this.a = x;
    this.b = y
  }
  a = ""
  b = ""
}

Singleton.getInstance = (function () {
  let instance;
  return function (x, y) {
    if (!instance) {
      instance = new Singleton(x, y)
    }
    return instance
  }
})();
let s1 = Singleton.getInstance(2, 4)
let s2 = Singleton.getInstance()
console.log(s1, s2)
console.log(s1 === s2)
// 当我们再次创建时，如果实例化了，就不在实例化，直接返回，上面可以看出，二者相同


// 策略模式
// 策略模式的定义：定义一系列的算法，把他们一个个封装起来，并且使他们可以互相替换