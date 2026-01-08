import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, Plus, Minus, X, ArrowLeft, Gift, CreditCard, User, Mail, Phone } from "lucide-react";
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
}

export function GiftRegistry({ onBack, pixKey, bankDetails }: GiftRegistryProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

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
      price: 350,
      image: "https://images.unsplash.com/photo-1584990347449-7dd896f7d7b6?w=400",
      category: "Cozinha"
    },
    {
      id: 2,
      name: "Conjunto de Taças",
      description: "12 taças de cristal para vinho",
      price: 280,
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400",
      category: "Mesa"
    },
    {
      id: 3,
      name: "Edredom Casal",
      description: "Edredom king size em algodão egípcio",
      price: 450,
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400",
      category: "Quarto"
    },
    {
      id: 4,
      name: "Liquidificador",
      description: "Liquidificador de alta potência 1000W",
      price: 220,
      image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400",
      category: "Cozinha"
    },
    {
      id: 5,
      name: "Jogo de Toalhas",
      description: "6 toalhas de banho premium",
      price: 180,
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400",
      category: "Banho"
    },
    {
      id: 6,
      name: "Cafeteira Elétrica",
      description: "Cafeteira programável com timer",
      price: 320,
      image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400",
      category: "Cozinha"
    },
    {
      id: 7,
      name: "Aparelho de Jantar",
      description: "Conjunto 30 peças em porcelana",
      price: 520,
      image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400",
      category: "Mesa"
    },
    {
      id: 8,
      name: "Aspirador de Pó",
      description: "Aspirador robô inteligente",
      price: 890,
      image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400",
      category: "Limpeza"
    },
    {
      id: 9,
      name: "Jogo de Cama",
      description: "Jogo de lençol queen 4 peças",
      price: 250,
      image: "https://images.unsplash.com/photo-1616594266886-f325f57c121d?w=400",
      category: "Quarto"
    },
  ];

  const categories = ["Todos", "Cozinha", "Mesa", "Quarto", "Banho", "Limpeza"];

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
    const giftList = cart.map(item => `${item.quantity}x ${item.name}`).join(", ");
    const message = encodeURIComponent(
      `Olá! Gostaria de presentear com: ${giftList}\n\nTotal: R$ ${totalPrice.toFixed(2)}\n\nMeus dados:\nNome: ${formData.name}\nEmail: ${formData.email}\nTelefone: ${formData.phone}`
    );
    
    // Aqui você poderia abrir WhatsApp ou outro método de confirmação
    alert(`Presente confirmado!\n\nTotal: R$ ${totalPrice.toFixed(2)}\n\nDados para PIX:\n${pixKey}\n\nObrigado, ${formData.name}!`);
    
    // Resetar
    setCart([]);
    setShowCheckout(false);
    setFormData({ name: "", email: "", phone: "" });
  };

  return (
    <div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-white text-lg font-semibold">Lista de Presentes</h2>
            <p className="text-blue-100 text-xs">Escolha seu presente</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowCart(true)}
          className="relative text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
        >
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Categorias */}
      <div className="px-4 py-3 border-b border-gray-200 overflow-x-auto">
        <div className="flex gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Presentes */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {filteredGifts.map(gift => (
            <motion.div
              key={gift.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={gift.image}
                  alt={gift.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 space-y-2">
                <div>
                  <h3 className="font-semibold text-sm text-gray-900 line-clamp-1">
                    {gift.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {gift.description}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-bold text-sm">
                    R$ {gift.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(gift)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
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

                  {/* Formulário */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Seus Dados</h4>
                    
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
                      <CreditCard className="w-5 h-5 text-green-600" />
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

                  {/* Botão Confirmar */}
                  <Button
                    onClick={handleConfirmGift}
                    disabled={!formData.name || !formData.email || !formData.phone}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirmar Presente
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
