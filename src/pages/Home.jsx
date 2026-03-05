import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to E-Commerce Store</h1>
      <p>Shop the best products at the best price</p>

      <div style={{ marginTop: "30px" }}>
        <Link to="/login">
          <button style={{ marginRight: "10px", padding: "10px 20px" }}>
            Login
          </button>
        </Link>

        <Link to="/register">
          <button style={{ padding: "10px 20px" }}>
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;