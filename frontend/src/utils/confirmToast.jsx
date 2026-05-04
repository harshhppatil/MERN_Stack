import toast from 'react-hot-toast'

export const confirmToast = (message, { confirmLabel = 'Yes, delete', danger = true } = {}) => {
  return new Promise((resolve) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 min-w-[220px]">
          <p className="text-sm font-semibold text-[#0A0A0A]">{message}</p>
          <div className="flex gap-2">
            <button
              onClick={() => { toast.dismiss(t.id); resolve(true) }}
              className={`flex-1 py-1.5 text-sm font-bold border-2 border-black rounded-lg cursor-pointer transition-all hover:-translate-y-0.5 ${
                danger ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-[#5B00F0] text-white'
              }`}
            >
              {confirmLabel}
            </button>
            <button
              onClick={() => { toast.dismiss(t.id); resolve(false) }}
              className="flex-1 py-1.5 text-sm font-bold border-2 border-black rounded-lg bg-white cursor-pointer hover:-translate-y-0.5 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        style: {
          border: '2px solid #0A0A0A',
          borderRadius: '12px',
          padding: '14px 16px',
          boxShadow: '4px 4px 0 #0A0A0A',
          fontFamily: 'DM Sans, sans-serif',
        },
      }
    )
  })
}