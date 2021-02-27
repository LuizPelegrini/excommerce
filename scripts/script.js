window.onload = () => {
  let cart = [];

  const $productListEl = $('#product-list');
  const loadingEl = document.getElementById('loading-text');
  const modalEl = document.getElementById('modal--item-added-to-cart');

  // as soon as the page is rendered, fetch products from API
  fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(json => {
      buildItems(json);
      loadingEl.style.display = 'none';
    });

  function buildItems(data){
    /* TEMPLATE
    <li class="product">
      <img src="..." alt="">
      <span class="product--category">Category</span>
      <span>Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5</span>
      <span>3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability</span>
      <button type="button" class="btn btn-primary">Add Cart</button>
    </li> */
    data.forEach(item => {
      const $liProduct = $('<li></li>').addClass('product')
        .append($('<img>').attr({src: item.image}))
        .append($('<span></span>').addClass('product--category').append(item.category))
        .append($('<span></span>').addClass('product--title').append(item.title))
        .append($('<span></span>').append(item.description))
        .append($('<button></button>').attr({ type: 'button'}).addClass('btn').append('Add Cart')).click(evt => {
          evt.preventDefault();
          addItemToCart(item);
        });

      $productListEl.append($liProduct);
    });

    $('.container').removeClass('container--centered');
  }

  function addItemToCart(item){
    cart.push(item);

    // modal--item-added-to-cart
    $('.modal-body img').attr({src: item.image});
    $('.modal-body .modal--item-title').text(item.title);
    $('.modal-body .modal--item-pricing').text(formatPrice(item.price));
    $('#modal--item-added-to-cart').modal('show');

    console.log(cart);
  }
};

// To currency format
function formatPrice(value){
  return Intl.NumberFormat('en-US', {
     currency: 'USD',
      style: 'currency'
  }).format(value);
}


