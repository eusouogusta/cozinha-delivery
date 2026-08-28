import Link from "next/link";

const areas = [
  {
    href: "/painel/reservas",
    title: "Reservas",
    description: "Visualize e acompanhe os eventos agendados.",
  },
  {
    href: "/painel/orcamentos",
    title: "Orçamentos",
    description: "Crie e acompanhe orçamentos para clientes.",
  },
];

export default function PainelPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-charcoal">Painel</h2>
        <p className="text-sm text-muted">
          Selecione uma área para continuar.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {areas.map((area) => (
          <Link
            key={area.href}
            href={area.href}
            className="rounded-2xl border border-border bg-white p-6 transition-colors hover:border-primary"
          >
            <h3 className="text-base font-semibold text-charcoal">
              {area.title}
            </h3>
            <p className="mt-1 text-sm text-muted">{area.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
