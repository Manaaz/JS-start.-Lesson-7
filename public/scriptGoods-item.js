const goods_item = Vue.component('goods_item', { // Создание нового компонента
    template: `
            <div :data-id="id" class="goods_item">
                <!--<div class="card-img">
                    <img src="" class="rounded mx-auto d-block">
                </div>-->
                <h5 class="card-title">{{ title }}</h5>
                <p class="card-text text-price">{{ price }}</p> 
            </div>`,
    props: ['title', 'price', 'id'] // задаем параметры компонента
})


export default {
    components: {
        'goods_item': goods_item
    }
};