import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Calendar } from 'lucide-react';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function MeetingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="font-sans min-h-screen bg-obys-bg text-obys-text">
      <div className="relative w-full border-b border-obys-border pt-16 pb-24 md:pt-32 md:pb-40">
        <div className="max-w-[90%] mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-8xl font-medium tracking-tighter uppercase leading-[0.85] mb-8 text-obys-text">
              Programar<br />
              <span className="text-obys-accent">Reunión</span>
            </h1>
            <p className="text-obys-text/70 mt-3 text-lg md:text-2xl font-medium leading-snug max-w-2xl">
              Agenda sesiones de planeación y revisión con tu equipo de GDC y directivos usando Google Calendar.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[90%] mx-auto py-24">
        <div className="border border-obys-border p-12 max-w-2xl hover:bg-black/5 transition-all duration-300">
          <div className="flex items-center gap-4 mb-8">
            <Calendar className="w-10 h-10 text-obys-accent" />
            <h2 className="text-3xl font-medium uppercase tracking-tighter">Crear Evento</h2>
          </div>
          
          <form className="flex flex-col gap-6" action={async () => {
            'use server';
            console.log('Would schedule meeting...');
          }}>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium uppercase tracking-widest text-obys-text/60">Título de la reunión</label>
              <input type="text" placeholder="Ej. Revisión Mensual de Recaudo" className="bg-transparent border border-obys-border p-4 outline-none focus:border-obys-accent font-medium text-lg" required />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium uppercase tracking-widest text-obys-text/60">Invitados (Emails separados por coma)</label>
              <input type="text" placeholder="jefe@gdc.com, admin@mercurio.com" className="bg-transparent border border-obys-border p-4 outline-none focus:border-obys-accent font-medium" required />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium uppercase tracking-widest text-obys-text/60">Fecha</label>
                <input type="date" className="bg-transparent border border-obys-border p-4 outline-none focus:border-obys-accent font-medium" required />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium uppercase tracking-widest text-obys-text/60">Hora</label>
                <input type="time" className="bg-transparent border border-obys-border p-4 outline-none focus:border-obys-accent font-medium" required />
              </div>
            </div>

            <button type="submit" disabled className="mt-8 bg-obys-text text-obys-bg uppercase tracking-widest font-medium py-5 px-8 hover:bg-obys-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Programar en Calendar (Próximamente)
            </button>
            <p className="text-xs text-obys-text/40 tracking-widest uppercase">
              Requiere permisos de Google Calendar configurados
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
