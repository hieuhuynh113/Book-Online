const API_URL = 'http://your-api-url.com/api';

// Mock data
const booksData = [
  {
    id: 1,
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    coverImage: "https://nxbhcm.com.vn/Image/Biasach/dacnhantam86.jpg",
    rating: 4.8,
    views: "15.2K",
    categories: ["Self-Help", "Psychology"],
    description: "Đắc Nhân Tâm là cuốn sách nổi tiếng nhất, bán chạy nhất và có tầm ảnh hưởng nhất của mọi thời đại."
  },
  {
    id: 2,
    title: "Harry Potter và Hòn đá Phù thủy",
    author: "J.K. Rowling",
    coverImage: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/sach-hay-22.jpg",
    rating: 4.9,
    views: "20.5K",
    categories: ["Fiction", "Fantasy", "Young Adult"],
    description: "Harry Potter và Hòn đá Phù thủy là cuốn đầu tiên trong series Harry Potter nổi tiếng, kể về cuộc phiêu lưu của cậu bé phù thủy Harry Potter tại trường Hogwarts."
  },
  {
    id: 3,
    title: "Chiến binh Cầu vồng",
    author: "Andrea Hirata",
    coverImage: "https://lh5.googleusercontent.com/proxy/lHKozOr_yiOBTXp11IN7bLbutJpv8vVmpYtx2ry3WMVvIMB70IksYaNRuAzxCGY5SP00KeGz9da56yGnD8h0vACLsL7AUaoGMNQ8KvdkZR07wNruS73-9BtGnpB7JXkROmzvWzgTrhFfLZAk_fgyU7qHcrW0rqqDYmDIzMTMdrb6kePG0B_VqR0QFBiu",
    rating: 4.7,
    views: "12.8K",
    categories: ["Fiction", "Coming of Age", "Education"],
    description: "Chiến binh Cầu vồng là câu chuyện cảm động về tình bạn và nghị lực vươn lên trong học tập của những đứa trẻ nghèo trên đảo Belitong, Indonesia."
  },
  {
    id: 4,
    title: "Hoàng tử bé",
    author: "Antoine de Saint-Exupéry",
    coverImage: "https://ischool.vn/wp-content/uploads/2022/12/nhung-cuon-sach-hay-cho-tre-10-tuoi-12.jpg",
    rating: 4.9,
    views: "18.3K",
    categories: ["Fiction", "Children's Literature", "Philosophy"],
    description: "Hoàng tử bé là câu chuyện về tình bạn, tình yêu, và ý nghĩa cuộc sống, được kể qua góc nhìn của một cậu bé đến từ tiểu hành tinh B-612."
  }
];

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
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(booksData), 1000);
    });
  } catch (error) {
    console.error('Error fetching new releases:', error);
    throw error;
  }
};

export const fetchPopularBooks = async () => {
  try {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(booksData), 1000);
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
