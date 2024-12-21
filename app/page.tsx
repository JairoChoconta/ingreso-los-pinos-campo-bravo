'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function PoloClub() {
  const [id, setId] = useState<string | null>(null)
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [timestamp, setTimestamp] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const guestId = params.get('id')
    if (guestId) {
      setId(guestId)
    } else {
      setMessage('ID no válido en la URL.')
      setError(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (code !== '9763') {
      setMessage('Código de portero inválido. Intente nuevamente.');
      setError(true);
      return;
    }

    if (!id) {
      setMessage('ID no encontrado en la URL.');
      setError(true);
      return;
    }

    try {
      const response = await fetch('https://1640bf05ab6a.ngrok.app/confirm_entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors', // Esto asegura que el navegador intente cumplir con las reglas de CORS
        body: JSON.stringify({
          id,
          security_code: code,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        setTimestamp(new Date().toLocaleTimeString());
        setError(false);
      } else {
        setMessage(result.error || 'Error al confirmar el ingreso.');
        setError(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error al conectar con el servidor.');
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative flex" style={{
      backgroundImage: "url('/group-1.jpg')"
    }}>
      <div className="flex-1 max-w-md mx-auto pt-12 px-4">
        {/* Logo */}
        <div className="flex flex-col items-center mb-12">
          <Image
            src="https://lh5.googleusercontent.com/proxy/bzjidsgItyNghmbOYeGjS-oMFcY3T7gcddrZ8Rmq1lRmnlR12zusXh8fWAPPD7yDXYFOqUOkW08oDtRe45m120u0sHUSlfX9nYVFugxBrGhKu95KRFWteqtCV-c14q_0cQ"
            alt="Los Pinos Polo Club"
            width={120}
            height={120}
            className="mb-2"
          />
        </div>

        {/* Form */}
        <div className="bg-white/80 rounded-lg p-6 shadow-lg">
          <div className="flex items-start mb-4">
            <div className="mr-2 mt-1">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path d="M12 16v-4M12 8h.01" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-1">Digitar código de ingreso</h2>
              <p className="text-gray-600 text-sm">
                Esto solo lo hará el personal autorizado en la portería del evento.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="CÓDIGO"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0099CC] focus:border-transparent ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <button
              type="submit"
              className="w-full bg-[#0099CC] text-white py-3 rounded-lg hover:bg-[#0088BB] transition-colors"
            >
              ENVIAR
            </button>
          </form>
        </div>
      </div>

      {/* Dynamic Message Box */}
      {message && (
        <div className="fixed right-4 top-1/4 bg-white rounded-lg p-6 shadow-lg max-w-sm">
          <p className={`${error ? 'text-red-500' : 'text-green-500'} font-medium text-xl`}>
            {message}
          </p>
          {!error && timestamp && (
            <p className="text-gray-600 italic mt-2">Última hora de ingreso: {timestamp}.</p>
          )}
        </div>
      )}
    </div>
  )
}
