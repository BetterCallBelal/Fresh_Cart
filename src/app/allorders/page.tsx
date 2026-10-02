import { getTokenFun } from "@/app/Uti/GetTokenData"; 

interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: { title: string; imageCover: string; category?: { name: string } };
}
interface Order {
  _id: string;
  createdAt: string;
  totalOrderPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  cartItems: CartItem[];
}

function getUserId(token: string): string {
  const payload = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  );
  return payload.id;
}

export default async function AllOrders() {
  const token = await getTokenFun();
  if (!token) {
    throw new Error("hkata2");
  }

  const userId = getUserId(token as string);

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  const orders: Order[] = (Array.isArray(data) ? data : data.data ?? []).sort(
  (a: Order, b: Order) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);
  if (orders.length === 0) {
    return <p className="text-center py-10">No orders yet</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-6">
      <h1 className="text-4xl pb-2.5 font-extralight">Orders Summary</h1>

      {orders.map((order) => (
        <div key={order._id} className="overflow-x-auto">
          <div className="flex justify-between mb-2 text-sm text-gray-600">
            <span>Order #{order._id.slice(-6)}</span>
            <span>
              {order.isPaid ? "Paid" : "Unpaid"} ·{" "}
              {order.isDelivered ? "Delivered" : "Pending"}
            </span>
          </div>

          <table className="w-full bg-white shadow-md rounded-lg border border-gray-200">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-4 text-left text-gray-600 font-medium">Product Name</th>
                <th className="px-6 py-4 text-left text-gray-600 font-medium">Unit Price</th>
                <th className="px-6 py-4 text-left text-gray-600 font-medium">Qty</th>
                <th className="px-6 py-4 text-left text-gray-600 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.cartItems.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div>
                      <p className="text-gray-800 font-medium">
                        {item.product.title.split(" ").slice(0, 4).join(" ")}
                      </p>
                      <span className="text-green-500 text-sm">
                        {item.product.category?.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">${item.price}</td>
                  <td className="px-6 py-4">x{item.count}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
  ${(item.price * item.count).toLocaleString("en-US")}
</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="px-6 py-4 text-right font-medium">
                  Order Total
                </td>
                <td className="px-6 py-4 font-bold">
                  ${order.totalOrderPrice.toLocaleString("en-US")}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ))}
    </div>
  );
}