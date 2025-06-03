const SubscriptionSection = ({ user, onChangePlan, onChangePassword, openPlanModal, openPasswordModal }) => (
  <div className="flex flex-col gap-3 text-left min-h-[340px] mt-8 md:mt-0">
    <div className="flex items-center gap-2">
      <span className="font-semibold">Tip pretplate:</span>
      <span
        title={
          user.plan === "Basic"
            ? "Osnovna pretplata (pon-pet)"
            : "Premium pretplata (pon-ned)"
        }
        className="bg-green-100 px-3 py-1 rounded-full text-sm cursor-help"
      >
        💳 {user.plan}
      </span>
    </div>
    {user.plan === "Basic" ? (
      <>
        <p className="text-sm">Trenutno koristiš samo 5/7 obroka tjedno.</p>
        <p className="font-semibold mt-2">
          Nadogradi i osiguraj si ukusne subote i nedjelje — bez kuhanja!
          <br /> Klikni ispod i prebaci se na Premium!
        </p>
      </>
    ) : (
      <>
        <p className="text-sm">Koristite 7/7 obroka tjedno. Čestitamo!</p>
        <p className="font-semibold mt-2">Hvala vam na podršci!</p>
      </>
    )}
    <div className="flex flex-col gap-3 mt-4">
      <button
        onClick={openPlanModal}
        className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
      >
        Promijeni pretplatu
      </button>
      <button
        onClick={openPasswordModal}
        className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
      >
        Promijeni lozinku
      </button>
    </div>
  </div>
);

export default SubscriptionSection;