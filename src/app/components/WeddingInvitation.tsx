import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  MapPin,
  Calendar,
  MessageCircle,
  Gift,
  Info,
  ChevronDown,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { GiftRegistry } from "./GiftRegistry";
import coverImage from "figma:asset/7809b2f4381e25b916d2eed6f0bfdb8a20773068.png";

export function WeddingInvitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [showGiftRegistry, setShowGiftRegistry] =
    useState(false);

  // Dados do casamento
  const weddingData = {
    bride: "Bruna Ramos",
    groom: "Israel Brito",
    date: "25 de Fevereiro de 2025",
    dayOfWeek: "Quarta-feira",
    time: "12:00",
    reception: "Boi e Brasa - Abreu e Lima",
    receptionAddress:
      "Av. Brasil, 1945 - Desterro, Abreu e Lima - PE, 53570-165",
    whatsappNumber: "+5581983645043",
    googleMapsLink: "https://maps.app.goo.gl/GLoPum9dhUCkFP7H9",
    dressCode:
      "Traje: Esporte Fino e lembre-se de evitar o uso de roupas brancas e tons claros",
    pixKey:
      "israel.olv05@gmail.com - Israel J. Oliveira (Banco do Brasil)",
    bankDetails: "Banco: 001 | Ag: 0697-1 | Conta: 45174-6",
  };

  const handleConfirmPresence = () => {
    const message = encodeURIComponent(
      `Olá! Confirmo minha presença no almoço de casamento dos noivos ${weddingData.bride} e ${weddingData.groom}! 💒`,
    );
    window.open(
      `https://wa.me/${weddingData.whatsappNumber}?text=${message}`,
      "_blank",
    );
  };

  const handleLocation = () => {
    window.open(weddingData.googleMapsLink, "_blank");
  };

  const handleCalendar = () => {
    // Criar evento para Google Calendar
    const eventTitle = encodeURIComponent(
      `Almoço de casamento dos noivos ${weddingData.bride} & ${weddingData.groom}`,
    );
    const eventDetails = encodeURIComponent(
      `Recepção: ${weddingData.reception}`,
    );
    const eventLocation = encodeURIComponent(
      weddingData.address,
    );
    const eventDate = "20250225T190000/20250225T230000";

    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&details=${eventDetails}&location=${eventLocation}&dates=${eventDate}`,
      "_blank",
    );
  };

  const handleOpenInvitation = () => {
    setIsOpen(true);
  };

  return (
    <div
      className="w-full max-w-lg mx-auto h-[85dvh] max-h-[900px] min-h-screen"
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
                backfaceVisibility: "hidden",
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
                backfaceVisibility: "hidden",
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
              animate={{
                y: [0, 10, 0],
                opacity: [0.8, 1, 0.8],
              }}
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
            className="
    font-raleway
    min-h-screen w-full bg-[url('https://jdfeczhjhkosemqiasud.supabase.co/storage/v1/object/public/images/background.png')] bg-cover bg-center bg-no-repeat
  "
          >
            {/* Header decorativo */}
            <div className="relative px-6 sm:px-8 pt-10 sm:pt-14 pb-8 sm:pb-10 overflow-hidden">
              {/* Flor canto superior esquerdo (integrada ao papel) */}
              <img
                src="https://media-public.canva.com/5CsFo/MAFyRB5CsFo/1/tl.png"
                alt=""
                loading="lazy" decoding="async"
                className="
      absolute -top-0 -left-0
      w-28 sm:w-36 md:w-40
      opacity-80
      pointer-events-none
      select-none
    "
              />

              {/* Conteúdo do header */}
              <div className="relative z-10 text-center space-y-3">
                <h1 className="font-script text-5xl sm:text-6xl md:text-7xl leading-tight text-blue-900 italic text-shadow-romantic">
                  {weddingData.groom}
                </h1>

                <p className="font-great-vibes text-3xl sm:text-4xl md:text-5xl leading-tight text-blue-900 italic text-shadow-romantic">
                  &
                </p>

                <h1 className="font-script text-5xl sm:text-6xl md:text-7xl leading-tight text-blue-900 italic text-shadow-romantic">
                  {weddingData.bride}
                </h1>

                <p className="text-gray-600 text-xs sm:text-sm mt-4">
                  Convidamos você!
                  <br />
                  Para nossa celebração de casamento...
                </p>
              </div>
            </div>

            {/* Conteúdo rolável */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6 overscroll-contain">
              {/* Data e Hora */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-center space-y-2 border-y border-blue-200 py-4 sm:py-6"
              >
                <p className="text-gray-600 text-xs sm:text-sm uppercase tracking-wide">
                  {weddingData.dayOfWeek}
                </p>
                <div className="flex items-center justify-center gap-3 sm:gap-4">
                  <div className="h-px w-10 sm:w-12 bg-blue-300" />
                  <p className="text-4xl sm:text-5xl font-serif text-blue-900">
                    25
                  </p>
                  <div className="h-px w-10 sm:w-12 bg-blue-300" />
                </div>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Fevereiro de 2025
                </p>
                <p className="text-gray-800 text-sm sm:text-base mt-2 sm:mt-3">
                  às {weddingData.time}
                </p>
              </motion.div>

              {/* Local */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="space-y-3 sm:space-y-4"
              >
                <div className="text-center space-y-1">
                  <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                    Recepção
                  </p>
                  <p className="text-sm sm:text-base text-gray-800">
                    {weddingData.reception}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {weddingData.receptionAddress}
                  </p>
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
              <div className="relative overflow-hidden pb-28 sm:pb-32 md:pb-36 pb-[env(safe-area-inset-bottom)]">
                <motion.div className="text-center py-3 sm:py-4">
                <div className="relative z-10 text-center">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mx-auto mb-2 sm:mb-3" />
                <p className="text-xs sm:text-sm text-gray-500 italic">
                  "Acima de tudo, porém, revistam-se <br></br>do
                  amor que é o elo perfeito."
                </p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
                  Colossenses 3 : 14
                </p>
                </div>
              </motion.div>
                            {/* Flor canto inferior direito (espelhada) */}
              <img
                src="https://media-public.canva.com/5CsFo/MAFyRB5CsFo/1/tl.png"
                alt=""
                loading="lazy" decoding="async"
                className="
      absolute bottom-0 right-0 top--100
      w-32 sm:w-40 md:w-44
      opacity-80
      rotate-180
      pointer-events-none
      select-none
    "
              />
            </div>
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
      <Dialog
        open={showMoreInfo}
        onOpenChange={setShowMoreInfo}
      >
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
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Código de Vestimenta
                </p>
                <p className="text-gray-900">
                  {weddingData.dressCode}
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Horário
                </p>
                <p className="text-gray-900">
                  Recepção: {weddingData.time}
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Contato
                </p>
                <p className="text-gray-900 text-sm">
                  Para mais informações, entre em contato pelo
                  WhatsApp através do botão "Confirmar Presença"
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Observações
                </p>
                <p className="text-gray-900 text-sm">
                  • Confirme sua presença até 10/02/2025
                  <br />
                  • O local possui estacionamento gratuito
                  <br />• Celebração aberta e fechada
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}