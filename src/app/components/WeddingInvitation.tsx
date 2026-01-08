import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, MapPin, Calendar, MessageCircle, Gift, Info, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { GiftRegistry } from "./GiftRegistry";
import coverImage from 'figma:asset/7809b2f4381e25b916d2eed6f0bfdb8a20773068.png';

export function WeddingInvitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [showGiftRegistry, setShowGiftRegistry] = useState(false);

  // Dados do casamento
  const weddingData = {
    bride: "Bruna Ramos",
    groom: "Israel Brito",
    date: "18 de Fevereiro de 2025",
    dayOfWeek: "Quarta-feira",
    time: "19:00",
    venue: "Igreja Nossa Senhora",
    address: "Rua das Flores, 123 - São Paulo, SP",
    reception: "Espaço Garden",
    receptionAddress: "Av. Paulista, 456 - São Paulo, SP",
    whatsappNumber: "5511999999999",
    googleMapsLink: "https://maps.google.com",
    dressCode: "Traje: Esporte Fino",
    pixKey: "casamento@email.com",
    bankDetails: "Banco: 001 | Ag: 1234 | Conta: 12345-6"
  };

  const handleConfirmPresence = () => {
    const message = encodeURIComponent(
      `Olá! Confirmo minha presença no casamento de ${weddingData.bride} e ${weddingData.groom}! 💒`
    );
    window.open(
      `https://wa.me/${weddingData.whatsappNumber}?text=${message}`,
      "_blank"
    );
  };

  const handleLocation = () => {
    window.open(weddingData.googleMapsLink, "_blank");
  };

  const handleCalendar = () => {
    // Criar evento para Google Calendar
    const eventTitle = encodeURIComponent(
      `Casamento ${weddingData.bride} & ${weddingData.groom}`
    );
    const eventDetails = encodeURIComponent(
      `Cerimônia: ${weddingData.venue}\nRecepção: ${weddingData.reception}`
    );
    const eventLocation = encodeURIComponent(weddingData.address);
    const eventDate = "20250218T190000/20250218T230000";

    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&details=${eventDetails}&location=${eventLocation}&dates=${eventDate}`,
      "_blank"
    );
  };

  const handleOpenInvitation = () => {
    setIsOpen(true);
  };

  return (
    <div 
      className="w-full max-w-lg mx-auto h-[85vh] max-h-[900px] min-h-[600px]" 
      style={{ perspective: "1500px" }}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          // CAPA DO CONVITE COM EFEITO DE ABERTURA
          <motion.div
            key="cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full"
            style={{ perspective: "1500px" }}
          >
            {/* Porta Esquerda */}
            <motion.div
              className="absolute top-0 left-0 w-1/2 h-full origin-left"
              style={{ 
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden"
              }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: -110 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              onClick={handleOpenInvitation}
            >
              <div className="relative w-full h-full bg-white rounded-l-3xl shadow-2xl overflow-hidden cursor-pointer">
                {/* Imagem da capa - lado esquerdo */}
                <div className="absolute inset-0">
                  <img
                    src={coverImage}
                    alt="Convite"
                    className="w-[200%] h-full object-cover object-left"
                    style={{ transform: "translateX(0)" }}
                  />
                </div>
                
                {/* Sombra de profundidade */}
                <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-r from-transparent to-black/10" />
              </div>
            </motion.div>

            {/* Porta Direita */}
            <motion.div
              className="absolute top-0 right-0 w-1/2 h-full origin-right"
              style={{ 
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden"
              }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: 110 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              onClick={handleOpenInvitation}
            >
              <div className="relative w-full h-full bg-white rounded-r-3xl shadow-2xl overflow-hidden cursor-pointer">
                {/* Imagem da capa - lado direito */}
                <div className="absolute inset-0">
                  <img
                    src={coverImage}
                    alt="Convite"
                    className="w-[200%] h-full object-cover object-right"
                    style={{ transform: "translateX(-100%)" }}
                  />
                </div>
                
                {/* Sombra de profundidade */}
                <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-l from-transparent to-black/10" />
              </div>
            </motion.div>

            {/* Indicador para abrir - sobreposto */}
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
            >
              <div className="bg-white/95 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg border border-blue-200">
                <p className="text-blue-900 text-xs sm:text-sm font-medium">
                  Toque para abrir
                </p>
              </div>
              <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-blue-900" />
            </motion.div>
          </motion.div>
        ) : (
          // CONTEÚDO DO CONVITE
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header decorativo */}
            <div className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 px-6 sm:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6">
              {/* Flores decorativas */}
              <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 opacity-30">
                <img
                  src="https://images.unsplash.com/photo-1709021108270-6c92c407d36c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmNvbG9yJTIwYmx1ZSUyMGZsb3dlcnN8ZW58MXx8fHwxNzY3ODM2MDA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Flores"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 opacity-30 transform rotate-180">
                <img
                  src="https://images.unsplash.com/photo-1709021108270-6c92c407d36c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmNvbG9yJTIwYmx1ZSUyMGZsb3dlcnN8ZW58MXx8fHwxNzY3ODM2MDA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Flores"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Nomes dos noivos */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-center space-y-2 relative z-10"
              >
                <h1 className="text-3xl sm:text-4xl font-serif text-blue-900 italic">
                  {weddingData.groom}
                </h1>
                <p className="text-xl sm:text-2xl text-blue-800">&</p>
                <h1 className="text-3xl sm:text-4xl font-serif text-blue-900 italic">
                  {weddingData.bride}
                </h1>
              </motion.div>

              {/* Frase */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-center text-gray-600 text-xs sm:text-sm mt-4 sm:mt-6 relative z-10"
              >
                Together with their families<br />
                invite you to their wedding celebration
              </motion.p>
            </div>

            {/* Conteúdo rolável */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
              {/* Data e Hora */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-center space-y-2 border-y border-blue-200 py-4 sm:py-6"
              >
                <p className="text-gray-600 text-xs sm:text-sm uppercase tracking-wide">{weddingData.dayOfWeek}</p>
                <div className="flex items-center justify-center gap-3 sm:gap-4">
                  <div className="h-px w-10 sm:w-12 bg-blue-300" />
                  <p className="text-4xl sm:text-5xl font-serif text-blue-900">18</p>
                  <div className="h-px w-10 sm:w-12 bg-blue-300" />
                </div>
                <p className="text-gray-600 text-xs sm:text-sm">Fevereiro de 2025</p>
                <p className="text-gray-800 text-sm sm:text-base mt-2 sm:mt-3">às {weddingData.time}</p>
              </motion.div>

              {/* Local */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="space-y-3 sm:space-y-4"
              >
                <div className="text-center space-y-1">
                  <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">Cerimônia</p>
                  <p className="text-sm sm:text-base text-gray-800">{weddingData.venue}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{weddingData.address}</p>
                </div>

                <div className="text-center space-y-1">
                  <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">Recepção</p>
                  <p className="text-sm sm:text-base text-gray-800">{weddingData.reception}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{weddingData.receptionAddress}</p>
                </div>
              </motion.div>

              {/* Botões de ação */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="space-y-3 pt-2 sm:pt-4"
              >
                <Button
                  onClick={handleConfirmPresence}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-5 sm:py-6 rounded-xl shadow-lg text-sm sm:text-base"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Confirmar Presença
                </Button>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <Button
                    onClick={handleLocation}
                    variant="outline"
                    className="py-5 sm:py-6 rounded-xl border-2 border-blue-200 hover:bg-blue-50 text-xs sm:text-sm"
                  >
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    Localização
                  </Button>

                  <Button
                    onClick={handleCalendar}
                    variant="outline"
                    className="py-5 sm:py-6 rounded-xl border-2 border-blue-200 hover:bg-blue-50 text-xs sm:text-sm"
                  >
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    Salvar na Agenda
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <Button
                    onClick={() => setShowGiftRegistry(true)}
                    variant="outline"
                    className="py-5 sm:py-6 rounded-xl border-2 border-blue-200 hover:bg-blue-50 text-xs sm:text-sm"
                  >
                    <Gift className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    Presentear
                  </Button>

                  <Button
                    onClick={() => setShowMoreInfo(true)}
                    variant="outline"
                    className="py-5 sm:py-6 rounded-xl border-2 border-blue-200 hover:bg-blue-50 text-xs sm:text-sm"
                  >
                    <Info className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    Mais Info
                  </Button>
                </div>
              </motion.div>

              {/* Mensagem final */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="text-center py-3 sm:py-4"
              >
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mx-auto mb-2 sm:mb-3" />
                <p className="text-xs sm:text-sm text-gray-500 italic">
                  "O amor é paciente, o amor é bondoso"
                </p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-1">1 Coríntios 13:4</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dialog - Como nos presentear */}
      <AnimatePresence>
        {showGiftRegistry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4"
          >
            <div className="w-full h-full max-w-lg">
              <GiftRegistry 
                onBack={() => setShowGiftRegistry(false)}
                pixKey={weddingData.pixKey}
                bankDetails={weddingData.bankDetails}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dialog - Mais informações */}
      <Dialog open={showMoreInfo} onOpenChange={setShowMoreInfo}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-blue-900">
              <Info className="w-6 h-6" />
              Mais Informações
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-3">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Traje</p>
                <p className="text-gray-900">{weddingData.dressCode}</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Horários</p>
                <p className="text-gray-900">Cerimônia: {weddingData.time}</p>
                <p className="text-gray-900">Recepção: Logo após a cerimônia</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Contato</p>
                <p className="text-gray-900 text-sm">
                  Para mais informações, entre em contato pelo WhatsApp através do botão "Confirmar Presença"
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Observações</p>
                <p className="text-gray-900 text-sm">
                  • Confirme sua presença até 10/02/2025<br />
                  • O local possui estacionamento gratuito<br />
                  • Celebração aberta e fechada
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}