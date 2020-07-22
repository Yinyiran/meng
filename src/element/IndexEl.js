import Vue from "vue"
import { Carousel, CarouselItem, Message, MessageBox } from "element-ui"

Vue.use(Carousel)
Vue.use(CarouselItem)

Vue.prototype.$message = Message;
Vue.prototype.$messagebox = MessageBox;