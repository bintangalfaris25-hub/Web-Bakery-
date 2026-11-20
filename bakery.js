
// =================================
// DATA PRODUK DONAT
// =================================

const products = [
    { name: "Broww", price: 23.799 },
    { name: "Crumb Attack", price: 21.999 },
    { name: "Say Cheese", price: 29.899 },
    { name: "Coffee Latte", price: 21.980 },
    { name: "Signature BerryCano", price: 27.799 },
    { name: "Americano", price: 22.999 }
];

//MENYIMPAN PRODUK DALAM CART
let cart = {};


// =================================
// FORMAT HARGA RUPIAH
// =================================

function rupiah(number) {
    return "Rp " + number.toLocaleString("id-ID");
}


// =================================
// TAMBAHKAN PRODUK KE CART
// =================================

function addToCart(index) {

    // Memeriksa apakah produk tersedia
    if (!products[index]) {
        return;
    }

    // Jika belum ada, jumlah dimulai dari 0
    if (!cart[index]) {
        cart[index] = 0;
    }

    // Menambahkan jumlah produk
    cart[index]++;

    // Memperbarui tampilan cart
    updateCart();

    // Notifikasi
    alert(products[index].name + " berhasil ditambahkan ke Cart!");
}


// =================================
// MENAMBAH JUMLAH PRODUK
// =================================

function increaseItem(index) {

    if (cart[index]) {
        cart[index]++;
    }

    updateCart();
}


// =================================
// MENGURANGI JUMLAH PRODUK
// =================================

function decreaseItem(index) {

    if (cart[index] > 1) {
        cart[index]--;
    } else {
        delete cart[index];
    }

    updateCart();
}


// =================================
// MENGHAPUS PRODUK DARI CART
// =================================

function removeItem(index) {

    delete cart[index];

    updateCart();
}


// =================================
// UPDATE TAMPILAN CART
// =================================

function updateCart() {

    const orderList = document.getElementById("order-list");
    const cartCount = document.getElementById("cart-count");
    const totalPrice = document.getElementById("total-price");

    let total = 0;
    let count = 0;

    // Mengosongkan tampilan sebelumnya
    orderList.innerHTML = "";

    // Membaca setiap produk di cart
    for (const [index, quantity] of Object.entries(cart)) {

        const product = products[index];

        const subtotal = product.price * quantity;

        total += subtotal;
        count += quantity;

        // Menampilkan produk di Cart
        orderList.innerHTML += `
            <div class="order-item">

                <div class="product-info">
                    <strong>${product.name}</strong>
                    <small>${rupiah(product.price)} / item</small>
                </div>

                <div class="quantity">

                    <button onclick="decreaseItem(${index})">
                        -
                    </button>

                    <span>${quantity}</span>

                    <button onclick="increaseItem(${index})">
                        +
                    </button>

                </div>

                <div class="subtotal">
                    ${rupiah(subtotal)}
                </div>

                <button class="remove-btn"
                    onclick="removeItem(${index})">
                    ✕
                </button>

            </div>
        `;
    }

    // Jika Cart masih kosong
    if (count === 0) {

        orderList.innerHTML = `
            <div class="empty">
                Keranjang kamu masih kosong.
                Yuk, pilih donat favoritmu!
            </div>
        `;
    }

    // Update jumlah produk
    cartCount.innerText = count;

    // Update total harga
    totalPrice.innerText = rupiah(total);
}


// =================================
// TOMBOL CART NAVBAR
// =================================

function goToOrder() {

    document.getElementById("order").scrollIntoView({
        behavior: "smooth"
    });

}


// =================================
// CHECKOUT / ORDER NOW
// =================================

function checkout() {

    const count = Object.values(cart).reduce(
        (sum, quantity) => sum + quantity, 0
    );

    // Memeriksa apakah Cart kosong
    if (count === 0) {

        alert("Cart kamu masih kosong! Silakan pilih donat terlebih dahulu.");

        return;
    }

    let message = "===== PESANAN J.CO =====\n\n";

    let total = 0;

    // Membuat ringkasan pesanan
    for (const [index, quantity] of Object.entries(cart)) {

        const product = products[index];

        const subtotal = product.price * quantity;

        message += product.name + " x " + quantity +
            " = " + rupiah(subtotal) + "\n";

        total += subtotal;
    }

    message += "\n----------------------";
    message += "\nTOTAL: " + rupiah(total);
    message += "\n----------------------";

    // Menampilkan pesanan
    alert(message + "\n\nTerima kasih telah memesan!");

    // Mengosongkan Cart setelah checkout
    cart = {};

    updateCart();
}


// =================================
// TAMPILAN AWAL
// =================================

updateCart();