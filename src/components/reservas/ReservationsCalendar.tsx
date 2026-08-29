"use client";

import { useMemo, useState } from "react";

type Status = "Reservado" | "Aguardando cliente" | "Cancelado";
type Modality = "Presencial" | "Entrega";
type StatusFilter = Status | "Todos";
type ModalityFilter = Modality | "Todos";

type EventItem = {
  id: number;
  date: string;
  client: string;
  time: string;
  location: string;
  modality: Modality;
  guests: number;
  status: Status;
};

const initialEvents: EventItem[] = [
  { id: 1, date: "2026-09-05", client: "Marina Alves", time: "12:00", location: "Espaço Jardins", modality: "Presencial", guests: 60, status: "Reservado" },
  { id: 2, date: "2026-09-05", client: "Rafael Lima", time: "18:30", location: "Salão Imperial", modality: "Presencial", guests: 80, status: "Aguardando cliente" },
  { id: 3, date: "2026-09-12", client: "João Martins", time: "10:00", location: "Casa do cliente", modality: "Presencial", guests: 50, status: "Reservado" },
  { id: 4, date: "2026-09-12", client: "Camila Rocha", time: "15:00", location: "Espaço Aurora", modality: "Presencial", guests: 70, status: "Reservado" },
  { id: 5, date: "2026-09-12", client: "Carlos Nunes", time: "20:00", location: "Condomínio Parque", modality: "Presencial", guests: 40, status: "Aguardando cliente" },
  { id: 6, date: "2026-09-18", client: "Ana Beatriz", time: "12:00", location: "Entrega — Aldeota", modality: "Entrega", guests: 30, status: "Reservado" },
  { id: 7, date: "2026-09-23", client: "Paulo Mendes", time: "19:00", location: "Buffet Maison", modality: "Presencial", guests: 100, status: "Cancelado" },
  { id: 8, date: "2026-09-26", client: "Bianca Souza", time: "13:00", location: "Espaço Verde", modality: "Presencial", guests: 50, status: "Reservado" },
  { id: 9, date: "2026-09-26", client: "Lucas Freire", time: "20:00", location: "Casa do cliente", modality: "Presencial", guests: 40, status: "Reservado" },
  { id: 10, date: "2026-09-26", client: "Fernanda Reis", time: "16:00", location: "Entrega — Meireles", modality: "Entrega", guests: 30, status: "Aguardando cliente" },
];

const statusStyles: Record<Status, string> = {
  Reservado: "border-emerald-200 bg-emerald-50 text-emerald-800",
  "Aguardando cliente": "border-amber-200 bg-amber-50 text-amber-800",
  Cancelado: "border-rose-200 bg-rose-50 text-rose-700",
};

const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

function keyForDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function ReservationsCalendar() {
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [viewDate, setViewDate] = useState(new Date(2026, 8, 1));
  const [selectedDate, setSelectedDate] = useState("2026-09-12");
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [clientSearch, setClientSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("Todos");
  const [modalityFilter, setModalityFilter] = useState<ModalityFilter>("Todos");

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayMondayIndex = (new Date(year, month, 1).getDay() + 6) % 7;

  const filteredEvents = useMemo(() => {
    const normalizedSearch = clientSearch.trim().toLocaleLowerCase("pt-BR");

    return events.filter((event) => (
      event.client.toLocaleLowerCase("pt-BR").includes(normalizedSearch)
      && (statusFilter === "Todos" || event.status === statusFilter)
      && (modalityFilter === "Todos" || event.modality === modalityFilter)
    ));
  }, [clientSearch, events, modalityFilter, statusFilter]);
  const selectedEvents = useMemo(() => events.filter((event) => event.date === selectedDate), [events, selectedDate]);
  const filteredSelectedEvents = useMemo(() => filteredEvents.filter((event) => event.date === selectedDate), [filteredEvents, selectedDate]);
  const selectedDay = selectedDate ? Number(selectedDate.slice(-2)) : null;
  const hasActiveFilters = clientSearch !== "" || statusFilter !== "Todos" || modalityFilter !== "Todos";

  function navigateToMonth(targetYear: number, targetMonth: number) {
    const next = new Date(targetYear, targetMonth, 1);
    const nextMonthKey = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}`;

    setViewDate(next);
    setSelectedDate((currentDate) => currentDate.startsWith(nextMonthKey) ? currentDate : "");
  }

  function changeMonth(delta: number) {
    navigateToMonth(year, month + delta);
  }

  function goToToday() {
    const today = new Date();
    navigateToMonth(today.getFullYear(), today.getMonth());
  }

  function clearFilters() {
    setClientSearch("");
    setStatusFilter("Todos");
    setModalityFilter("Todos");
  }

  function createEvent(event: Omit<EventItem, "id">) {
    setEvents((currentEvents) => [
      ...currentEvents,
      {
        ...event,
        id: Math.max(0, ...currentEvents.map((currentEvent) => currentEvent.id)) + 1,
      },
    ]);

    const [eventYear, eventMonth] = event.date.split("-").map(Number);
    setViewDate(new Date(eventYear, eventMonth - 1, 1));
    setSelectedDate(event.date);
    setShowNewEvent(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-charcoal">Reservas</h2>
          <p className="mt-1 text-sm text-muted">Acompanhe a agenda e a disponibilidade dos eventos.</p>
        </div>
        <button onClick={() => setShowNewEvent(true)} className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-primary-dark">
          + Novo evento
        </button>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
        <Legend dot="bg-emerald-500" label="Reservado" />
        <Legend dot="bg-amber-500" label="Aguardando cliente" />
        <Legend dot="bg-rose-400" label="Cancelado" />
      </div>

      <div className="grid gap-3 rounded-2xl border border-border bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-[minmax(220px,1fr)_220px_180px_auto] lg:items-end">
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-charcoal">
          Buscar cliente
          <input type="search" value={clientSearch} onChange={(event) => setClientSearch(event.target.value)} placeholder="Nome do cliente" className="rounded-xl border border-border px-3 py-2.5 text-sm font-normal text-charcoal outline-none placeholder:text-muted/70 focus:border-primary" />
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-charcoal">
          Status
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as StatusFilter)} className="rounded-xl border border-border bg-white px-3 py-2.5 text-sm font-normal text-charcoal outline-none focus:border-primary">
            <option>Todos</option>
            <option>Aguardando cliente</option>
            <option>Reservado</option>
            <option>Cancelado</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-charcoal">
          Modalidade
          <select value={modalityFilter} onChange={(event) => setModalityFilter(event.target.value as ModalityFilter)} className="rounded-xl border border-border bg-white px-3 py-2.5 text-sm font-normal text-charcoal outline-none focus:border-primary">
            <option>Todos</option>
            <option>Presencial</option>
            <option>Entrega</option>
          </select>
        </label>
        <button onClick={clearFilters} disabled={!hasActiveFilters} className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-charcoal hover:bg-background disabled:cursor-not-allowed disabled:opacity-50">Limpar filtros</button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-4 sm:px-5">
            <button onClick={() => changeMonth(-1)} aria-label="Mês anterior" className="rounded-lg px-3 py-2 text-charcoal hover:bg-background">←</button>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <select aria-label="Mês" value={month} onChange={(event) => navigateToMonth(year, Number(event.target.value))} className="rounded-lg border border-border bg-white px-2 py-2 text-sm font-semibold text-charcoal outline-none focus:border-primary">
                {monthNames.map((monthName, monthIndex) => <option key={monthName} value={monthIndex}>{monthName}</option>)}
              </select>
              <input aria-label="Ano" type="number" value={year} onChange={(event) => navigateToMonth(Number(event.target.value), month)} className="w-24 rounded-lg border border-border px-2 py-2 text-sm font-semibold text-charcoal outline-none focus:border-primary" />
              <button onClick={goToToday} className="rounded-lg border border-border px-3 py-2 text-sm font-semibold text-charcoal hover:bg-background">Hoje</button>
            </div>
            <button onClick={() => changeMonth(1)} aria-label="Próximo mês" className="rounded-lg px-3 py-2 text-charcoal hover:bg-background">→</button>
          </div>

          <div className="grid grid-cols-7 border-b border-border bg-background/60">
            {weekDays.map((day) => <div key={day} className="px-1 py-2 text-center text-[11px] font-semibold uppercase tracking-wide text-muted sm:text-xs">{day}</div>)}
          </div>

          <div className="grid grid-cols-7">
            {Array.from({ length: firstDayMondayIndex }).map((_, index) => <div key={`empty-${index}`} className="min-h-20 border-b border-r border-border bg-background/30 sm:min-h-28" />)}
            {Array.from({ length: daysInMonth }, (_, index) => index + 1).map((day) => {
              const dateKey = keyForDate(year, month, day);
              const dayEvents = events.filter((event) => event.date === dateKey);
              const filteredDayEvents = filteredEvents.filter((event) => event.date === dateKey);
              const presencial = dayEvents.filter((event) => event.modality === "Presencial" && event.status === "Reservado").length;
              const delivery = filteredDayEvents.filter((event) => event.modality === "Entrega" && event.status !== "Cancelado").length;
              const waiting = filteredDayEvents.filter((event) => event.status === "Aguardando cliente").length;
              const isSelected = dateKey === selectedDate;

              return (
                <button key={dateKey} onClick={() => setSelectedDate(dateKey)} className={`min-h-20 border-b border-r border-border p-1.5 text-left align-top transition-colors sm:min-h-28 sm:p-2 ${isSelected ? "bg-orange-50 ring-1 ring-inset ring-primary" : "bg-white hover:bg-background/70"}`}>
                  <span className="text-xs font-semibold text-charcoal sm:text-sm">{day}</span>
                  {(presencial > 0 || filteredDayEvents.length > 0) && (
                    <div className="mt-1.5 space-y-1">
                      {presencial > 0 && <p className={`rounded-md px-1 py-0.5 text-[9px] font-medium sm:text-[11px] ${presencial >= 3 ? "bg-rose-50 text-rose-700" : "bg-orange-50 text-primary-dark"}`}>Presencial {presencial}/3</p>}
                      {delivery > 0 && <p className="hidden rounded-md bg-sky-50 px-1 py-0.5 text-[11px] font-medium text-sky-700 sm:block">Entrega {delivery}</p>}
                      {waiting > 0 && <p className="hidden text-[10px] text-amber-700 sm:block">{waiting} aguardando</p>}
                      <div className="flex gap-1 sm:hidden">
                        {filteredDayEvents.slice(0, 3).map((event) => <span key={event.id} className={`h-1.5 w-1.5 rounded-full ${event.status === "Reservado" ? "bg-emerald-500" : event.status === "Aguardando cliente" ? "bg-amber-500" : "bg-rose-400"}`} />)}
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        <aside className="rounded-2xl border border-border bg-white p-5 shadow-sm lg:self-start">
          <div className="border-b border-border pb-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted">Dia selecionado</p>
            <h3 className="mt-1 text-lg font-semibold text-charcoal">{selectedDay ? `${selectedDay} de ${monthNames[month]}` : "Selecione uma data"}</h3>
            {selectedEvents.length > 0 && <p className="mt-1 text-sm text-muted">{selectedEvents.filter((e) => e.modality === "Presencial" && e.status === "Reservado").length}/3 presenciais reservados</p>}
          </div>

          <div className="mt-4 space-y-3">
            {selectedEvents.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted">Nenhum evento nesta data.</p>
            ) : filteredSelectedEvents.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted">Nenhum evento corresponde aos filtros selecionados.</p>
            ) : filteredSelectedEvents.map((event) => (
              <article key={event.id} className="rounded-xl border border-border p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-charcoal">{event.client}</h4>
                    <p className="mt-0.5 text-xs text-muted">{event.time} · {event.modality}</p>
                  </div>
                  <span className={`rounded-full border px-2 py-1 text-[10px] font-semibold ${statusStyles[event.status]}`}>{event.status}</span>
                </div>
                <div className="mt-3 space-y-1 text-sm text-muted">
                  <p>{event.location}</p>
                  <p>{event.guests} convidados</p>
                </div>
              </article>
            ))}
          </div>
        </aside>
      </div>

      {showNewEvent && <NewEventModal initialDate={selectedDate} onClose={() => setShowNewEvent(false)} onCreate={createEvent} />}
    </div>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return <span className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${dot}`} />{label}</span>;
}

function NewEventModal({ initialDate, onClose, onCreate }: { initialDate: string; onClose: () => void; onCreate: (event: Omit<EventItem, "id">) => void }) {
  function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    const formData = new FormData(formEvent.currentTarget);

    onCreate({
      client: String(formData.get("client")),
      location: String(formData.get("location")),
      date: String(formData.get("date")),
      time: String(formData.get("time")),
      modality: String(formData.get("modality")) as Modality,
      guests: Number(formData.get("guests")),
      status: String(formData.get("status")) as Status,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onMouseDown={onClose}>
      <form className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl" onMouseDown={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <div className="flex items-start justify-between gap-4">
          <div><h3 className="text-lg font-semibold text-charcoal">Novo evento</h3><p className="mt-1 text-sm text-muted">Cadastre um evento na agenda.</p></div>
          <button type="button" onClick={onClose} className="rounded-lg px-2 py-1 text-muted hover:bg-background" aria-label="Fechar">✕</button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="Nome do cliente" name="client" placeholder="Ex.: João Silva" />
          <Field label="Local" name="location" placeholder="Local do evento" />
          <Field label="Data" name="date" type="date" defaultValue={initialDate} />
          <Field label="Horário" name="time" type="time" />
          <label className="flex flex-col gap-1.5 text-sm font-medium text-charcoal">Modalidade<select name="modality" className="rounded-xl border border-border bg-white px-3 py-2.5 font-normal outline-none focus:border-primary"><option>Presencial</option><option>Entrega</option></select></label>
          <Field label="Convidados" name="guests" type="number" placeholder="30" />
          <label className="flex flex-col gap-1.5 text-sm font-medium text-charcoal sm:col-span-2">Status<select name="status" className="rounded-xl border border-border bg-white px-3 py-2.5 font-normal outline-none focus:border-primary"><option>Aguardando cliente</option><option>Reservado</option><option>Cancelado</option></select></label>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-charcoal hover:bg-background">Cancelar</button>
          <button type="submit" className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-cream hover:bg-primary-dark">Cadastrar evento</button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, name, type = "text", placeholder, defaultValue }: { label: string; name: string; type?: string; placeholder?: string; defaultValue?: string }) {
  return <label className="flex flex-col gap-1.5 text-sm font-medium text-charcoal">{label}<input name={name} type={type} placeholder={placeholder} defaultValue={defaultValue} required className="rounded-xl border border-border px-3 py-2.5 font-normal text-charcoal outline-none placeholder:text-muted/70 focus:border-primary" /></label>;
}
