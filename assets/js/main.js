

//toggle button

function toggle_visibility(id) {
    var e = document.getElementById(id);
    if (e.style.display == 'none' || e.style.display=='') e.style.display = 'block';
    else e.style.display = 'none';
}



//accordion
var item = $('.accordion .inner').children('.accordion');
item.parent().siblings().addClass('arrow');

var toggleElements = document.getElementsByClassName('toggle');

for(var i = 0; i < toggleElements.length; i++){
    toggleElements[i].addEventListener('click', animateAccordion, false);
}

function animateAccordion(e){
    var innerContent = e.srcElement.nextElementSibling;
    if(innerContent.style.height == ''){
        innerContent.className = 'inner testing';
        var elementHeight =  innerContent.clientHeight;
        innerContent.className = 'inner';
        innerContent.style.height = elementHeight+'px';
        innerContent.style.height = 'auto';
        innerContent.setAttribute('class', 'inner active');
    }else{
        innerContent.style.height = innerContent.clientHeight+'px';
        innerContent.style.height = '';
        innerContent.setAttribute('class', 'inner');
    }
}



//realizing of search


(function () {
    var App = {
        load : function() {
            var xhr,
                that;

            xhr = new XMLHttpRequest();
            that = this;

            console.log('json downloaded');
            xhr.overrideMimeType('application/json');
            xhr.open('GET', 'testTask.json', true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == '200') {
                    that.render(that.serialize(xhr.responseText));
                }
            };
            xhr.send(null);
        },
        render : function(data) {

            var div = document.getElementById('product-list');

            for(var index in data) {
                var product,
                    tmpl;

                product = data[index];
                tmpl = '<div id="' + index + '" class="content-item" ' +
                    'data-name="' + product.productName + '" ' +
                    'data-type="' + product.productType + '">' +
                    '<h2>' + product.productName + '</h2>' + '<div class="product-img"></div>' + '<div class="product-description">Описание товара, можно рыбой. Сдругой стороны, реализация намеченных плановых заданий требуют от нас анализа систем массового участия. Разнообразный и богатый опыт укрепление и развитие структуры влечет</div>' + '<button class="buy">купить</button>'
                    '</div>';
                div.innerHTML = div.innerHTML + tmpl;
            }
        },
        search : function(keyword) {
            var products,
                re;

            products = document.getElementsByClassName('content-item');
            keyword = keyword.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
            re = new RegExp('^(.*?(' + keyword + ')[^$]*)$', 'i');

            Array.prototype.filter.call(products, function(product){
                var data = product.dataset;

                if(data.name.search(re) != -1 || data.type.search(re) != -1)
                    $(product).show();
                else
                    $(product).hide();
            });
        },
        serialize : function(data) {
            return JSON.parse(data);
        },
        init : function() {
            this.load();
            var that = this,
                button = document.getElementById('search-button');
                document.getElementById('search-field').addEventListener('keyup', function () {
                    that.search(this.value);
                });
        }
    }

    App.init();

})();