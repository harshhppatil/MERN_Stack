import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';

export default function Profile() {
  const { user, login } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleUpdate = async () => {
    setSaving(true); setError(''); setSuccess('');
    try {
      await axios.put('/users/me', form);
      setSuccess('Profile updated successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed.');
    } finally { setSaving(false); }
  };

  const handlePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('Passwords do not match.'); return;
    }
    setSaving(true); setError(''); setSuccess('');
    try {
      await axios.put('/users/me/password', { currentPassword: passwordForm.currentPassword, newPassword: passwordForm.newPassword });
      setSuccess('Password updated successfully.');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Password update failed.');
    } finally { setSaving(false); }
  };

  return (
    <div className="page-wrapper">
      <div className="container" style={{ maxWidth: 680, paddingTop: '3rem' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <p className="section-label">Account</p>
          <h1 className="section-title">My <em>Profile</em></h1>
        </div>

        <div className="profile-avatar-section">
          <div className="profile-avatar">{user?.name?.[0]?.toUpperCase() || 'U'}</div>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700 }}>{user?.name}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{user?.email}</p>
            {user?.role && <span className="badge" style={{ marginTop: '0.4rem' }}>{user.role}</span>}
          </div>
        </div>

        {success && <div className="alert success">{success}</div>}
        {error && <div className="alert error">{error}</div>}

        <div className="profile-section">
          <h3>Personal Information</h3>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          </div>
          <button className="btn-primary" onClick={handleUpdate} disabled={saving}>
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>

        <div className="profile-section">
          <h3>Change Password</h3>
          <div className="form-group">
            <label className="form-label">Current Password</label>
            <input className="form-input" type="password" value={passwordForm.currentPassword} onChange={e => setPasswordForm(f => ({ ...f, currentPassword: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input className="form-input" type="password" value={passwordForm.newPassword} onChange={e => setPasswordForm(f => ({ ...f, newPassword: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm New Password</label>
            <input className="form-input" type="password" value={passwordForm.confirmPassword} onChange={e => setPasswordForm(f => ({ ...f, confirmPassword: e.target.value }))} />
          </div>
          <button className="btn-primary" onClick={handlePassword} disabled={saving}>
            Update Password
          </button>
        </div>
      </div>

      <style>{`
        .profile-avatar-section {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 2rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          margin-bottom: 2rem;
        }
        .profile-avatar {
          width: 64px; height: 64px;
          border-radius: 50%;
          background: var(--accent-muted);
          border: 2px solid var(--border-accent);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-ui);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--accent);
        }
        .profile-section {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 2rem;
          margin-bottom: 1.5rem;
        }
        .profile-section h3 {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border);
        }
        .alert {
          padding: 0.85rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 13px;
          margin-bottom: 1rem;
          font-family: var(--font-ui);
          font-weight: 600;
        }
        .alert.success { background: rgba(139,195,74,0.1); color: var(--accent); border: 1px solid var(--border-accent); }
        .alert.error { background: rgba(239,83,80,0.1); color: #ef5350; border: 1px solid rgba(239,83,80,0.3); }
      `}</style>
    </div>
  );
}