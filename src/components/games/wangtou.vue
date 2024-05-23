<template>
    <div class="wangtoubox">
        <van-tree-select
            v-model:main-active-index="activeIndex"
            height="100vh"
            class="wangtou"
            :items="items"
            >
            <template #content>
                <div class="content" v-if="activeIndex === 0">
                    <div class="kuaijie">
                        <div v-for="category in kuaijie" :key="category.text" :class="category.text" class="list">                    
                            <div class="item" v-for="child in category.children" :key="child.id">
                            {{ child.text }}
                            <span v-if="child.multiple">{{ child.multiple }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <van-image
                v-if="activeIndex === 1"
                src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg"
                />
            </template>
        </van-tree-select>
    </div>
    
</template>

<script setup>
import { ref } from 'vue';
const activeIndex = ref(0);
const items = [
    { text: '快捷' }, 
    { text: '1~10名' },
    { text: '两面' },
    { text: '冠亚和' },
    { text: '切换游戏' },
    { text: '存款' },
    { text: '取款' },
    { text: '客服' },
    { text: '返回' },
 ];
const kuaijie = [
    {   
        text: 'mingci',
        children: [
          { text: '冠军', id: 1 },
          { text: '亚军', id: 2 },
          { text: '第三名', id: 3 },
          { text: '第四名', id: 4 },
          { text: '第五名', id: 5 },
          { text: '第六名', id: 6 },
          { text: '第七名', id: 7 },
          { text: '第八名', id: 8 },
          { text: '第九名', id: 9 },
          { text: '第十名', id: 10 },
        ],
    },
    {
        text: 'haoma',
        children: [
            { text: '1', id: 1 , multiple:9.8},
            { text: '2', id: 2 , multiple:9.8},
            { text: '3', id: 3 , multiple:9.8},
            { text: '4', id: 4 , multiple:9.8},
            { text: '5', id: 5 , multiple:9.8},
            { text: '6', id: 6 , multiple:9.8},
            { text: '7', id: 7 , multiple:9.8},
            { text: '8', id: 8 , multiple:9.8},
            { text: '9', id: 9 , multiple:9.8},
            { text: '10', id: 10 , multiple:9.8},
        ]
    },
    {
        text: 'daxiao',
        children: [
            { text: '大', id: 1 , multiple:1.96},
            { text: '小', id: 2 , multiple:1.96},
            { text: '单', id: 3 , multiple:1.96},
            { text: '双', id: 4 , multiple:1.96},
        ]
    }
]
</script>

<style scoped>
.wangtoubox{
    margin-top: 220px;
    background: #efefef;
    padding-top: 6px;
}
.kuaijie{
    .list{
        display: grid;
        grid-template-columns: repeat(4, 1fr); /* 每行四列 */
        gap: 6px;
        margin-bottom: 10px;
        .item{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding: 10px;  
            border: 1px solid #1989fa;
            border-radius: 8px;          
            background: #fff;
            font-size: 16px;
        }
        span{
            font-size: 14px;
            color: #999;
        }
    }
    .mingci .item{
        color: #1989fa;
    }
    .haoma .item{
        font-size: 18px!important;
    }
    .daxiao .item{
        font-size: 18px!important;
    }
}

</style>