import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, Plus, Minus, X, ArrowLeft, Gift, CreditCard, User, Mail, Phone, Banknote } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface Gift {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends Gift {
  quantity: number;
}

interface GiftRegistryProps {
  onBack: () => void;
  pixKey: string;
  bankDetails: string;
  whatsappNumber?: string;
  mercadoPagoLink?: string;
}

export function GiftRegistry({ onBack, pixKey, bankDetails, whatsappNumber = "+5581992724907", mercadoPagoLink = "https://link.mercadopago.com.br/casaramosdebrito" }: GiftRegistryProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card" | null>(null);

  // Dados do formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Lista de presentes
  const gifts: Gift[] = [
    {
      id: 1,
      name: "Jogo de Panelas",
      description: "Jogo completo com 5 peças antiaderentes",
      price: 350.44,
      image: "https://m.media-amazon.com/images/I/61AjgTFEaRL._AC_SX679_.jpg",
      category: "Cozinha"
    },
    {
      id: 2,
      name: "Inscrição para Corrida das Estações (Outono)",
      description: "Incentivo a melhora física e de saúde do casal",
      price: 270.64,
      image: "https://magento.runningland.com.br/media/catalog/product/cache/4ec0339e0e27010557b958cd357e7b98/a/k/akit-basico-verao-mandala_1_.png?auto=webp&format=png&imageWidths=SMALL",
      category: "Casal"
    },
    {
      id: 3,
      name: "Diaría numa pousada",
      description: "Para voltarmos relaxados da lua de mel",
      price: 450.55,
      image: "https://tse4.mm.bing.net/th/id/OIP.EAXaxiG3K8mmgpGKAfvwfQHaEJ?rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "Quarto"
    },
    {
      id: 4,
      name: "Garantindo a janta dos noivos",
      description: "Com fome a gente fica estressado",
      price: 200.64,
      image: "https://mercadoeconsumo.com.br/wp-content/uploads/2022/02/ifood-moto.png",
      category: "Cozinha"
    },
    {
      id: 5,
      name: "Ajuda a melhora do setup do noivo",
      description: "Ele é DEV freelancer :/",
      price: 180.97,
      image: "https://tse1.mm.bing.net/th/id/OIP.5x4c1kTRDb6pN_h0PgDLaQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "Noivo"
    },
    {
      id: 6,
      name: "Camisas Cristã",
      description: "Ajuda para os noivos irem de par de jarro para igreja",
      price: 150.87,
      image: "https://img.elo7.com.br/product/zoom/4206C72/camiseta-casal-dia-dos-namorados-casal-religioso-camiseta-namorados.jpg",
      category: "Casal"
    },
    {
      id: 7,
      name: "1 mês de Academia",
      description: "Manter vida fitness é complicado...",
      price: 210.11,
      image: "https://i.pinimg.com/originals/33/8c/62/338c62abe41cb0a2038c2fd35086d0b0.png",
      category: "Casal"
    },
    {
      id: 8,
      name: "Pra não dizer que não dei nada",
      description: "Aceitamos de bom grado! :)",
      price: 50,
      image: "https://th.bing.com/th/id/OIP.H4sQl9qqIxZq-pX_fHxcOgHaHa?w=164&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      category: "Casal"
    },
    {
      id: 9,
      name: "Legendarios Ticket",
      description: "Ajuda pro noivo subir a montanha de novo",
      price: 600,
      image: "https://tse2.mm.bing.net/th/id/OIP.yxW7pDy9WKh6qyKmF9dxYAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "Noivo"
    },
    {
      id: 10,
      name: "Renove o estoque de perfume do casal",
      description: "Ninguém aguenta noivos fedorentos",
      price: 140.22,
      image: "https://th.bing.com/th/id/OIP.u8NnFuhBAb5CFQ8jOtoAAQAAAA?w=191&h=207&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      category: "Casal"
    },
    {
      id: 11,
      name: "Cantinho do Café",
      description: "Pra noiva ter um dia de sossego",
      price: 175.36,
      image: "https://tse3.mm.bing.net/th/id/OIP.IQ-GH4BswxVpxIbfSFlofQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "Noiva"
    },
    {
      id: 12,
      name: "Utensílios de Cozinha",
      description: "Pra casa ficar bonita",
      price: 60.41,
      image: "https://m.media-amazon.com/images/I/51mNQxRHwNL._AC_SY300_SX300_QL70_ML2_.jpg",
      category: "Cozinha"
    },
    {
      id: 13,
      name: "Jogo de Jantar de Porcelana",
      description: "Pra cozinha ficar bonita",
      price: 245.87,
      image: "https://m.media-amazon.com/images/I/61eCRoJJi2L._AC_SY300_SX300_QL70_ML2_.jpg",
      category: "Cozinha"
    },
    {
      id: 14,
      name: "Porta-Temperos que gira",
      description: "Pra noiva não esquecer e deixar a comida boa",
      price: 55.65,
      image: "https://m.media-amazon.com/images/I/61TqwMD492L._AC_SX300_SY300_QL70_ML2_.jpg",
      category: "Cozinha"
    },
    {
      id: 15,
      name: "Salto da Noiva",
      description: "Pra noiva ficar charmosa",
      price: 80.04,
      image: "https://tse1.mm.bing.net/th/id/OIP.iBifROMbok4u7fVf1GqYwwHaHa?w=600&h=600&rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "Noiva"
    },
    {
      id: 16,
      name: "Jogo de Toalha",
      description: "Ficar sequinho...",
      price: 110.02,
      image: "https://static-images-now.westwing.com.br/s/336210-7347-255734-1-product2.jpg",
      category: "Banho"
    },
    {
      id: 17,
      name: "Curso do Noivo",
      description: "Sabedoria nunca é demais",
      price: 155.14,
      image: "https://i.pinimg.com/736x/5f/0e/34/5f0e34d8ee019e93907562109c173885.jpg",
      category: "Noivo"
    },
    {
      id: 18,
      name: "Kit de Canecas",
      description: "Pra enfeitar o cantinho do café",
      price: 75.12,
      image: "https://m.media-amazon.com/images/I/51olfmYFswL._AC_SY300_SX300_QL70_ML2_.jpg",
      category: "Cozinha"
    },
    {
      id: 19,
      name: "Corte de Cabelo do noivo",
      description: "Pra não ficar com o cabelo feio no dia",
      price: 45.99,
      image: "https://blog.mensmarket.com.br/wp-content/uploads/2020/08/corte-de-cabelo-engracado.jpg",
      category: "Noivo"
    },
    {
      id: 20,
      name: "Kit pra Cabelo da Noiva",
      description: "Pra não ficar com o cabelo feio no dia",
      price: 99.99,
      image: "https://blog.unicpharma.com.br/wp-content/uploads/2019/11/bad-hair-day-o-que-fazer-8.jpg",
      category: "Noiva"
    },
    {
      id: 21,
      name: "Kit de Spa Day",
      description: "Pra ficar zen no dia",
      price: 90.99,
      image: "https://th.bing.com/th/id/R.741781626f3db8a89d734e1c75bfaaa1?rik=A8e24h0VtQrfEw&pid=ImgRaw&r=0",
      category: "Noiva"
    },
    {
      id: 22,
      name: "Kit Lavar Carro",
      description: "Pra deixar o carro novo limpinho todo dia",
      price: 130.94,
      image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-ly80va4hd6ud1a",
      category: "Banho"
    },
    {
      id: 23,
      name: "Ajuda pra pagar fotográfo",
      description: "Tem até produção cinematográfica B-)",
      price: 120.94,
      image: "https://tse3.mm.bing.net/th/id/OIP.RG4D71V-2f_3bEdhdlMQxgHaDy?rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "Casal"
    },
    {
      id: 24,
      name: "Ajuda para comprar doces para noiva",
      description: "Deixar noiva feliz o tempo todo",
      price: 106.21,
      image: "https://tse3.mm.bing.net/th/id/OIP._ERQugbO-V64XKIeDl4uZAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "Noiva"
    },
    
    {
      id: 25,
      name: "Sapato dos sonhos pro noivo",
      description: "Realize um sonho!",
      price: 95.77,
      image: "https://tse2.mm.bing.net/th/id/OIP.2IjE2y0-rb3_xN_URxKhLwHaFj?w=800&h=600&rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "Noivo"
    },

    
  ];

  const categories = ["Todos", "Cozinha", "Casal", "Quarto", "Banho", "Noivo","Noiva"];

  const filteredGifts = selectedCategory === "Todos" 
    ? gifts 
    : gifts.filter(gift => gift.category === selectedCategory);

  const addToCart = (gift: Gift) => {
    const existingItem = cart.find(item => item.id === gift.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === gift.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...gift, quantity: 1 }]);
    }
  };

  const handleCardPayment = () => {
    // Redireciona para o Mercado Pago com o carrinho completo
    window.open(mercadoPagoLink, "_blank");
    
    // Resetar após redirecionar
    setCart([]);
    setShowCheckout(false);
    setShowCart(false);
    setPaymentMethod(null);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (cart.length > 0) {
      setShowCheckout(true);
    }
  };

  const handleConfirmGift = () => {
    // Formata a lista de presentes detalhada
    const giftListDetailed = cart.map(item => 
      `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}`
    ).join('%0A');
    
    // Monta a mensagem formatada para WhatsApp
    const message = encodeURIComponent(
      `🎁*CONFIRMAÇÃO DE PRESENTE*\n\n` +
      `Olá! Gostaria de presentear os noivos com:\n\n` +
      `📬 *Presentes:*\n`
    ) + giftListDetailed + encodeURIComponent(
      `\n\n *💰Total: R$ ${totalPrice.toFixed(2)}*\n\n` +
      `🤑*Dados do Presenteador:*\n` +
      `Nome: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Telefone: ${formData.phone}\n\n` +
      `Aguardo confirmação dos dados para realizar o pix!💜`
    );
    
    // Abre WhatsApp com a mensagem
    window.open(
      `https://wa.me/${whatsappNumber}?text=${message}`,
      "_blank"
    );
    
    // Resetar após enviar
    setCart([]);
    setShowCheckout(false);
    setShowCart(false);
    setFormData({ name: "", email: "", phone: "" });
    setPaymentMethod(null);
  };

  return (
    <div className="w-full h-full bg-[url('https://jdfeczhjhkosemqiasud.supabase.co/storage/v1/object/public/images/background2.png')] bg-cover bg-center rounded-3xl shadow-2xl overflow-hidden flex flex-col">
      {/* Header com flores decorativas */}
      <div className="relative bg-gradient-to-br from-blue-50/95 via-white/95 to-blue-50/95 backdrop-blur-sm px-6 py-4 flex items-center justify-between border-b border-blue-200/50">
        {/* Flor decorativa canto esquerdo */}
        <img
          src="https://media-public.canva.com/5CsFo/MAFyRB5CsFo/1/tl.png"
          alt=""
          className="absolute -top-2 -left-2 w-20 sm:w-24 opacity-60 pointer-events-none"
        />
        
        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={onBack}
            className="text-blue-800 hover:bg-blue-100/70 p-2 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-blue-900 text-lg font-semibold">Lista de Presentes</h2>
            <p className="text-blue-700/70 text-xs">Escolha seu presente</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowCart(true)}
          className="relative text-blue-800 hover:bg-blue-100/70 p-2 rounded-full transition-colors z-10"
        >
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-md">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Categorias */}
      <div className="px-4 py-3 bg-white/60 backdrop-blur-sm border-b border-blue-200/30 overflow-x-auto">
        <div className="flex gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-blue-700 text-white shadow-md"
                  : "bg-blue-50/80 text-blue-800 hover:bg-blue-100/80 border border-blue-200/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Presentes */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredGifts.map(gift => (
            <motion.div
              key={gift.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/90 backdrop-blur-sm border-2 border-blue-200/40 rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:border-blue-300/60 transition-all"
            >
              <div className="aspect-square overflow-hidden bg-blue-50/50">
                <img
                  src={gift.image}
                  alt={gift.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 space-y-3">
                {/* Nome e Descrição */}
                <div>
                  <h3 className="font-semibold text-base text-blue-900 line-clamp-2 leading-tight">
                    {gift.name}
                  </h3>
                  <p className="text-xs text-blue-700/60 line-clamp-2 mt-1">
                    {gift.description}
                  </p>
                </div>
                
                {/* Preço */}
                <div className="pt-1">
                  <span className="text-blue-700 font-bold text-lg">
                    R$ {gift.price.toFixed(2)}
                  </span>
                </div>
                
                {/* Botão Adicionar */}
                <button
                  onClick={() => addToCart(gift)}
                  className="
                    w-full
                    bg-blue-700 hover:bg-blue-800 
                    text-white text-sm font-medium
                    py-3 px-4
                    rounded-xl 
                    transition-all duration-200
                    shadow-md hover:shadow-lg
                    active:scale-95
                    flex items-center justify-center gap-2
                  "
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Adicionar ao Carrinho</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Carrinho Slide */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Header do Carrinho */}
              <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
                <h3 className="text-white text-lg font-semibold">Carrinho</h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items do Carrinho */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <ShoppingCart className="w-16 h-16 mb-3" />
                    <p>Seu carrinho está vazio</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div
                      key={item.id}
                      className="bg-gray-50 rounded-lg p-3 flex gap-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-gray-900">
                          {item.name}
                        </h4>
                        <p className="text-blue-600 font-bold text-sm mt-1">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="bg-white border border-gray-300 p-1 rounded hover:bg-gray-100"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium px-2">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="bg-white border border-gray-300 p-1 rounded hover:bg-gray-100"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-red-500 hover:text-red-700 p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer do Carrinho */}
              {cart.length > 0 && (
                <div className="border-t border-gray-200 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      R$ {totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Finalizar Presente
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
              >
                {/* Header */}
                <div className="bg-blue-600 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                  <h3 className="text-white text-lg font-semibold">Finalizar Presente</h3>
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Resumo */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Gift className="w-5 h-5 text-blue-600" />
                      Resumo do Presente
                    </h4>
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="text-gray-900 font-medium">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-blue-200 mt-3 pt-3 flex justify-between">
                      <span className="font-semibold text-gray-900">Total:</span>
                      <span className="text-xl font-bold text-blue-600">
                        R$ {totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Seleção de Método de Pagamento */}
                  {!paymentMethod ? (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 text-center mb-4">Escolha a forma de pagamento</h4>
                      
                      {/* Botão PIX */}
                      <button
                        onClick={() => setPaymentMethod("pix")}
                        className="
                          w-full
                          bg-gradient-to-r from-green-600 to-green-700
                          hover:from-green-700 hover:to-green-800
                          text-white
                          py-4 px-6
                          rounded-xl
                          transition-all duration-200
                          shadow-lg hover:shadow-xl
                          active:scale-95
                          flex items-center justify-center gap-3
                        "
                      >
                        <Banknote className="w-6 h-6" />
                        <div className="text-left">
                          <div className="font-bold text-base">Pagar com PIX</div>
                          <div className="text-xs text-green-100">Transferência instantânea</div>
                        </div>
                      </button>

                      {/* Botão Cartão */}
                      <button
                        onClick={() => setPaymentMethod("card")}
                        className="
                          w-full
                          bg-gradient-to-r from-blue-600 to-blue-700
                          hover:from-blue-700 hover:to-blue-800
                          text-white
                          py-4 px-6
                          rounded-xl
                          transition-all duration-200
                          shadow-lg hover:shadow-xl
                          active:scale-95
                          flex items-center justify-center gap-3
                        "
                      >
                        <CreditCard className="w-6 h-6" />
                        <div className="text-left">
                          <div className="font-bold text-base">Pagar com Cartão</div>
                          <div className="text-xs text-blue-100">Via Mercado Pago</div>
                        </div>
                      </button>
                    </div>
                  ) : paymentMethod === "pix" ? (
                    <>
                      {/* Formulário PIX */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-gray-900">Seus Dados</h4>
                          <button
                            onClick={() => setPaymentMethod(null)}
                            className="text-sm text-blue-600 hover:text-blue-700 underline"
                          >
                            Voltar
                          </button>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Nome Completo
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              id="name"
                              type="text"
                              placeholder="Seu nome"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                            E-mail
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="seu@email.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                            Telefone
                          </Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="(11) 99999-9999"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="pl-10"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Dados PIX */}
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Banknote className="w-5 h-5 text-green-600" />
                          Dados para PIX
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Chave PIX:</span>
                            <p className="font-mono text-gray-900 bg-white p-2 rounded mt-1 border border-green-200">
                              {pixKey}
                            </p>
                          </div>
                          <p className="text-xs text-gray-600 mt-3">
                            Após realizar o PIX, clique em "Confirmar Presente" para nos notificar.
                          </p>
                        </div>
                      </div>

                      {/* Botão Confirmar PIX */}
                      <Button
                        onClick={handleConfirmGift}
                        disabled={!formData.name || !formData.email || !formData.phone}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Confirmar Presente via PIX
                      </Button>
                    </>
                  ) : (
                    <>
                      {/* Fluxo Cartão */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-gray-900">Pagamento com Cartão</h4>
                          <button
                            onClick={() => setPaymentMethod(null)}
                            className="text-sm text-blue-600 hover:text-blue-700 underline"
                          >
                            Voltar
                          </button>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <CreditCard className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                            <div className="space-y-2 text-sm">
                              <p className="text-gray-700">
                                Você será redirecionado para o <strong>Mercado Pago</strong> e lá digitará o valor total do(s) presente(s) para finalizar o pagamento com cartão de crédito de forma segura.
                              </p>
                              <p className="text-xs text-gray-600">
                                Após concluir o pagamento, você receberá a confirmação no seu e-mail.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Botão Ir para Mercado Pago */}
                        <Button
                          onClick={handleCardPayment}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl flex items-center justify-center gap-2"
                        >
                          <CreditCard className="w-5 h-5" />
                          Ir para Mercado Pago
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}