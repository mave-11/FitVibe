

document.addEventListener("DOMContentLoaded", function () {
    var cart = document.querySelector('.sidebar');
    var cartCount = document.getElementById('cart-count');

    function open_cart() {
        if (cart) {
            cart.classList.add("active");
        } else {
            console.error("العنصر .sidebar غير موجود");
        }
    }

    function close_cart() {
        if (cart) {
            cart.classList.remove("active");
        }
    }


    window.open_cart = open_cart;
    window.close_cart = close_cart;

    function updateCartCount() {
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }

    updateCartCount();
});

document.addEventListener("DOMContentLoaded", function () {
    var cartList = document.getElementById('cart-list');
    var cartTotal = document.querySelector('.cart-total');
    var cartCount = document.getElementById('cart-count');

    if (!cartList || !cartTotal || !cartCount) {
        console.error('عنصر "cart-list" أو "cart-total" أو "cart-count" غير موجود');
        return;
    }

    function updateCartCount() {
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.textContent = cart.length;
    }

    function loadCart() {
        var cart = JSON.parse(localStorage.getItem('cart')) || [];


        cartList.innerHTML = '';


        var totalAmount = 0;

        cart.forEach(function (item, index) {
            var li = document.createElement('li');
            li.innerHTML = `
              <img src="${item.image}" width="50"> 
              <strong>${item.title}</strong> - ${item.price}
              <!-- أيقونة الحذف مع إضافة index لجعل كل زر فريد -->
              <button class="remove-item" data-index="${index}">
                  <i class="fa-solid fa-trash"></i> <!-- أيقونة سلة المهملات -->
              </button>
          `;
            cartList.appendChild(li);


            var price = parseFloat(item.price.replace('$', ''));
            totalAmount += price;
        });


        cartTotal.textContent = `$${totalAmount.toFixed(2)}`;


        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                removeFromCart(index);
            });
        });

        updateCartCount();
    }

    function removeFromCart(index) {
        var cart = JSON.parse(localStorage.getItem('cart')) || [];

        dex
        cart.splice(index, 1);


        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart(); // تحديث القائمة بعد الإزالة
    }


    loadCart();

    var addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault(); // منع إعادة تحميل الصفحة

            var product = button.closest('.product');
            var productTitle = product.querySelector('.title').textContent;
            var productPrice = product.querySelector('.price').textContent;
            var productImage = product.querySelector('img').getAttribute('src');

            var cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({ title: productTitle, price: productPrice, image: productImage });
            localStorage.setItem('cart', JSON.stringify(cart));

            alert(productTitle + " تمت إضافته إلى السلة!");
            loadCart(); // تحديث السلة بعد الإضافة
        });
    });
});

