import { useParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams();

  // Здесь можно получить данные о продукте по ID через API
  // Пример: const product = fetchProductById(id);

  return (
    <div>
      <h1>Product Details for ID: {id}</h1>
      {/* Отобразите детали продукта */}
    </div>
  );
};
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams(); // Получаем ID из URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Функция для загрузки данных о продукте
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {product ? (
        <>
          <h1>{product.title}</h1>
          <img src={product.thumbnail} alt={product.title} />
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
        </>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};


export default ProductDetailsPage;
