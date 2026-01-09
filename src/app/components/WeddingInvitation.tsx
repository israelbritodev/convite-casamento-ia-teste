import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  MapPin,
  Calendar,
  MessageCircle,
  Gift,
  Info,
  Hand,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { GiftRegistry } from "./GiftRegistry";

const coverImage =
  "https://jdfeczhjhkosemqiasud.supabase.co/storage/v1/object/public/images/capa.png";

interface IconItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
}

const handleInstagramEffects = () => {
  window.open(
    "https://www.instagram.com/jovembritojr/",
    "_blank",
  );
};

function IconItem({
  icon: Icon,
  label,
  onClick,
}: IconItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 cursor-pointer group transition-transform hover:scale-110 active:scale-95"
    >
      <div
        className="
          w-18 h-18
          sm:w-16 sm:h-16
          rounded-full
          bg-blue-50/90
          border-3 border-blue-200/60
          flex items-center justify-center
          shadow-md
          group-hover:shadow-lg
          group-hover:bg-blue-100/90
          transition-all duration-300
        "
      >
        <Icon className="w-8 h-8 sm:w-7 sm:h-7 text-blue-700 drop-shadow-sm stroke-[1.8]" />
      </div>

      <span className="text-[10px] sm:text-xs text-gray-700 font-medium text-center">
        {label}
      </span>
    </button>
  );
}

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
      "Traje: Esporte fino e lembre-se de evitar o uso de roupas brancas e tons claros",
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
      weddingData.receptionAddress,
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
      className="w-full max-w-lg mx-auto h-[85dvh] max-h-[900px] min-h-[85dvh]"
      style={{ perspective: "1500px" }}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          // CAPA DO CONVITE COM TRANSIÇÃO SIMPLES
          <motion.div
            key="cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            onClick={handleOpenInvitation}
            className="relative w-full h-full cursor-pointer rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Imagem de fundo */}
            <motion.img
              src={coverImage}
              alt="Convite"
              className="w-full h-full object-contain sm:object-cover"
              exit={{ scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.8 }}
            />

            {/* Overlay com gradiente na saída */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-blue-900/20"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />

            {/* Indicador para abrir - tema atualizado */}
            <motion.div
              animate={{
                y: [0, 10, 0],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 pointer-events-none"
            >
              <div className="bg-white/95 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-xl border-2 border-blue-300/40">
                <p className="text-blue-900 text-sm sm:text-base font-semibold tracking-wide whitespace-nowrap">
                  Toque para interagir
                </p>
              </div>
              <div className="bg-blue-100/90 backdrop-blur-sm p-2 rounded-full border-2 border-blue-300/60 shadow-lg">
                <Hand className="w-6 h-6 sm:w-7 sm:h-7 text-blue-800" />
              </div>
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
    min-h-screen w-full bg-[url('https://jdfeczhjhkosemqiasud.supabase.co/storage/v1/object/public/images/background2.png')] bg-cover bg-center bg-no-repeat
  "
          >
            {/* Header decorativo */}
            <div className="relative px-6 sm:px-8 pt-10 sm:pt-14 pb-8 sm:pb-10 overflow-hidden">
              {/* Flor canto superior esquerdo (integrada ao papel) */}
              <img
                src="https://media-public.canva.com/5CsFo/MAFyRB5CsFo/1/tl.png"
                alt=""
                loading="lazy"
                decoding="async"
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
                <h1 className="font-script text-4xl sm:text-6xl md:text-7xl leading-tight text-blue-900 italic text-shadow-romantic whitespace-nowrap">
                  {weddingData.groom}
                </h1>

                <p className="font-great-vibes text-3xl sm:text-4xl md:text-5xl leading-tight text-blue-900 italic text-shadow-romantic">
                  &
                </p>

                <h1 className="font-script text-4xl sm:text-6xl md:text-7xl leading-tight text-blue-900 italic text-shadow-romantic whitespace-nowrap">
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

              {/* Ícones informativos com funcionalidades */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="grid grid-cols-3 max-w-md mx-auto gap-4 sm:gap-6 justify-items-center pt-4 sm:pt-6 pb-2"
              >
                <IconItem
                  icon={MapPin}
                  label="Local"
                  onClick={handleLocation}
                />
                <IconItem
                  icon={MessageCircle}
                  label="Confirmar"
                  onClick={handleConfirmPresence}
                />
                <IconItem
                  icon={Calendar}
                  label="Agenda"
                  onClick={handleCalendar}
                />
                <IconItem
                  icon={Gift}
                  label="Presentes"
                  onClick={() => setShowGiftRegistry(true)}
                />
                <IconItem
                  icon={Info}
                  label="Informações"
                  onClick={() => setShowMoreInfo(true)}
                />
                <IconItem
                  icon={Sparkles}
                  label="Efeitos"
                  onClick={handleInstagramEffects}
                />
              </motion.div>

              {/* Mensagem final */}
              <div className="relative overflow-hidden pb-28 sm:pb-32 md:pb-36 pb-[env(safe-area-inset-bottom)]">
                <motion.div className="text-center py-3 sm:py-4">
                  <div className="relative z-10 text-center">
                    <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mx-auto mb-2 sm:mb-3" />
                    <p className="text-xs sm:text-sm text-gray-500 italic">
                      "Acima de tudo, porém, revistam-se{" "}
                      <br></br>do amor que é o elo perfeito."
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
                      Colossenses 3 : 14
                    </p>
                  </div>
                </motion.div>
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
                whatsappNumber={weddingData.whatsappNumber}
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
          <DialogDescription className="text-sm text-gray-500">
            Detalhes importantes para sua presença
          </DialogDescription>
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
                  <br />• Celebração privada
                  <br />• Por ser em um local privado há limite de pessoas, logo este convite é referente a VOCÊ e sua ESPOSA/MARIDO, caso houver, se desejar
                  levar seus filhos ou parentes para o evento precisará pagar a entrada deles. Caso haja dúvida entre em contato.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}