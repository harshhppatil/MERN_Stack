import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="bg-dark min-h-screen flex items-center justify-center px-8 relative overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark" />

      {/* Content */}
      <div className="relative text-center max-w-lg">

        {/* 404 */}
        <div className="font-display font-light leading-none mb-6"
          style={{ fontSize: 'clamp(100px, 20vw, 180px)', color: '#1a1a1a' }}>
          404
        </div>

        {/* Gold line */}
        <div className="flex items-center justify-center gap-4 mb-8 -mt-8">
          <div className="w-12 h-px bg-gold" />
          <span className="text-gold text-[11px] tracking-[0.3em] uppercase font-sans">
            Page Not Found
          </span>
          <div className="w-12 h-px bg-gold" />
        </div>

        <h2 className="font-display font-light text-white text-4xl mb-4">
          Lost on the Road?
        </h2>
        <p className="text-muted font-sans text-sm leading-relaxed mb-10 font-light">
          The page you are looking for doesn't exist or has been moved.
          Let us get you back on track.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/"
            className="bg-gradient-to-r from-gold to-gold-light text-dark no-underline px-10 py-4 text-xs font-semibold tracking-[0.12em] uppercase font-sans rounded-sm hover:opacity-85 hover:-translate-y-0.5 transition-all duration-200"
          >
            Back to Home
          </Link>
          <Link
            to="/cars"
            className="border border-[#222] text-muted no-underline px-10 py-4 text-xs tracking-[0.12em] uppercase font-sans rounded-sm hover:border-gold hover:text-gold hover:-translate-y-0.5 transition-all duration-200"
          >
            Browse Fleet
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound