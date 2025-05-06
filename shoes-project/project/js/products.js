/**
 * Products Management Functionality
 * Handles product display and interactions
 */
document.addEventListener('DOMContentLoaded', function() {
  // Sample product data (in production, this would come from Netlify CMS)
  const products = [
    {
      id: '1',
      title_fr: 'Baskets Sport Running',
      title_ar: 'أحذية رياضية للجري',
      price: 89.99,
      sizes: ['38', '39', '40', '41', '42', '43'],
      colors: ['Noir', 'Bleu', 'Rouge'],
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description_fr: 'Baskets confortables idéales pour le running quotidien. Semelle amortissante et tige respirante pour un maximum de confort.',
      description_ar: 'أحذية رياضية مريحة مثالية للجري اليومي. نعل ممتص للصدمات ومقدمة قابلة للتنفس لأقصى قدر من الراحة.',
      featured: true
    },
    {
      id: '2',
      title_fr: 'Chaussures Élégantes en Cuir',
      title_ar: 'أحذية جلدية أنيقة',
      price: 129.99,
      sizes: ['39', '40', '41', '42', '43', '44'],
      colors: ['Marron', 'Noir'],
      image: 'https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description_fr: 'Chaussures élégantes en cuir véritable. Parfaites pour les occasions spéciales et les tenues professionnelles.',
      description_ar: 'أحذية أنيقة مصنوعة من الجلد الحقيقي. مثالية للمناسبات الخاصة والملابس المهنية.',
      featured: true
    },
    {
      id: '3',
      title_fr: 'Baskets Mode Urbaine',
      title_ar: 'أحذية رياضية أنيقة للمدينة',
      price: 79.99,
      sizes: ['36', '37', '38', '39', '40', '41'],
      colors: ['Blanc', 'Gris', 'Rose'],
      image: 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description_fr: 'Baskets tendance pour un style urbain. Design moderne et confort optimal pour un usage quotidien.',
      description_ar: 'أحذية رياضية عصرية لأسلوب حضري. تصميم حديث وراحة مثالية للاستخدام اليومي.',
      featured: true
    },
    {
      id: '4',
      title_fr: 'Mocassins Confort',
      title_ar: 'حذاء موكاسان مريح',
      price: 69.99,
      sizes: ['38', '39', '40', '41', '42', '43'],
      colors: ['Marron Clair', 'Bleu Marine', 'Taupe'],
      image: 'https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description_fr: 'Mocassins élégants et confortables pour un style décontracté chic. Idéals pour le quotidien et les sorties détendues.',
      description_ar: 'حذاء موكاسان أنيق ومريح لإطلالة أنيقة وغير رسمية. مثالي للارتداء اليومي والخروجات غير الرسمية.',
      featured: false
    },
    {
      id: '5',
      title_fr: 'Bottines Tendance',
      title_ar: 'بوتات قصيرة عصرية',
      price: 99.99,
      sizes: ['36', '37', '38', '39', '40'],
      colors: ['Noir', 'Taupe', 'Bordeaux'],
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description_fr: 'Bottines tendance avec talon confortable. Parfaites pour l\'automne et l\'hiver, elles ajoutent une touche d\'élégance à vos tenues.',
      description_ar: 'بوتات قصيرة عصرية ذات كعب مريح. مثالية للخريف والشتاء، تضيف لمسة من الأناقة إلى ملابسك.',
      featured: false
    },
    {
      id: '6',
      title_fr: 'Sandales d\'Été',
      title_ar: 'صنادل صيفية',
      price: 49.99,
      sizes: ['36', '37', '38', '39', '40', '41'],
      colors: ['Beige', 'Noir', 'Doré'],
      image: 'https://images.pexels.com/photos/6046235/pexels-photo-6046235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description_fr: 'Sandales légères et confortables pour l\'été. Design élégant qui s\'accorde avec toutes vos tenues estivales.',
      description_ar: 'صنادل خفيفة ومريحة للصيف. تصميم أنيق يتناسب مع جميع ملابسك الصيفية.',
      featured: false
    }
  ];
  
  // Check if we're on the products page
  const isProductsPage = window.location.pathname.includes('products.html');
  // Check if we're on the home page
  const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
  
  // Initialize product modal if it exists
  const productModal = document.getElementById('productModal');
  if (productModal) {
    const modalInstance = new bootstrap.Modal(productModal);
  }
  
  // Display featured products on home page
  if (isHomePage) {
    const featuredContainer = document.querySelector('.featured-products-container');
    if (featuredContainer) {
      // Clear loading spinner
      featuredContainer.innerHTML = '';
      
      // Filter featured products and display maximum 3
      const featuredProducts = products.filter(product => product.featured).slice(0, 3);
      featuredProducts.forEach(product => {
        featuredContainer.appendChild(createProductCard(product));
      });
    }
  }
  
  // Display all products on products page
  if (isProductsPage) {
    const productsContainer = document.querySelector('.products-container');
    if (productsContainer) {
      // Clear loading spinner
      productsContainer.innerHTML = '';
      
      // Display all products
      products.forEach(product => {
        productsContainer.appendChild(createProductCard(product));
      });
      
      // Add search functionality
      const searchInput = document.getElementById('searchInput');
      if (searchInput) {
        searchInput.addEventListener('input', function() {
          const searchTerm = this.value.toLowerCase();
          const lang = document.body.getAttribute('data-lang');
          
          // Clear container
          productsContainer.innerHTML = '';
          
          // Filter products based on search term
          const filteredProducts = products.filter(product => {
            const title = (lang === 'fr' ? product.title_fr : product.title_ar).toLowerCase();
            return title.includes(searchTerm);
          });
          
          // Display filtered products or "no results" message
          if (filteredProducts.length > 0) {
            filteredProducts.forEach(product => {
              productsContainer.appendChild(createProductCard(product));
            });
          } else {
            const noResults = document.createElement('div');
            noResults.className = 'col-12 text-center';
            noResults.innerHTML = `<p class="mt-3">${lang === 'fr' ? 'Aucun produit trouvé' : 'لم يتم العثور على منتجات'}</p>`;
            productsContainer.appendChild(noResults);
          }
        });
      }
      
      // Add sort functionality
      const sortSelect = document.getElementById('sortSelect');
      if (sortSelect) {
        sortSelect.addEventListener('change', function() {
          const sortValue = this.value;
          const sortedProducts = [...products]; // Create a copy of products array
          const lang = document.body.getAttribute('data-lang');
          
          // Sort products based on selected option
          switch (sortValue) {
            case 'price-asc':
              sortedProducts.sort((a, b) => a.price - b.price);
              break;
            case 'price-desc':
              sortedProducts.sort((a, b) => b.price - a.price);
              break;
            case 'name-asc':
              sortedProducts.sort((a, b) => {
                const titleA = lang === 'fr' ? a.title_fr : a.title_ar;
                const titleB = lang === 'fr' ? b.title_fr : b.title_ar;
                return titleA.localeCompare(titleB);
              });
              break;
            case 'name-desc':
              sortedProducts.sort((a, b) => {
                const titleA = lang === 'fr' ? a.title_fr : a.title_ar;
                const titleB = lang === 'fr' ? b.title_fr : b.title_ar;
                return titleB.localeCompare(titleA);
              });
              break;
            default:
              // Default sorting (no sort)
              break;
          }
          
          // Clear container and display sorted products
          productsContainer.innerHTML = '';
          sortedProducts.forEach(product => {
            productsContainer.appendChild(createProductCard(product));
          });
        });
      }
    }
  }
  
  // Function to create product card
  function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'col-sm-6 col-md-4 col-lg-4';
    
    // Get current language
    const lang = document.body.getAttribute('data-lang');
    const title = lang === 'fr' ? product.title_fr : product.title_ar;
    
    card.innerHTML = `
      <div class="card product-card">
        <div class="product-img-container">
          <img src="${product.image}" class="card-img-top product-img" alt="${title}">
          <button class="btn btn-dark w-100 quick-view-btn" data-product-id="${product.id}" data-fr="Aperçu Rapide" data-ar="نظرة سريعة">
            ${lang === 'fr' ? 'Aperçu Rapide' : 'نظرة سريعة'}
          </button>
        </div>
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text fw-bold">${product.price.toFixed(2)} €</p>
        </div>
      </div>
    `;
    
    // Add event listener to quick view button
    const quickViewBtn = card.querySelector('.quick-view-btn');
    quickViewBtn.addEventListener('click', function() {
      openProductModal(product);
    });
    
    return card;
  }
  
  // Function to open product modal with product details
  function openProductModal(product) {
    if (!productModal) return;
    
    const lang = document.body.getAttribute('data-lang');
    
    // Set product data in modal
    productModal.setAttribute('data-product-id', product.id);
    productModal.setAttribute('data-product-price', product.price);
    
    // Update modal title
    const modalTitle = document.querySelector('.modal-product-title');
    modalTitle.textContent = lang === 'fr' ? product.title_fr : product.title_ar;
    modalTitle.setAttribute('data-fr', product.title_fr);
    modalTitle.setAttribute('data-ar', product.title_ar);
    
    // Update modal image
    document.querySelector('.modal-product-image').src = product.image;
    
    // Update modal price
    document.querySelector('.modal-product-price').textContent = `${product.price.toFixed(2)} €`;
    
    // Update modal description
    const modalDescription = document.querySelector('.modal-product-description');
    modalDescription.textContent = lang === 'fr' ? product.description_fr : product.description_ar;
    
    // Update size options
    const sizeSelect = document.querySelector('.modal-product-sizes');
    sizeSelect.innerHTML = `<option value="" data-fr="Sélectionner une taille" data-ar="اختر المقاس">${lang === 'fr' ? 'Sélectionner une taille' : 'اختر المقاس'}</option>`;
    product.sizes.forEach(size => {
      const option = document.createElement('option');
      option.value = size;
      option.textContent = size;
      sizeSelect.appendChild(option);
    });
    
    // Update color options
    const colorSelect = document.querySelector('.modal-product-colors');
    colorSelect.innerHTML = `<option value="" data-fr="Sélectionner une couleur" data-ar="اختر اللون">${lang === 'fr' ? 'Sélectionner une couleur' : 'اختر اللون'}</option>`;
    product.colors.forEach(color => {
      const option = document.createElement('option');
      option.value = color;
      option.textContent = color;
      colorSelect.appendChild(option);
    });
    
    // Reset quantity input
    document.querySelector('.modal-product-quantity').value = 1;
    
    // Show the modal
    const modalInstance = bootstrap.Modal.getInstance(productModal) || new bootstrap.Modal(productModal);
    modalInstance.show();
  }
});