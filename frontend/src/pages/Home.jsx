import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

// Small self-contained logout button for the home nav
function LogoutButton() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const handle = async () => {
    try { await logout(); toast.success('Logged out!'); navigate('/') }
    catch { toast.error('Logout failed') }
  }
  return (
    <button onClick={handle}
      className="text-sm font-semibold px-4 py-2 border-2 border-black rounded-lg bg-[#0A0A0A] text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal transition-all cursor-pointer">
      Logout
    </button>
  )
}

const FEATURES = [
  { icon: '🎯', title: 'Priority System',   desc: 'Tag tasks Low, Medium or High. Always know what deserves your focus first.' },
  { icon: '🏷️', title: 'Smart Tags',        desc: 'Organize with up to 5 custom tags per task. Filter anything in seconds.' },
  { icon: '📅', title: 'Due Dates',         desc: 'Set deadlines and get visual overdue indicators. Never miss a beat.' },
  { icon: '⚡', title: 'One-Click Status',  desc: 'Cycle Pending → In Progress → Done with a single tap. Pure speed.' },
]

const MOCK_CARDS = [
  { priority: '🔴 High',   title: 'Submit AWT project',     status: 'Pending',      sc: 'bg-gray-100 text-gray-600' },
  { priority: '🟡 Medium', title: 'Review lecture notes',   status: 'In Progress',  sc: 'bg-blue-100 text-blue-600' },
  { priority: '🟢 Low',    title: 'Update README.md',       status: 'Done ✓',       sc: 'bg-green-100 text-green-700' },
]

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F2]">
      {/* ── Nav ─────────────────────────── */}
      <nav className="flex items-center justify-between px-8 py-5 border-b-2 border-black bg-white">
        <span className="font-head text-2xl font-extrabold">
          Plan<span className="text-[#5B00F0]">Pad</span>
        </span>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm font-semibold px-4 py-2 border-2 border-black rounded-lg bg-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal transition-all">📋 Tasks</Link>
              <Link to="/notes"     className="text-sm font-semibold px-4 py-2 border-2 border-black rounded-lg bg-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal transition-all">📝 Notes</Link>
              <span className="w-px h-6 bg-gray-200 mx-1" />
              <Link to="/profile"
                className="flex items-center gap-2 text-sm font-semibold px-4 py-2 border-2 border-black rounded-lg bg-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal transition-all">
                <span className="w-5 h-5 rounded-full bg-[#5B00F0] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {user?.name?.[0]?.toUpperCase()}
                </span>
                <span className="hidden sm:block">{user?.name}</span>
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link to="/login"
                className="px-4 py-2 text-sm font-semibold border-2 border-transparent rounded-xl hover:border-black transition-all">
                Login
              </Link>
              <Link to="/register"
                className="px-5 py-2.5 text-sm font-bold border-2 border-black rounded-xl bg-[#5B00F0] text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal transition-all">
                Get Started →
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* ── Hero ────────────────────────── */}
      <section className="flex flex-col items-center text-center px-6 pt-20 pb-16 max-w-4xl mx-auto w-full">
        {/* badge */}
        <span className="inline-block bg-[#FFE500] border-2 border-black rounded-full px-5 py-1.5 text-sm font-bold brutal-sm mb-8">
          {user ? `👋 Welcome back, ${user.name}!` : '✦ Built for getting things done'}
        </span>

        <h1 className="font-head text-5xl sm:text-7xl font-extrabold leading-[1.05] mb-5">
          {user ? (
            <>Ready to<br />
              <span className="relative inline-block text-[#5B00F0]">
                Get Stuff Done?
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#FFE500] -z-10 rounded" />
              </span>
            </>
          ) : (
            <>Stop Forgetting.<br />
              <span className="relative inline-block text-[#5B00F0]">
                Start Doing.
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#FFE500] -z-10 rounded" />
              </span>
            </>
          )}
        </h1>

        <p className="text-lg text-gray-500 max-w-lg leading-relaxed mb-10">
          {user
            ? 'Your tasks and notes are waiting. Jump back in and keep the momentum going.'
            : 'PlanPad is your bold, no-nonsense task manager. Prioritize ruthlessly, track relentlessly, ship consistently.'}
        </p>

        <div className="flex gap-4 flex-wrap justify-center mb-16">
          {user ? (
            <>
              <Link to="/dashboard"
                className="px-7 py-3.5 font-bold text-base border-2 border-black rounded-xl bg-[#5B00F0] text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal-lg transition-all">
                Go to Dashboard →
              </Link>
              <Link to="/notes"
                className="px-7 py-3.5 font-bold text-base border-2 border-black rounded-xl bg-[#FFE500] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal transition-all">
                Open Notes 📝
              </Link>
            </>
          ) : (
            <>
              <Link to="/register"
                className="px-7 py-3.5 font-bold text-base border-2 border-black rounded-xl bg-[#5B00F0] text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal-lg transition-all">
                Start for free →
              </Link>
              <Link to="/login"
                className="px-7 py-3.5 font-bold text-base border-2 border-black rounded-xl bg-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal transition-all">
                I have an account
              </Link>
            </>
          )}
        </div>

        {/* Mock cards */}
        <div className="flex gap-5 flex-wrap justify-center">
          {MOCK_CARDS.map((c, i) => (
            <div key={i}
              className={`bg-white border-2 border-black rounded-xl p-5 min-w-[170px] text-left flex flex-col gap-3 brutal ${i === 1 ? '-rotate-1.5 -translate-y-2 brutal-lg' : ''} hover:-translate-x-0.5 hover:-translate-y-1 transition-transform`}>
              <span className="text-xs font-bold text-gray-500">{c.priority}</span>
              <p className="font-head font-bold text-[0.95rem]">{c.title}</p>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-md self-start ${c.sc}`}>{c.status}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ────────────────────── */}
      <section className="bg-[#0A0A0A] text-white py-20 px-6 text-center">
        <h2 className="font-head text-4xl sm:text-5xl font-extrabold mb-12">
          Everything you need.<br />Nothing you don't.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {FEATURES.map(f => (
            <div key={f.title}
              className="bg-[#141414] border-2 border-[#2A2A2A] rounded-xl p-6 text-left hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal-pri hover:border-[#5B00F0] transition-all">
              <span className="text-3xl block mb-4">{f.icon}</span>
              <h3 className="font-head font-bold text-base mb-2">{f.title}</h3>
              <p className="text-[#888] text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ──────────────────────── */}
      <footer className="border-t-2 border-black py-5 text-center text-sm text-gray-500">
        Advanced Web Technologies (1CS403) · PlanPad © 2025
      </footer>
    </div>
  )
}