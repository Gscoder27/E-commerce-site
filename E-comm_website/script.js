const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');
const closeNavbar = document.getElementById('close-navbar');
hamburger.addEventListener('click', function() {
  navbar.classList.toggle('active');
  hamburger.style.display = 'none';
});

closeNavbar.addEventListener('click', function() {
  navbar.classList.remove('active');
  hamburger.style.display = 'block';
});

// Close menu when clicking outside (mobile UX)
document.addEventListener('click', function(e) {
  if (window.innerWidth <= 900 && navbar.classList.contains('active')) {
    if (!navbar.contains(e.target) && e.target !== hamburger && !hamburger.contains(e.target)) {
      navbar.classList.remove('active');
      hamburger.style.display = 'block';
    }
  }
});

// Optional: Close menu on nav link click (mobile)
navbar.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      navbar.classList.remove('active');
      hamburger.style.display = 'block';
    }
  });
});

// On resize, reset hamburger/nav state
window.addEventListener('resize', function() {
  if (window.innerWidth > 900) {
    navbar.classList.remove('active');
    hamburger.style.display = 'none';
  } else {
    hamburger.style.display = 'block';
  }
});

// Product click handler for Shop.html to open sproduct.html with correct product
// Add this to script.js

document.addEventListener('DOMContentLoaded', function() {
  // Only run on Shop.html
  if (window.location.pathname.toLowerCase().includes('shop.html')) {
    // Featured Products (first .pro-container)
    var proContainers = document.querySelectorAll('.pro-container');
    if (proContainers.length > 0) {
      // Featured Products
      proContainers[0].querySelectorAll('.pro').forEach(function(card, idx) {
        card.addEventListener('click', function(e) {
          if (e.target.closest('a')) return;
          if (idx >= 4 && idx <= 7) {
            window.location.href = `sproduct2.html?product=${idx - 3}`;
          } else {
            window.location.href = `sproduct.html?product=${idx+1}`;
          }
        });
      });
    }
    // New Arrivals (second .pro-container)
    if (proContainers.length > 1) {
      proContainers[1].querySelectorAll('.pro').forEach(function(card, idx) {
        card.addEventListener('click', function(e) {
          if (e.target.closest('a')) return;
          // If 5th product (idx 4), go to narvproduct2.html with product=1
          if (idx >= 4 && idx <= 7) {
            window.location.href = `narvproduct2.html?product=${idx - 3}`;
          } else {
            window.location.href = `narvproduct.html?product=${idx+1}`;
          }
        });
      });
    }
  }

  // Only run on sproduct.html
  
  if (window.location.pathname.toLowerCase().includes('sproduct.html')) {
    const params = new URLSearchParams(window.location.search);
    const productIdx = parseInt(params.get('product') || '1', 10);
    // Hide all product detail divs
    document.querySelectorAll('[class^="single-pro-details"]').forEach(div => {
      div.style.display = 'none';
    });
    // Show the correct product detail div
    let showDiv = document.querySelector(`.single-pro-details${productIdx === 1 ? '' : productIdx}`);
    if (showDiv) showDiv.style.display = '';
    // Set the main image if possible
    const mainImg = document.getElementById('MainImg');
    if (mainImg) {
      let imgSrc = '';
      if (productIdx === 2) {
        imgSrc = 'images_videos/products/f2.jpg';
      } else if (productIdx === 3) {
        imgSrc = 'images_videos/products/f3.jpg';
      } else if (productIdx === 4) {
        imgSrc = 'images_videos/products/f4.jpg';
      } else {
        imgSrc = 'images_videos/products/f1.jpg';
      }
      mainImg.src = imgSrc;
    }

    // Show correct single-pro-detailsX when clicking a small image in sproduct.html
    var smallImgs = document.querySelectorAll('.small-img-row .small-img');
    var detailDivs = document.querySelectorAll('[class^="single-pro-details"]');
    smallImgs.forEach(function(img, idx) {
      img.addEventListener('click', function() {
        detailDivs.forEach(div => div.style.display = 'none');
        // Show the correct detail div (idx+1, since first is f1, second is f2, etc)
        var showDiv = document.querySelector('.single-pro-details' + (idx === 0 ? '' : (idx+1)));
        if (showDiv) {
          showDiv.style.display = '';
          animateProductCard(showDiv);
        }
        // Set main image
        var mainImg = document.getElementById('MainImg');
        if (mainImg) mainImg.src = img.src;
      });
    });
  }

  // Only run on sproduct2.html

  if (window.location.pathname.toLowerCase().includes('sproduct2.html')) {
    const params = new URLSearchParams(window.location.search);
    const productIdx = parseInt(params.get('product') || '1', 10);
    // Hide all product detail divs
    document.querySelectorAll('[class^="single-pro-details"]').forEach(div => {
      div.style.display = 'none';
    });
    // Show the correct product detail div (single-pro-details5 for product=1)
    let showDiv = document.querySelector(`.single-pro-details${productIdx+4}`);
    if (showDiv) showDiv.style.display = '';
    // Set the main image if possible
    const mainImg = document.getElementById('MainImg');
    if (mainImg) {
      let imgSrc = '';
      if (productIdx === 1) {
        imgSrc = 'images_videos/products/f5.jpg';
      } else if (productIdx === 2) {
        imgSrc = 'images_videos/products/f6.jpg';
      } else if (productIdx === 3) {
        imgSrc = 'images_videos/products/f7.jpg';
      } else if (productIdx === 4) {
        imgSrc = 'images_videos/products/f8.jpg';
      } else {
        imgSrc = 'images_videos/products/f5.jpg';
      }
      mainImg.src = imgSrc;
    }

    // Show correct single-pro-detailsX when clicking a small image in sproduct.html

    var smallImgs = document.querySelectorAll('.small-img-row .small-img');
    var detailDivs = document.querySelectorAll('[class^="single-pro-details"]');
    smallImgs.forEach(function(img, idx) {
      img.addEventListener('click', function() {
        detailDivs.forEach(div => div.style.display = 'none');
        // Show the correct detail div (idx+5, since first is f5, second is f6, etc)
        var showDiv = document.querySelector('.single-pro-details' + (idx+5));
        if (showDiv) {
          showDiv.style.display = '';
          animateProductCard(showDiv);
        }
        // Set main image
        var mainImg = document.getElementById('MainImg');
        if (mainImg) mainImg.src = img.src;
      });
    });
  }

  // Product click handler for New Arrivals in sproduct.html to open narvproduct.html with correct product

  if (window.location.pathname.toLowerCase().includes('sproduct.html')) {
    // Attach click event to all New Arrivals product cards
    document.querySelectorAll('#product1 .pro').forEach(function(card, idx) {
      card.addEventListener('click', function(e) {
        // Prevent default if clicking on cart icon
        if (e.target.closest('a')) return;
        // Set product index (1-based)
        window.location.href = `narvproduct.html?product=${idx+1}`;
      });
    });
  }

  // Only run on narvproduct.html

  if (window.location.pathname.toLowerCase().includes('narvproduct.html')) {
    const params = new URLSearchParams(window.location.search);
    const productIdx = parseInt(params.get('product') || '1', 10);
    // Hide all product detail divs
    document.querySelectorAll('[class^="single-pro-details"]').forEach(div => {
      div.style.display = 'none';
    });
    // Show the correct product detail div
    let showDiv = document.querySelector(`.single-pro-details${productIdx === 1 ? '' : productIdx}`);
    if (showDiv) showDiv.style.display = '';
    // Set the main image if possible
    const mainImg = document.getElementById('MainImg');
    if (mainImg) {
      let imgSrc = '';
      if (productIdx === 2) {
        imgSrc = 'images_videos/products/n2.jpg';
      } else if (productIdx === 3) {
        imgSrc = 'images_videos/products/n3.jpg';
      } else if (productIdx === 4) {
        imgSrc = 'images_videos/products/n4.jpg';
      } else if (productIdx === 5) {
        imgSrc = 'images_videos/products/n5.jpg';
      } else if (productIdx === 6) {
        imgSrc = 'images_videos/products/n6.jpg';
      } else if (productIdx === 7) {
        imgSrc = 'images_videos/products/n7.jpg';
      } else if (productIdx === 8) {
        imgSrc = 'images_videos/products/n8.jpg';
      } else {
        imgSrc = 'images_videos/products/n1.jpg';
      }
      mainImg.src = imgSrc;
    }

    // Show correct single-pro-detailsX when clicking a small image in narvproduct.html

    var smallImgs = document.querySelectorAll('.small-img-row .small-img');
    var detailDivs = document.querySelectorAll('[class^="single-pro-details"]');
    smallImgs.forEach(function(img, idx) {
      img.addEventListener('click', function() {
        // Hide all detail divs
        detailDivs.forEach(div => div.style.display = 'none');
        // Show the correct detail div (idx+1, since first is n1, second is n2, etc)
        var showDiv = document.querySelector('.single-pro-details' + (idx === 0 ? '' : (idx+1)));
        if (showDiv) {
          showDiv.style.display = '';
          animateProductCard(showDiv);
        }
        // Set main image
        var mainImg = document.getElementById('MainImg');
        if (mainImg) mainImg.src = img.src;
      });
    });
  }

  // Only run on narvproduct2.html

  if (window.location.pathname.toLowerCase().includes('narvproduct2.html')) {
    const params = new URLSearchParams(window.location.search);
    const productIdx = parseInt(params.get('product') || '1', 10);
    // Hide all product detail divs
    document.querySelectorAll('[class^="single-pro-details"]').forEach(div => {
      div.style.display = 'none';
    });
    // Show the correct product detail div (single-pro-details5 for product=1)
    let showDiv = document.querySelector(`.single-pro-details${productIdx+4}`);
    if (showDiv) showDiv.style.display = '';
    // Set the main image if possible
    const mainImg = document.getElementById('MainImg');
    if (mainImg) {
      let imgSrc = '';
      if (productIdx === 1) {
        imgSrc = 'images_videos/products/n5.jpg';
      } else if (productIdx === 2) {
        imgSrc = 'images_videos/products/n6.jpg';
      } else if (productIdx === 3) {
        imgSrc = 'images_videos/products/n7.jpg';
      } else if (productIdx === 4) {
        imgSrc = 'images_videos/products/n8.jpg';
      } else {
        imgSrc = 'images_videos/products/n5.jpg';
      }
      mainImg.src = imgSrc;
    }

    // Show correct single-pro-detailsX when clicking a small image in narvproduct2.html

    var smallImgs = document.querySelectorAll('.small-img-row .small-img');
    var detailDivs = document.querySelectorAll('[class^="single-pro-details"]');
    smallImgs.forEach(function(img, idx) {
      img.addEventListener('click', function() {
        detailDivs.forEach(div => div.style.display = 'none');
        // Show the correct detail div (idx+5, since first is n5, etc)
        var showDiv = document.querySelector('.single-pro-details' + (idx+5));
        if (showDiv) {
          showDiv.style.display = '';
          animateProductCard(showDiv);
        }
        var mainImg = document.getElementById('MainImg');
        if (mainImg) mainImg.src = img.src;
      });
    });
  }

  // --- Animation for product card on thumbnail click (narvproduct.html & narvproduct2.html) ---

  function animateProductCard(card) {
    if (!card) return;
    card.classList.remove('slide-up-card');
    // Force reflow to restart animation
    void card.offsetWidth;
    card.classList.add('slide-up-card');
  }
});