import { redirect } from "next/navigation";

// Etap 2 - sprzedaż zakończona. Rzuty etapu 2 nie są już publikowane,
// przekierowujemy na stronę z rzutami aktualnego etapu.
export default function Etap2Rzut() {
    redirect("/rzuty");
}
