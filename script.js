const products = [
  {id:1,title:'Wind Chimes',price:24.00,cat:'Wind Chimes',img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=8d2e2b9b2a0a6c5c0a16c1461b8c9f9f',short:'A soft-toned wind chime made from reclaimed wood.',spec:'Length 60cm • Reclaimed wood • Brass tubing'},
  {id:2,title:'Wooden Animals',price:38.00,cat:'Bird Houses',img:'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=0f3b0c1a7f3b6a0c93f8a1a3b1c2d3e4',short:'Hand-carved oak bird house with drainage.',spec:'Oak wood • 15x15x20cm • Hand-finished'},
  {id:3,title:'Bird Feeders',price:29.00,cat:'Hanging Tree Bird Feeders',img:'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=7e0b8c2a9a1a9b6c3d4e5f6a7b8c9d1e',short:'A hanging tray feeder perfect for squirrels-free feeding.',spec:'Pine • Rope included • 30cm diameter'},
  {id:4,title:'Bug Hotels',price:22.50,cat:'Bug Hotels',img:'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3c2b1c4d5e6f7a8b9c0d1e2f3a4b5c6d',short:'Create shelter for pollinators and beneficial insects.',spec:'Mixed wood • 30x20x10cm • Untreated wood'},
  {id:5,title:'Bird House',price:19.00,cat:'Wooden Bowls',img:'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=d7b2c9425c3a9c8b6d0f8a1f5f1d1d3b',short:'Hand-turned maple bowl, food-safe finish.',spec:'Maple wood • 18cm diameter • Food safe oil finish'},
  {id:6,title:'Bird Feeder',price:44.00,cat:'Wooden Animal Decor',img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=8d2e2b9b2a0a6c5c0a16c1461b8c9f9f',short:'Set of three carved wooden animals for shelf display.',spec:'Mixed woods • Three sizes • Smooth finish'}
];

const grid = document.getElementById('productGrid');

function currency(n) {
  return '£' + n.toFixed(2);
}

products.forEach(p => {
  const el = document.createElement('div');
  el.className = 'product-card fade-in';
  el.innerHTML = `<img src="${p.img}" alt="${p.title}"><div class="product-info"><div class="product-title">${p.title}</div><div class="product-price">${currency(p.price)}</div></div>`;
  el.addEventListener('click', () => openProduct(p.id));
  grid.appendChild(el);
});

const testimonials = [
  {name:'Clara J',text:'The wind chime is so calming — it feels like a little forest on my balcony.'},
  {name:'Marcus P',text:'High quality birdhouse. Our blue tits moved in within a week!'},
  {name:'Sana R',text:'Beautifully packed and fast delivery. The bug hotel is doing its job.'}
];

const testiWrap = document.getElementById('testiWrap');
let ti = 0;

function renderTesti() {
  testiWrap.innerHTML = '';
  const t = testimonials[ti % testimonials.length];
  const card = document.createElement('div');
  card.className = 'testimonial-card';
  card.innerHTML = `<div style="font-style:italic">“${t.text}”</div><div style="margin-top:8px;font-weight:700">— ${t.name}</div>`;
  testiWrap.appendChild(card);
  ti++;
}

renderTesti();
setInterval(renderTesti, 4500);

const modal = document.getElementById('productModal');
const mainImg = document.getElementById('mainImg');
const thumbs = document.getElementById('thumbs');
const pTitle = document.getElementById('pTitle');
const pPrice = document.getElementById('pPrice');
const pShort = document.getElementById('pShort');
const pSpec = document.getElementById('pSpec');
const pCat = document.getElementById('pCat');
const related = document.getElementById('related');
let currentProduct = null;

function openProduct(id) {
  const p = products.find(x => x.id === id);
  currentProduct = p;
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
  mainImg.src = p.img;
  pTitle.textContent = p.title;
  pPrice.textContent = currency(p.price);
  pShort.textContent = p.short;
  pSpec.textContent = p.spec;
  pCat.textContent = p.cat;
  thumbs.innerHTML = '';
  
  const imgs = [p.img, products[(p.id) % products.length].img, products[(p.id + 2) % products.length].img];
  imgs.forEach((src, i) => {
    const t = document.createElement('img');
    t.src = src;
    if (i === 0) t.classList.add('active');
    t.addEventListener('click', () => {
      document.querySelectorAll('.thumbs img').forEach(im => im.classList.remove('active'));
      t.classList.add('active');
      mainImg.src = src;
    });
    thumbs.appendChild(t);
  });
  
  related.innerHTML = '';
  const rels = products.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 2);
  rels.forEach(r => {
    const d = document.createElement('div');
    d.className = 'product-card';
    d.style.padding = '8px';
    d.innerHTML = `<img src="${r.img}" alt="${r.title}" style="height:90px"><div style="padding-top:6px;font-size:14px">${r.title}<div style="font-weight:700;margin-top:6px">${currency(r.price)}</div></div>`;
    d.addEventListener('click', () => openProduct(r.id));
    related.appendChild(d);
  });
}

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }
});

mainImg.addEventListener('click', () => {
  if (mainImg.style.transform === 'scale(2)') {
    mainImg.style.transform = 'scale(1)';
    mainImg.style.cursor = 'zoom-in';
    mainImg.style.transition = 'transform .3s ease';
  } else {
    mainImg.style.transform = 'scale(2)';
    mainImg.style.cursor = 'zoom-out';
    mainImg.style.transition = 'transform .3s ease';
  }
});

const cartBtn = document.getElementById('cartBtn');
const cartDrawer = document.getElementById('cartDrawer');
const cartCount = document.getElementById('cartCount');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');