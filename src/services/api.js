const API_URL = 'http://your-api-url.com/api';

// Mock data
const booksData = [
  {
    id: 1,
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    coverImage: "https://nxbhcm.com.vn/Image/Biasach/dacnhantam86.jpg",
    rating: 4.8,
    reviews: 1520,
    views: "15.2K",
    categories: ["Self-Help", "Psychology"],
    description: "Đắc Nhân Tâm là cuốn sách nổi tiếng nhất, bán chạy nhất và có tầm ảnh hưởng nhất của mọi thởi đại. Tác phẩm đã được chuyển ngữ sang hầu hết các ngôn ngữ trên thế giới và có mặt ở hàng trăm quốc gia.",
    publishedDate: "1936",
    publisher: "Simon & Schuster",
    pages: 291,
    language: "Tiếng Việt",
    isbn: "978-0671027032",
    price: 88000,
    discount: 20,
    chapters: [
      { id: 1, title: "Phần 1: Nghệ thuật ứng xử cơ bản", pages: 45 },
      { id: 2, title: "Phần 2: Sáu cách tạo thiện cảm", pages: 52 },
      { id: 3, title: "Phần 3: Cách thuyết phục người khác", pages: 48 },
      { id: 4, title: "Phần 4: Thay đổi người khác", pages: 46 }
    ],
    comments: [
      { id: 1, user: "Minh Anh", rating: 5, content: "Sách rất hay và bổ ích!", date: "2024-01-15" },
      { id: 2, user: "Hoàng Nam", rating: 4, content: "Nhiều bài học quý giá về giao tiếp.", date: "2024-01-10" }
    ]
  },
  {
    id: 2,
    title: "Harry Potter và Hòn đá Phù thủy",
    author: "J.K. Rowling",
    coverImage: "https://www.nxbtre.com.vn/Images/Book/nxbtre_full_21042022_030444.jpg",
    rating: 4.9,
    reviews: 2150,
    views: "20.5K",
    categories: ["Fiction", "Fantasy", "Young Adult"],
    description: "Harry Potter và Hòn đá Phù thủy là cuốn đầu tiên trong series Harry Potter nổi tiếng, kể về cuộc phiêu lưu của cậu bé phù thủy Harry Potter tại trường Hogwarts. Câu chuyện bắt đầu khi Harry phát hiện ra mình là một phù thủy và được mời học tại Hogwarts.",
    publishedDate: "1997",
    publisher: "NXB Trẻ",
    pages: 366,
    language: "Tiếng Việt",
    isbn: "978-0747532699",
    price: 120000,
    discount: 15,
    chapters: [
      { id: 1, title: "Chương 1: Cậu bé sống sót", pages: 30 },
      { id: 2, title: "Chương 2: Tấm kính biến mất", pages: 28 },
      { id: 3, title: "Chương 3: Những lá thư từ không ai", pages: 32 },
      { id: 4, title: "Chương 4: Người giữ khóa", pages: 35 }
    ],
    comments: [
      { id: 1, user: "Thu Hà", rating: 5, content: "Tuyệt vời! Không thể đợi để đọc phần tiếp theo.", date: "2024-01-18" },
      { id: 2, user: "Đức Anh", rating: 5, content: "Thế giới phép thuật quá tuyệt vời!", date: "2024-01-12" }
    ]
  },
  {
    id: 3,
    title: "Chiến binh Cầu vồng",
    author: "Andrea Hirata",
    coverImage: "https://ntthnue.edu.vn/uploads/Images/2023/12/050.JPG",
    rating: 4.7,
    reviews: 980,
    views: "12.8K",
    categories: ["Fiction", "Coming of Age", "Education"],
    description: "Chiến binh Cầu vồng là câu chuyện cảm động về tình bạn và nghị lực vươn lên trong học tập của những đứa trẻ nghèo trên đảo Belitong, Indonesia. Cuốn sách là hành trình đầy cảm xúc về ước mơ, tình bạn và lòng quyết tâm.",
    publishedDate: "2005",
    publisher: "NXB Hội Nhà Văn",
    pages: 328,
    language: "Tiếng Việt",
    isbn: "978-9792248616",
    price: 95000,
    discount: 10,
    chapters: [
      { id: 1, title: "Chương 1: Mười học trò", pages: 35 },
      { id: 2, title: "Chương 2: Trường Muhammadiyah", pages: 32 },
      { id: 3, title: "Chương 3: Cô giáo Muslimah", pages: 30 },
      { id: 4, title: "Chương 4: Ước mơ và thực tại", pages: 33 }
    ],
    comments: [
      { id: 1, user: "Thanh Tâm", rating: 5, content: "Câu chuyện rất truyền cảm hứng!", date: "2024-01-16" },
      { id: 2, user: "Minh Tuấn", rating: 4, content: "Sách hay, ý nghĩa sâu sắc.", date: "2024-01-11" }
    ]
  },
  {
    id: 4,
    title: "Hoàng tử bé",
    author: "Antoine de Saint-Exupéry",
    coverImage: "https://ischool.vn/wp-content/uploads/2022/12/nhung-cuon-sach-hay-cho-tre-10-tuoi-12.jpg",
    rating: 4.9,
    reviews: 1850,
    views: "18.3K",
    categories: ["Fiction", "Children's Literature", "Philosophy"],
    description: "Hoàng tử bé là câu chuyện về tình bạn, tình yêu, và ý nghĩa cuộc sống, được kể qua góc nhìn của một cậu bé đến từ tiểu hành tinh B-612. Tác phẩm này không chỉ dành cho trẻ em mà còn chứa đựng nhiều bài học sâu sắc cho người lớn.",
    publishedDate: "1943",
    publisher: "NXB Kim Đồng",
    pages: 256,
    language: "Tiếng Việt",
    isbn: "978-2070612758",
    price: 75000,
    discount: 25,
    chapters: [
      { id: 1, title: "Chương 1: Gặp gỡ", pages: 28 },
      { id: 2, title: "Chương 2: Tiểu hành tinh B-612", pages: 30 },
      { id: 3, title: "Chương 3: Bông hồng", pages: 25 },
      { id: 4, title: "Chương 4: Cuộc hành trình", pages: 32 }
    ],
    comments: [
      { id: 1, user: "Lan Anh", rating: 5, content: "Một tác phẩm tuyệt vời cho mọi lứa tuổi!", date: "2024-01-17" },
      { id: 2, user: "Quang Minh", rating: 5, content: "Những bài học về tình yêu và cuộc sống rất sâu sắc.", date: "2024-01-13" }
    ]
  },
  {
    id: 5,
    title: "Tôi Tài Giỏi, Bạn Cũng Thế",
    author: "Adam Khoo",
    coverImage: "https://lh4.googleusercontent.com/proxy/92QuMwJnEjAGTfNMAB9joNXoouO9NuduIgBPaKtL0h0UPvaeTFj3Xef967P3mbrE7F1J5cfnvn2PKw8cwIINHMhxf9L2C3bPRQ2Ef14EVeZAIb_rdt3WzLOb98FXMVhAs2lNuT9ABlcODTeUqt5z27FQ8fQE4ZtQEw",
    rating: 4.7,
    reviews: 1800,
    views: "20K",
    categories: ["Self-Help", "Education"],
    description: "Tôi Tài Giỏi, Bạn Cũng Thế! là một cuốn sách bổ ích dành cho các bạn học sinh, sinh viên và các bậc phụ huynh. Cuốn sách này không chỉ đơn thuần là những kiến thức về phương pháp học tập mà còn là những bài học về cuộc sống, về cách sống và về những quy tắc để đạt được thành công.",
    publishedDate: "2008",
    publisher: "NXB Trẻ",
    pages: 304,
    language: "Tiếng Việt",
    isbn: "978-9814281560",
    price: 115000,
    discount: 25,
    chapters: [
      { id: 1, title: "Chương 1: Bí quyết thành công", pages: 35 },
      { id: 2, title: "Chương 2: Phương pháp học tập hiệu quả", pages: 42 },
      { id: 3, title: "Chương 3: Kỹ năng ghi nhớ", pages: 38 },
      { id: 4, title: "Chương 4: Quản lý thởi gian", pages: 40 }
    ],
    comments: [
      { id: 1, user: "Thanh Hà", rating: 5, content: "Sách rất hay, giúp tôi cải thiện phương pháp học tập rất nhiều!", date: "2024-01-20" },
      { id: 2, user: "Minh Tuấn", rating: 4, content: "Những phương pháp trong sách rất thực tế và dễ áp dụng.", date: "2024-01-18" }
    ]
  }
];

// Cart data structure
let cart = {
  items: [],
  total: 0
};

export const fetchBooks = async () => {
  try {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(booksData), 1000);
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const fetchBook = async (id) => {
  try {
    // Simulate API call
    return new Promise((resolve) => {
      const book = booksData.find(book => book.id === parseInt(id));
      setTimeout(() => resolve(book), 1000);
    });
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
};

export const fetchNewReleases = async () => {
  try {
    // Simulate API call with sorted books by date
    return new Promise((resolve) => {
      const sortedBooks = [...booksData].sort((a, b) => 
        new Date(b.publishedDate) - new Date(a.publishedDate)
      );
      setTimeout(() => resolve(sortedBooks), 1000);
    });
  } catch (error) {
    console.error('Error fetching new releases:', error);
    throw error;
  }
};

export const fetchPopularBooks = async () => {
  try {
    // Simulate API call with sorted books by rating and views
    return new Promise((resolve) => {
      const sortedBooks = [...booksData].sort((a, b) => 
        (b.rating * parseFloat(b.views)) - (a.rating * parseFloat(a.views))
      );
      setTimeout(() => resolve(sortedBooks), 1000);
    });
  } catch (error) {
    console.error('Error fetching popular books:', error);
    throw error;
  }
};

export const fetchBooksByCategory = async (category) => {
  try {
    // Simulate API call
    return new Promise((resolve) => {
      const filteredBooks = category === 'all' 
        ? booksData 
        : booksData.filter(book => book.categories.includes(category));
      setTimeout(() => resolve(filteredBooks), 1000);
    });
  } catch (error) {
    console.error('Error fetching books by category:', error);
    throw error;
  }
};

export const addComment = async (bookId, comment) => {
  try {
    const response = await fetch(`${API_URL}/books/${bookId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

export const addRating = async (bookId, rating) => {
  try {
    const response = await fetch(`${API_URL}/books/${bookId}/ratings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding rating:', error);
    throw error;
  }
};

// Add this function for search functionality
export const searchBooks = (query) => {
  const normalizedQuery = query.toLowerCase().trim();
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Sử dụng books thay vì booksData
      const results = booksData.filter(book => {
        // Kiểm tra từng trường riêng biệt
        const titleMatch = book.title.toLowerCase().includes(normalizedQuery);
        const authorMatch = book.author.toLowerCase().includes(normalizedQuery);
        const descriptionMatch = book.description.toLowerCase().includes(normalizedQuery);
        const categoriesMatch = book.categories.some(category => 
          category.toLowerCase().includes(normalizedQuery)
        );

        // Trả về true nếu query khớp với bất kỳ trường nào
        return titleMatch || authorMatch || descriptionMatch || categoriesMatch;
      });

      console.log('Search query:', normalizedQuery); // Log để debug
      console.log('Search results:', results); // Log để debug
      
      resolve(results);
    }, 300);
  });
};

export const addToCart = async (bookId, quantity = 1) => {
  try {
    const book = await fetchBook(bookId);
    if (!book) throw new Error('Book not found');

    const discountedPrice = book.price * (1 - book.discount / 100);
    const cartItem = {
      id: book.id,
      title: book.title,
      price: book.price,
      discount: book.discount,
      finalPrice: discountedPrice,
      quantity: quantity,
      coverImage: book.coverImage
    };

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(item => item.id === bookId);
    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push(cartItem);
    }

    // Update total
    cart.total = cart.items.reduce((sum, item) => 
      sum + (item.finalPrice * item.quantity), 0
    );

    return { success: true, cart };
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const removeFromCart = (bookId) => {
  try {
    cart.items = cart.items.filter(item => item.id !== bookId);
    cart.total = cart.items.reduce((sum, item) => 
      sum + (item.finalPrice * item.quantity), 0
    );
    return { success: true, cart };
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

export const updateCartItemQuantity = (bookId, quantity) => {
  try {
    const item = cart.items.find(item => item.id === bookId);
    if (!item) throw new Error('Item not found in cart');

    if (quantity <= 0) {
      return removeFromCart(bookId);
    }

    item.quantity = quantity;
    cart.total = cart.items.reduce((sum, item) => 
      sum + (item.finalPrice * item.quantity), 0
    );
    
    return { success: true, cart };
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};

export const getCart = () => {
  return { ...cart };
};

export const clearCart = () => {
  cart = {
    items: [],
    total: 0
  };
  return { success: true, cart };
};

export const checkout = async (orderData) => {
  try {
    // Validate cart is not empty
    if (cart.items.length === 0) {
      throw new Error('Cart is empty');
    }

    // Validate order data
    if (!orderData.shippingAddress || !orderData.paymentMethod) {
      throw new Error('Missing required order information');
    }

    const order = {
      id: Date.now().toString(),
      items: [...cart.items],
      total: cart.total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...orderData
    };

    // Simulate API call to process order
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          order,
          message: 'Order placed successfully'
        });
      }, 1500);
    });

    // Clear cart after successful checkout
    if (response.success) {
      clearCart();
    }

    return response;
  } catch (error) {
    console.error('Error during checkout:', error);
    throw error;
  }
};
