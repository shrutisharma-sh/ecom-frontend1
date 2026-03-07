import { useState, useEffect } from "react";

export default function Home() {

  const popupImages = [
    "IMAGE_URL_1",
    "IMAGE_URL_2",
    "IMAGE_URL_3",
    "IMAGE_URL_4"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % popupImages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-teal-500 to-blue-700 text-white py-20 px-10 flex items-center justify-between">

        <div className="max-w-xl">
          <h1 className="text-5xl font-bold leading-tight">
            Shop your way,
            <br />
            get rewards
          </h1>

          <p className="mt-6 text-lg text-gray-200">
            Discover the best products at unbeatable prices.
          </p>

          <button className="mt-8 bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition">
            Shop Now
          </button>
        </div>

        {/* HERO IMAGE */}
        <div>
          <img
            src="HERO_IMAGE_URL"
            alt="shopping"
            className="w-[350px] rounded-xl shadow-lg"
          />
        </div>

      </section>


      {/* POPUP IMAGE SCROLLER */}
      <section className="py-16 bg-gray-50 text-center">

        <h2 className="text-3xl font-bold mb-10">
          Trending Products
        </h2>

        <div className="flex justify-center items-center relative h-[350px]">

          {popupImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="product"
              className={`absolute w-[250px] h-[300px] object-cover rounded-xl shadow-xl transition-all duration-700
              ${
                i === index
                  ? "opacity-100 scale-100 z-20"
                  : "opacity-0 scale-75"
              }`}
            />
          ))}

        </div>

      </section>


      {/* PRODUCT CATEGORY SECTION */}
      <section className="py-20 px-10">

        <h2 className="text-3xl font-bold text-center mb-12">
          Shop by Category
        </h2>

        <div className="grid grid-cols-4 gap-8">

          <CategoryCard
            title="Electronics"
            img="CATEGORY_IMAGE_URL_1"
          />

          <CategoryCard
            title="Fashion"
            img="CATEGORY_IMAGE_URL_2"
          />

          <CategoryCard
            title="Home"
            img="CATEGORY_IMAGE_URL_3"
          />

          <CategoryCard
            title="Accessories"
            img="CATEGORY_IMAGE_URL_4"
          />

        </div>

      </section>


      {/* PROMO SECTION */}
      <section className="bg-blue-700 text-white py-20 text-center">

        <h2 className="text-4xl font-bold">
          Get 20% Off On Your First Order
        </h2>

        <p className="mt-4 text-lg text-gray-200">
          Sign up now and start shopping smarter.
        </p>

        <button className="mt-6 bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold">
          Register Now
        </button>

      </section>

    </div>
  );
}


function CategoryCard({ title, img }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition cursor-pointer">

      <img
        src={img}
        alt={title}
        className="h-[220px] w-full object-cover"
      />

      <div className="p-4 text-center font-semibold text-lg">
        {title}
      </div>

    </div>
  );
}