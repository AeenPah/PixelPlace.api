#  PixelPlace

A real-time collaborative pixel canvas built with **ASP.NET Core**, **Hot Chocolate GraphQL**, **React**, **Apollo Client**, and **PostgreSQL**.

Users can place colored pixels on a shared canvas and instantly see updates from everyone through GraphQL subscriptions.

## 🌐 Live Demo

**Demo:** https://pixel-place-api-six.vercel.app

## ✨ Features

- Real-time pixel updates using GraphQL Subscriptions
- JWT Authentication
- User registration & login
- Place colored pixels on a shared canvas
- GraphQL Queries, Mutations, and Subscriptions
- PostgreSQL database
- Responsive React frontend
- Docker support for PostgreSQL

---

# 🛠 Tech Stack

### Backend

- ASP.NET Core
- Hot Chocolate GraphQL
- Entity Framework Core
- PostgreSQL
- JWT Authentication

### Frontend

- React
- TypeScript
- Apollo Client
- Tailwind CSS
- Vite

---

# Why GraphQL?

This project was intentionally built with **GraphQL** instead of a traditional REST API to demonstrate modern API development.

GraphQL provides several advantages for an application like PixelPlace:

- **Fetch only the data you need** – Clients request exactly the fields they require, reducing unnecessary network traffic.
- **Single endpoint** – All operations go through one GraphQL endpoint instead of managing multiple REST routes.
- **Real-time updates** – GraphQL Subscriptions make it straightforward to broadcast pixel changes to all connected users.
- **Strongly typed schema** – The API acts as a contract between the frontend and backend, improving developer experience.
- **Flexible frontend development** – The frontend can evolve without requiring new REST endpoints for every UI change.

For a collaborative application with live updates, GraphQL offers a clean and scalable solution.

---

# Project Structure

```
PixelPlace.api/
│
├── backend/      ASP.NET Core + GraphQL
├── frontend/     React + Apollo Client
└── README.md
```

---

# Running Locally

## Clone

```bash
git clone https://github.com/AeenPah/PixelPlace.api.git

cd PixelPlace.api
```

### Backend

```bash
cd PixelPlace.api

dotnet restore

dotnet ef database update

dotnet run
```

### Frontend

```bash
cd PixelPlace.client

npm install

npm run dev
```

---

# Future Improvements

- Canvas zoom and pan
- Pixel history
- Cooldown timer
- User profiles
- Leaderboard
- Admin moderation
- Docker Compose for full stack deployment

---

# Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/your-feature
```

3. Commit your changes.

```bash
git commit -m "Add your feature"
```

4. Push your branch.

```bash
git push origin feature/your-feature
```

5. Open a Pull Request.

Please keep pull requests focused and include a clear description of the changes.

---

# Contributors

Thanks to everyone who contributes to this project!

<a href="https://github.com/AeenPah/PixelPlace.api/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=AeenPah/PixelPlace.api" />
</a>

---

# License

This project is licensed under the MIT License.
