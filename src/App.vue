<template>
  <div class="container">
    <h2>📝 Tambah Post</h2>

    <form @submit.prevent="addPost" class="form-card">
      <input v-model="newPost.title" placeholder="Judul" required />
      <textarea v-model="newPost.body" placeholder="Konten..." required></textarea>
      <button type="submit" :disabled="loadingAdd">Kirim</button>
    </form>

    <hr />

    <h2>📚 Daftar Post</h2>
    <ul class="post-list">
      <li v-for="post in posts" :key="post.id" class="post-card">
        <div>
          <strong>{{ post.title }}</strong>
          <p>{{ post.body }}</p>
        </div>
        <button @click="deletePost(post.id)" class="delete-button">🗑️</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PostApp',
  data() {
    return {
      posts: [],
      newPost: {
        title: '',
        body: '',
      },
      loadingAdd: false,
    }
  },
  mounted() {
    this.loadPosts()
  },
  methods: {
    async loadPosts() {
      try {
        const response = await axios.get('http://localhost:3000/articles')
        this.posts = response.data.reverse()
      } catch (error) {
        console.error('Gagal mengambil data:', error)
      }
    },
    async addPost() {
      this.loadingAdd = true
      try {
        await axios.post('http://localhost:3000/articles', this.newPost)
        this.newPost.title = ''
        this.newPost.body = ''
        await this.loadPosts()
      } catch (error) {
        console.error('Gagal menambahkan post:', error)
      } finally {
        this.loadingAdd = false
      }
    },
    async deletePost(id) {
      const confirmDelete = confirm('Yakin ingin menghapus post ini?')
      if (!confirmDelete) return

      try {
        await axios.delete(`http://localhost:3000/articles/${id}`)
        this.posts = this.posts.filter((post) => post.id !== id)
      } catch (error) {
        console.error('Gagal menghapus post:', error)
      }
    },
  },
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #f9fbfd;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 1rem;
  color: #1e3a8a;
}

.form-card {
  background: #fff;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-card input,
.form-card textarea {
  padding: 0.6rem 0.8rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
}

.form-card button {
  background-color: #3b82f6;
  color: white;
  padding: 0.6rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

.form-card button:hover {
  background-color: #2563eb;
}

.post-list {
  list-style: none;
  padding: 0;
}

.post-card {
  background: #fff;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 10px;
  border-left: 4px solid #3b82f6;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.04);
  transition: transform 0.1s ease;
}

.post-card:hover {
  transform: translateY(-2px);
}

.post-card p {
  margin: 0.3rem 0 0;
  color: #374151;
  font-size: 0.95rem;
}

.delete-button {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.4rem 0.6rem;
  font-size: 1.1rem;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s ease;
}

.delete-button:hover {
  background: #dc2626;
}
</style>
