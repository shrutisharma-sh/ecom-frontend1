import { useState, useEffect } from "react";
import { getAllProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

export default function Home() {

  const popupImages = [
    "IMAGE_URL_1",
    "IMAGE_URL_2",
    "IMAGE_URL_3",
    "IMAGE_URL_4"
  ];

  const [index, setIndex] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % popupImages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-slate-950 text-slate-200">

      {/* HERO */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-10 py-24 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">

        <div className="max-w-xl">

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Shop smarter,
            <br />
            <span className="text-indigo-400">live better</span>
          </h1>

          <p className="mt-6 text-lg text-slate-400">
            Discover premium products with modern experience.
          </p>

          <button
            onClick={() =>
              document.getElementById("products").scrollIntoView({
                behavior: "smooth"
              })
            }
            className="mt-8 bg-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 hover:scale-105 transition shadow-lg"
          >
            Shop Now
          </button>

        </div>

        {/* HERO IMAGE */}
        <div className="mt-10 md:mt-0">
          <img
            src="HERO_IMAGE_URL"
            alt="shopping"
            className="w-[350px] rounded-2xl shadow-2xl hover:scale-105 transition duration-500"
          />
        </div>

      </section>


      {/* TRENDING */}
      <section className="py-20 text-center">

        <h2 className="text-3xl font-bold mb-12">
          Trending Products
        </h2>

        <div className="flex justify-center items-center relative h-[350px]">

          {popupImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="product"
              className={`absolute w-[250px] h-[300px] object-cover rounded-2xl shadow-2xl border border-slate-800 transition-all duration-700
              ${
                i === index
                  ? "opacity-100 scale-100 z-20"
                  : "opacity-0 scale-75"
              }`}
            />
          ))}

        </div>

      </section>


      {/* PRODUCTS */}
      <section id="products" className="py-20 px-10">

        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {products.length > 0 ? (
            products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-slate-500">
              No products available
            </p>
          )}

        </div>

      </section>


      {/* CATEGORY */}
      <section className="py-20 px-10">

        <h2 className="text-3xl font-bold text-center mb-12">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          <CategoryCard 
  title="Electronics" 
  img="https://images.unsplash.com/photo-1518770660439-4636190af475" 
/>

<CategoryCard 
  title="Fashion" 
  img="https://images.unsplash.com/photo-1521334884684-d80222895322" 
/>

<CategoryCard 
  title="Home" 
  img="https://images.unsplash.com/photo-1505691938895-1758d7feb511" 
/>

<CategoryCard 
  title="Accessories" 
  img="https://images.unsplash.com/photo-1512499617640-c2f999098c01" 
/>

        </div>

      </section>


      {/* PROMO */}
      <section className="py-20 text-center bg-gradient-to-r from-indigo-600 to-purple-600">

        <h2 className="text-4xl font-bold">
          Get 20% Off On Your First Order
        </h2>

        <p className="mt-4 text-lg text-slate-200">
          Sign up now and start shopping smarter.
        </p>

        <button className="mt-6 bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
          Register Now
        </button>

      </section>

    </div>
  );
}


function CategoryCard({ title, img }) {
  return (
    <div className="group rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 hover:-translate-y-1 hover:shadow-xl transition cursor-pointer">

      <img
        src={img}
        alt={title}
        className="h-[220px] w-full object-cover group-hover:scale-110 transition duration-500"
      />

      <div className="p-4 text-center font-semibold text-lg text-slate-200 group-hover:text-indigo-400 transition">
        {title}
      </div>

    </div>
  );
}