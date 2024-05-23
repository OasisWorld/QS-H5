import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import pinia from '@/stores/index'


//引入vant组件
import 'vant/lib/index.css';
import '@vant/touch-emulator';
import { Button ,Tabbar,TreeSelect, TabbarItem,Divider,PullRefresh,Overlay,Swipe,SwipeCell, SwipeItem,Image as VanImage,Icon ,Grid, GridItem,NavBar,Form,Field, CellGroup,Uploader,Empty,Toast,Popup,List,FloatingBubble,CountDown} from 'vant';

//引入路由
import router from "@/router/index.js";
import store from "@/stores/index.js";

const app = createApp(App);
app.use(pinia);
app.use(store);
app.use(Form);
app.use(Toast);
app.use(Empty);
app.use(Field);
app.use(Uploader);
app.use(CellGroup);
app.use(Button);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Swipe);
app.use(SwipeItem);
app.use(VanImage);
app.use(Icon);
app.use(Divider);
app.use(PullRefresh);
app.use(Grid);
app.use(Overlay);
app.use(GridItem);
app.use(NavBar);
app.use(Popup);
app.use(SwipeCell);
app.use(List);
app.use(CountDown);
app.use(FloatingBubble);
app.use(TreeSelect);
app.use(router);
app.mount('#app');

